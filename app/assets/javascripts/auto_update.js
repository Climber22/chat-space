function buildUpdateMessageHTML(updateMessages){
    var htmlAll = "";
    for(var i = 0; i < updateMessages.length; i++){
      message = updateMessages[i];
      var html = `<div class="chat-message" data-id="${message.id}"}>
                <span class='chat-message__name'>${message.user_name}</span>
                <span class="chat-message__date">${message.date}</span>
                <p class="chat-message__text">${message.body}</p>`;
      if(message.image.url){
        html += `<img class="chat-message" src=${message.image.url}></div>`
      }else{
        html += `</div>`
      }
      htmlAll += `${html}`;
    }
    return htmlAll;
  }
  setInterval(getNewMessages,1000);
  function getNewMessages(){
    var currentPageFull = window.location.href;
    var unnecessary = "http://localhost:3000";
    var currentPage = currentPageFull.replace(unnecessary,"");
    var currentMessageId = $(".chat-message:last-child").data("id");
    $.ajax({
      type: "GET",
      url: currentPage,
      data: {
        currentMessageId: currentMessageId
      },
      dataType: "json"
    })
    .done(function(data){
      console.log(data.updateMessages);
      if(data.updateMessages.length != 0){
        var htmlaa = buildUpdateMessageHTML(data.updateMessages);
        $(".chat-area").append($(htmlaa)).animate({scrollTop:$(".chat-message:last-child").offset().top});
      }
    })
    .fail(function(jqXHR){
      console.log("ajax failed");
    })
  };
