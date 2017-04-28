$(function(){
  function buildHTMLMessage(message){
    var html = `<div class="chat-message">
                  <span class='chat-message__name'>${message.user_name}</span>
                  <span class="chat-message__date">${message.date}</span>
                  <p class="chat-message__text">${message.body}</p>`;
    if(message.image.url){
      html += `<img class="chat-message" src=${message.image.url}></div>`
    }else{
      html += `</div>`
    }
    return html;
  }
  function buildHTMLError(data) {
    var html = `<div class='flash-alert'>${data.message.error_message}</div>`;
    return html
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var url = $(this).prop("action");
    var formData = new FormData($('#new_message').get(0));
    $.ajax({
      type: "POST",
      url: `${url}.json`,
      data: formData,
      processData: false,
      contentType: false,
      dataType: 'json'
    })
    .done(function(data){
      if(data.message.error_message){
        var html = buildHTMLError(data.message);
        $("body").prepend(html);
        $(".flash-alert").delay(5000).slideUp('slow');
      }else{
        var html = buildHTMLMessage(data.message);
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
