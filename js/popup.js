$(function() {
  $('#customizeZD').click(function() {
    getCurrentTab();
  });

  $('#customizeSave').click(function() {
    saveToCache();
  });

  getCachedShortcuts();
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
  chrome.storage.local.get(['isHC'], function(data) {
    if(currentTab.url.indexOf('/hc/') > -1 && data['isHC']) {
      var tempIndex = currentTab.url.indexOf('/hc/');
      var newUrl = currentTab.url.substring(0, tempIndex + 4) + 'admin/appearance#editor';
      chrome.tabs.update(currentTab.id, {url: newUrl});
      chrome.storage.local.remove(['isHC']);
      window.close();
    }
  })
}

function getCachedShortcuts() {
  chrome.storage.local.get(['zendesk-shortcuts-extension'], function(data) {
    if(data['zendesk-shortcuts-extension']) {
      if(shortcutsArray.length == data['zendesk-shortcuts-extension'].length) {
        shortcutsArray = data['zendesk-shortcuts-extension']
      }
    }

    renderForm();
  });
}

function renderForm() {
  var html = ''

  shortcutsArray.forEach(function(s) {
    html += '<label class="u-epsilon u-light u-mb-xs"><span>' + s.name + '</span></label>'
    html += '<input class="c-txt__input u-mb-xs" id="' + s.id + '" placeholder="' + s.name + '" type="text">'
  })

  $('.shortcuts-form').html(html);

  shortcutsArray.forEach(function(s) {
    $('#' + s.id).val(s.shortcut)
  })
}

function saveToCache() {
  shortcutsArray.forEach(function(s) {
    s.shortcut = $('#' + s.id).val();
  })

  chrome.storage.local.set({
    'zendesk-shortcuts-extension': shortcutsArray
  }, function(data) {
    $('#customizeSave').hide();
    $('#saveAlert')
      .css('display', 'inline-block')
      .hide()
      .fadeIn()
      .delay(1000)
      .fadeOut(function() {
        window.close();
      });
  });
}
