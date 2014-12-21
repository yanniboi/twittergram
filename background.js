/**
 * Activate page_action when instagram images exist.
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.greeting == "active") {
    sendResponse({farewell: "activated"});
    chrome.pageAction.show(sender.tab.id);
  }
});

/**
 * Send message to content_script when page_action is clicked.
 */
chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.tabs.sendMessage(tab.id, {greeting: "next"}, function (response) {
      console.log(response.farewell);
    });
});