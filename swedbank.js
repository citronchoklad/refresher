var refreshMinutes = 10;
window.setInterval(refreshActive, 60*1000);
window.setTimeout(refreshPage, refreshMinutes*60*1000);
refreshActive();
updateAmount();

function refreshActive() {
  chrome.runtime.sendMessage({swedbankActive: true});
}
 
function updateAmount() {
  chrome.runtime.sendMessage({swedbankAmount: 0});
}

function refreshPage() {
  location.reload(true);
}
