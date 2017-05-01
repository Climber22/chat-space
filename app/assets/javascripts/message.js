$(function(){
  function buildHTMLMessage(message){
    console.log(message.image);
    var html = `<div class="chat-message" data-id="${message.id}"}>
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
        $(".chat-area").append($(html)).animate({scrollTop:$(".chat-message:last-child").offset().top});
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

  setInterval(getNewMessages,1000);
  function getNewMessages(){
    var currentPageFull = window.location.href;
    var unnecessary = "http://localhost:3000";
    var currentPage = currentPageFull.replace(unnecessary,"");
    var currentMessageId = $(".chat-message:last-child").data("id");
    $.ajax({
      type: "GET",
      url: currentPageFull,
      data: {
        currentMessageId: currentMessageId
      },
      dataType: "json"
    })
    .done(function(data){
      if(data.updateMessages.length != 0){
        var html;
        $.each(data.updateMessages, function(index, message){
          html += buildHTMLMessage(message);
        })
        var html = buildHTMLMessage(data.updateMessages);
        $(".chat-area").append($(html)).animate({scrollTop:$(".chat-message:last-child").offset().top});
      }
    })
    .fail(function(jqXHR){
      console.error("ajax failed");
    });
  };

});
