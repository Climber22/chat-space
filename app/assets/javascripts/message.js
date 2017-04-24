$(function(){
  function buildHTMLMessage(data){
    var html = `<div class="chat-message">
                  <span class='chat-message__name'>${data.message.user_name}</span>
                  <span class="chat-message__date">${data.message.date}</span>
                  <p class="chat-message__text">${data.message.body}</p>
                </div>`;
    return html;
  }
  function buildHTMLError(data) {
    var html = `<div class='flash-alert'>${data.message.error_message}</div>`;
    return html
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var messageField = $("#message_body");
    var message = messageField.val();
    var imageField = $("#message_image");
    var image = imageField.val();
    var url = $(this).prop("action");
    $.ajax({
      type: "POST",
      url: `${url}.json`,
      data: {
        message: {
          body: message,
          image: image
        }
      },
      dataType: "json"
    })
    .done(function(data){
      if(data.message.error_message){
        var html = buildHTMLError(data);
        $("body").prepend(html);
        $(".flash-alert").delay(5000).slideUp('slow');
      }else{
        var html = buildHTMLMessage(data);
        $(".chat-area").append($(html)).animate({scrollTop:$(".chat-message:last").offset().top});
      }
    })
    .fail(function(jqXHR) {
      alert("ajax failed");
    })
    .always(function(){
      $(".new_message")[0].reset();
      $(".message-area__button").prop("disabled",false);
    });
  });
});
