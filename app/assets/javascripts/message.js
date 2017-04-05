$(function(){
  function buildHTML(data){
    var html = $(`<span class="chat-message__name">${data.user.name}</span><span class="chat-message__date">${data.message.date}</span><p class="chat-message__text">${data.message.body}</p>`).wrap('<div class="chat-message"></div>');
    return html;
  }

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
      $(".chat-area").append(html);
      $(".new_message")[0].reset();
      $(".message-area__button").prop("disabled",false);
    })
    .fail(function() {
      alert('error');
    });
  });
});
