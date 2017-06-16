$('#preview-frame').load(function(){
  chrome.storage.local.get(['zendesk-shortcuts-extension'], function(data) {
    if(data['zendesk-shortcuts-extension']) {
      if(shortcutsArray.length == data['zendesk-shortcuts-extension'].length) {
        shortcutsArray = data['zendesk-shortcuts-extension']
      }
    }

    main();
  });
});

$(function() {
  isHC();
})

function main() {
  if(window.location.href.indexOf('/hc/admin/appearance') > -1) {
    customKeymage();

    shortcutsArray.forEach(function(s) {
      keymage(s.shortcut, function() {
        if(s.type == 'role') {
          if($('#role .nesty-input').length) {
            $('#role .nesty-input')[0].click();
            $('#' + s.id)[0].click();
          }
        }
        else {
          if($('#' + s.id).length) {
            $('#' + s.id)[0].click();
          }
        }
      });
    });
  }
}

function isHC() {
  if($('#navbar-container').length) {
    chrome.storage.local.set({
      isHC: true
    })
  }
}
