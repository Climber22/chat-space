$(function(){
  function buildHTML(data){
    var message = [];
    console.log(data);
    message.push( $('<span class="chat-message__name">').append(data[1]));
    message.push($('<span class="chat-message__date">').append(data[0].created_at));
    message.push($('<p class="chat-message__text">').append(data[0].body));
    $(".chat-area").append('<div class="chat-message"></div');
    for (var i = 0; i < 3; i++){
      $(".chat-message:last").append(message[i]);
    }
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var messageField = $(".message-area__text")
    var message = messageField.val();
    $.ajax({
      type: "POST",
      url: "/groups/"+59+"/messages.json",
      data: {
        message: {
          body: message
        }
      },
      dataType: "json"
    })
    .done(function(data){
      console.log(data);
      buildHTML(data);
      messageField.val('');
      $(".message-area__button").prop("disabled",false);
    })
    .fail(function() {
      alert('error');
    });
  });
});
