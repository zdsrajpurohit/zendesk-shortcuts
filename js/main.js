$(function(){
  main();
});

$('#preview-frame').load(function(){
  main();
});

function main() {
  customKeymage();

  keymage('shift-alt-p', function() {
    if($('#heap-preview-theme').length) {
      $('#heap-preview-theme')[0].click();
    }
  });
}
