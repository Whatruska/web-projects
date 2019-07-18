$(document).ready(function () {
  $('#exit_btn')[0].onclick = (function () {
    $.ajax({
      url : '../PHP/exit.php',
      type : 'POST',
      success : function (data) {
        document.location.reload(true);
      }
    });
  });
});
