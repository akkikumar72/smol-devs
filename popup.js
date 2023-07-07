```javascript
let comments = {};
let currentURL = '';

document.getElementById('saveButton').addEventListener('click', saveComment);
document.getElementById('optionsButton').addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});

function saveComment() {
  const commentInput = document.getElementById('commentInput');
  const comment = commentInput.value.trim();
  if (comment) {
    const timestamp = new Date().toISOString();
    comments[currentURL] = comments[currentURL] || [];
    comments[currentURL].push({ comment, timestamp });
    chrome.storage.sync.set({ comments }, () => {
      commentInput.value = '';
      loadComments();
    });
  }
}

function loadComments() {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    currentURL = tabs[0].url;
    chrome.storage.sync.get('comments', data => {
      comments = data.comments || {};
      const commentList = document.getElementById('commentList');
      commentList.innerHTML = '';
      (comments[currentURL] || []).forEach(({ comment, timestamp }) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${new Date(timestamp).toLocaleString()}: ${comment}`;
        commentList.appendChild(listItem);
      });
    });
  });
}

function initPopup() {
  loadComments();
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'OPTIONS_UPDATE') {
      loadComments();
    }
  });
}

document.addEventListener('DOMContentLoaded', initPopup);
```