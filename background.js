var swedbankAmount = 0;
var nordeaAmount = 0;
var swedbankActive = new Date("1970-01-01 00:00:00");
var nordeaActive = new Date("1970-01-01 00:00:00");

window.setInterval(updateActive, 30*1000);

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.swedbankActive) {
      swedbankActive = new Date();
      updateActive();
    }
    if (request.nordeaActive) {
      nordeaActive = new Date();
      updateActive();
    }
    if (request.swedbankAmount) {
      swedbankAmount = request.swedbankAmount;
      updateAmount();
    }
    if (request.nordeaAmount) {
      nordeaAmount = request.nordeaAmount;
      updateAmount();
    }
  });

function updateAmount() {
  var text = "";
  if (0 < nordeaAmount && 0 < swedbankAmount) {
    text = "N+S"
  } else if (0 < nordeaAmount) {
    text = "NORD"
  } else if (0 < swedbankAmount) {
    text = "SWED"
  }
  chrome.browserAction.setBadgeText({ text: text });
}

function updateActive() {
  var nordea = Math.abs(new Date() - nordeaActive) < 65*1000;
  var swedbank = Math.abs(new Date() - swedbankActive) < 65*1000;
  if (nordea && swedbank) {
    chrome.browserAction.setIcon({path: "coins.png"});
  } else if (nordea) {
    chrome.browserAction.setIcon({path: "coins_left.png"});
  } else if (swedbank) {
    chrome.browserAction.setIcon({path: "coins_right.png"});
  } else {
    chrome.browserAction.setIcon({path: "coins_inactive.png"});
  }
}
