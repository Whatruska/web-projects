$(document).ready(function () {
  $('.article-btn').each(function (ind) {
    var elem = $('.article-btn')[ind];
    elem.onclick = function () {
      var articleId = $('.article-btn')[ind].name;
      $.ajax({
        url : '../PHP/getArticle.php',
        type : 'post',
        dataType : 'html',
        data : {'articleId' : articleId},
        success : function (data) {
          //console.log(data);
          //console.log(articleId);
          document.location.reload(true);
        }
      });
    };
  });
});
