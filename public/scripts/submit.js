$(document).ready(function(){
  $("form#formPicker").on('submit', function(e){
    e.preventDefault();
    var data = $('input[name=words]').val();
    $.ajax({
      type: 'post',
      url: '/ajax',
      data: 'data',
      dataType: 'text'
    })
    .done(function(data){
      $('h1').html(data.quote);
    });
  });
});
