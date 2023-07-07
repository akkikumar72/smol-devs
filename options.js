```javascript
// Options.js

// Function to update options
function updateOptions() {
    let commentColor = document.getElementById('commentColor').value;
    let commentFontSize = document.getElementById('commentFontSize').value;

    chrome.storage.sync.set({
        commentColor: commentColor,
        commentFontSize: commentFontSize
    }, function() {
        console.log('Options updated');
    });
}

// Function to restore options
function restoreOptions() {
    chrome.storage.sync.get({
        commentColor: '#000000',
        commentFontSize: '16px'
    }, function(items) {
        document.getElementById('commentColor').value = items.commentColor;
        document.getElementById('commentFontSize').value = items.commentFontSize;
    });
}

// Event listener for options update
document.getElementById('saveOptions').addEventListener('click', updateOptions);

// Event listener for options restore
document.addEventListener('DOMContentLoaded', restoreOptions);
```