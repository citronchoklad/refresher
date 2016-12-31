var refreshMinutes = 10;
window.setInterval(refreshActive, 60*1000);
window.setTimeout(refreshPage, refreshMinutes*60*1000);
refreshActive();
updateAmount();

function refreshActive() {
  chrome.runtime.sendMessage({swedbankActive: true});
}
 
function updateAmount() {
  var element = document.querySelector('.sektion-innehall2 tr td:last-child span');
  var amount = parseInt(element.innerHTML, 10);
  chrome.runtime.sendMessage({swedbankAmount: amount});
}

function refreshPage() {
  var account_selector = document.querySelector('#form_byt_konto #index');
  if (account_selector != undefined) {
    if (account_selector.value == "") {
      account_selector.value = 0;
    }
    var button = document.querySelector('#form_byt_konto input[name="byt_konto"]');
    button.dispatchEvent(new Event('click'));
  } else {
    location.reload(true);
  }

}
