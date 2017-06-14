$(function() {
  $('#customizeZD').click(function() {
    getCurrentTab();
  });
});

function getCurrentTab() {
  chrome.tabs.query({
      active: true,
      currentWindow: true
    },
    function callback(tabs) {
      var currentTab = tabs[0];
      updateCurrentTab(currentTab);
    }
  );
}

function updateCurrentTab(currentTab) {
  if(currentTab.url.indexOf('zendesk.com/hc') > -1) {
    var tempIndex = currentTab.url.indexOf('zendesk.com/hc');
    var newUrl = currentTab.url.substring(0, tempIndex + 14) + '/admin/appearance#editor';
    chrome.tabs.update(currentTab.id, {url: newUrl});
    window.close();
  }
}
