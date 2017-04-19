$(function(){

  function checkOverlap(user_id){
    var resultLists = $(".user-search-result li");
    var overlapNo = true;
    $.each(resultLists, function(index, resultList){
      var userIdAlready = $(resultList).attr("data-user-id");
      if( userIdAlready == userId){
        overlapNo = false;
      }
    });

    var memberLists = $(".chat-group-member li");
    $.each(memberLists, function(index, memberList){
      var userIdMember = $(memberList).attr("data-user-id");
      if( userIdMember == userId ){
        overlapNo = false;
      }
    })
    return overlapNo;
  }

  function buildHTMLNameResultNew(users){
    var html = $("<ul class = 'user-search-result'></ul>");
    var listFlg = false;
    $.each(users, function(index, user){
      if(checkOverlap(user.id)){
        var nameArea = `<li class = 'chat-group-user' data-user-id = ${user.id}>
                           <div class = "chat-group-user__name">
                             ${user.name}
                           </div>
                           <div class = "chat-group-user__btn">
                             <a class = "chat-group-user__btn--add" href = "#">
                               追加
                             </a>
                           </div>
                         </li>`;
        $(html).append(nameArea);
        listFlg = true;
     }
    });
    if(listFlg){
      return html;
    }else{
      html = "";
      return html;
    }
  }

  function buildHTMLNameResultAgain(htmlResultAgain){
    htmlResultAgain.find("a").html("追加").removeClass("chat-group-user__btn--remove").addClass("chat-group-user__btn--add");
    htmlResultAgain.find("input").remove();
    if( !($("#chat-group-users ul").size()) ){
      htmlResultAgain = $("<ul class = 'user-search-result'></ul>").append(htmlResultAgain);
    }
    return htmlResultAgain;
  }


  function buildHTMLNameStage(htmlStage){
    htmlStage.find("a").html("削除").removeClass("chat-group-user__btn--add").addClass("chat-group-user__btn--remove");
    var userId = $(htmlStage).attr("data-user-id");
    var hiddenForm = `<input name="group[user_ids][]" type="hidden" value = "${userId}" />`;
    $(htmlStage).append(hiddenForm);
    return htmlStage;
  }



  $(document).on("click", ".chat-group-user__btn--add", function(e){
    e.preventDefault();
    var htmlResult = $(this).parents("li");
    $(this).parents("li").remove();
    var htmlStage = buildHTMLNameStage(htmlResult);
    if( !($("#stage ul").size()) ){
      $("#stage").append("<ul class = 'chat-group-member'></ul>");
    }
    $("#stage ul").append(htmlStage);
  });

  $(document).on("click", ".chat-group-user__btn--remove", function(e){
    e.preventDefault();
    var htmlResultAgain = $(this).parents("li");
    $(this).parents("li").remove();
    htmlResultAgain = buildHTMLNameResultAgain(htmlResultAgain);
    if( !($("#chat-group-users ul").size()) ){
      $("#chat-group-users").append("<ul class = 'chat-group-member'></ul>");
    }
    $("#chat-group-users ul").append(htmlResultAgain);
  });

  var keywordBefore = "";
  $("#user_name").keyup(function(e){
      var keyword = $(this).val();
      if(keyword == ""){
        keywordBefore = "";
        $("#chat-group-users ul").remove();
      }else if(keywordBefore != keyword){
        keywordBefore = keyword;
        $.ajax({
          type: "GET",
          url: "/users/search.json",
          data: {
            keyword: keyword
          },
          dataType: "json"
        })
        .done(function(data){
          var htmlResult = buildHTMLNameResultNew(data.users);
          $("#chat-group-users").append(htmlResult);
          })
        .fail(function(){
          alert("ajax failed");
        });
      }
  });
});
