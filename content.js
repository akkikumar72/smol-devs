```javascript
let comments = {};
let currentURL = '';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'SAVE_COMMENT') {
    saveComment(request.data);
  } else if (request.message === 'LOAD_COMMENTS') {
    loadComments();
  }
});

function saveComment(data) {
  comments[currentURL] = comments[currentURL] || [];
  comments[currentURL].push(data);
  chrome.storage.sync.set({comments: comments}, () => {
    console.log('Comment saved');
  });
}

function loadComments() {
  chrome.storage.sync.get('comments', (data) => {
    comments = data.comments || {};
    sendCommentsToPopup();
  });
}

function sendCommentsToPopup() {
  chrome.runtime.sendMessage({
    message: 'LOAD_COMMENTS',
    data: comments[currentURL] || []
  });
}

chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
  currentURL = tabs[0].url;
  loadComments();
});
```