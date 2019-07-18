$('#load').css('color', 'red');

function beforeFunc() {
  $('#information').text('Ожидаем данные...');
}

function successFunc(data) {
  $('#information').text(data);
}

$(document).ready(function(){
  $('#load').bind('click', function () {
    $.ajax({
      url : 'php/context.php',
      data : ({
        name : 'Admin',
        number : 125
      }),
      dataType : 'html',
      type : 'POST',
      beforeSend : beforeFunc(),
      success : successFunc()
    });
  });
});
