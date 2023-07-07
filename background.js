```javascript
let comments = {};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ comments: {} });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'SAVE_COMMENT') {
    saveComment(request.data);
  } else if (request.message === 'LOAD_COMMENTS') {
    loadComments(request.data);
  } else if (request.message === 'OPTIONS_UPDATE') {
    updateOptions(request.data);
  }
});

function saveComment(data) {
  comments[data.url] = comments[data.url] || [];
  comments[data.url].push(data.comment);
  chrome.storage.sync.set({ comments: comments });
}

function loadComments(url) {
  if (comments[url]) {
    return comments[url];
  } else {
    return [];
  }
}

function updateOptions(options) {
  // Implement options update logic here
}
```