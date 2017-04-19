$(function(){

  function checkOverlap(user_id){
    var result_lists = $(".user-search-result li");
    var overlap_no = true;
    $.each(result_lists, function(index, result_list){
      var user_id_already = $(result_list).attr("data-user-id");
      if( user_id_already == user_id){
        overlap_no = false;
      }
    });

    var member_lists = $(".chat-group-member li");
    $.each(member_lists, function(index, member_list){
      var user_id_member = $(member_list).attr("data-user-id");
      if( user_id_member == user_id ){
        overlap_no = false;
      }
    })
    return overlap_no;
  }

  function buildHTMLNameResultNew(users){
    var html = $("<ul class = 'user-search-result'></ul>");
    $.each(users, function(index, user){
      if(checkOverlap(user.id)){
        var name_area = `<li class = 'chat-group-user' data-user-id = ${user.id}>
                           <div class = "chat-group-user__name">
                             ${user.name}
                           </div>
                           <div class = "chat-group-user__btn">
                             <a class = "chat-group-user__btn--add" href = "#">
                               追加
                             </a>
                           </div>
                         </li>`;
        html = $(html).append(name_area);
     }else{
      html = "";
     }
    });
    return html;
  }

  function buildHTMLNameResultAgain(html_result_again){
    html_result_again.find("a").html("追加").removeClass("chat-group-user__btn--remove").addClass("chat-group-user__btn--add");
    html_result_again.find("input").remove();
    if( $("#chat-group-users ul").size() ){
      html_result_again = $("<ul class = 'user-search-result'></ul>").append(html_result_again);
    }
    return html_result_again;
  }


  function buildHTMLNameStage(html_stage){
    html_stage.find("a").html("削除").removeClass("chat-group-user__btn--add").addClass("chat-group-user__btn--remove");
    var user_id = $(html_stage).attr("data-user-id");
    var hidden_form = `<input name="group[user_ids][]" type="hidden" value = "${user_id}" />`;
    $(html_stage).append(hidden_form);
    return html_stage;
  }



  $(document).on("click", ".chat-group-user__btn--add", function(e){
    e.preventDefault();
    var html_result = $(this).parents("li");
    $(this).parents("li").remove();
    var html_stage = buildHTMLNameStage(html_result);
    if( !($("#stage ul").size()) ){
      $("#stage").append("<ul class = 'chat-group-member'></ul>");
    }
    $("#stage ul").append(html_stage);
  });

  $(document).on("click", ".chat-group-user__btn--remove", function(e){
    e.preventDefault();
    var html_result_again = $(this).parents("li");
    $(this).parents("li").remove();
    html_result_again = buildHTMLNameResultAgain(html_result_again);
    if( !($("#chat-group-users ul").size()) ){
      $("#chat-group-users").append("<ul class = 'chat-group-member'></ul>");
    }
    $("#chat-group-users ul").append(html_result_again);
  });

  var keyword_before = "";
  $("#user_name").keyup(function(e){
      var keyword = $(this).val();
      if(keyword == ""){
        keyword_before = "";
        $("#chat-group-users ul").remove();
      }else if(keyword_before != keyword){
        keyword_before = keyword;
        $.ajax({
          type: "GET",
          url: "/users/search.json",
          data: {
            keyword: keyword
          },
          dataType: "json"
        })
        .done(function(data){
          var html_result = buildHTMLNameResultNew(data.users);
          $("#chat-group-users").append(html_result);
          })
        .fail(function(){
          alert("ajax failed");
        });
      }
  });
});
