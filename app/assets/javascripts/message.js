$(function(){
  function buildHTML(data){
    var html = `<div class="chat-message">
                  <span class='chat-message__name'>${data.message.user_name}</span>
                  <span class="chat-message__date">${data.message.date}</span>
                  <p class="chat-message__text">${data.message.body}</p>
                </div>`;
    return html;
  }
  var show_ajax_message;
  show_ajax_message = function(msg, type) {
    alert(msg);
    $("body").prepend("<div class='flash-" + type + "'>" + msg + "</div>");
    return $("#flash-" + type).delay(5000).slideUp('slow');
  };

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var messageField = $("#message_body")
    var message = messageField.val();
    var url = $(this).prop("action");
    $.ajax({
      type: "POST",
      url: `${url}.json`,
      data: {
        message: {
          body: message
        }
      },
      dataType: "json"
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".chat-area").append($(html)).animate({scrollTop:$(".chat-message:last").offset().top});
      $(".new_message")[0].reset();
      $(".message-area__button").prop("disabled",false);
    })
    .fail(function(jqXHR) {
      var e_message, e_type;
      e_message = jqXHR.getResponseHeader("X-Message");
      e_type = jqXHR.getResponseHeader("X-Message-type");
      return show_ajax_message(e_message, e_type);
    });
  });
});
