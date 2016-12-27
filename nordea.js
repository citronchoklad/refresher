var refreshMinutes = 10;
window.setInterval(refreshActive, 60*1000);
window.setTimeout(refreshPage, refreshMinutes*60*1000);
refreshActive();
updateAmount();

function refreshActive() {
  chrome.runtime.sendMessage({nordeaActive: true});
}

function updateAmount() {
  var all = document.querySelectorAll('#currentaccountsoverviewtable tr td:last-child font');
  var amount = all.length;
  all.forEach(function(i) {
    if (i.innerHTML.trim() == "0,00") {
      amount = 0;
    }
  });
  chrome.runtime.sendMessage({nordeaAmount: amount});
}

function refreshPage() {
  location.reload(true);
}
