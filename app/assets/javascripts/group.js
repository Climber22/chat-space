$(function(){
  function buildHTMLNameResultNew(users){
    var html = "";
    $.each(users, function(index, user){
      var name_area = `<li class = 'chat-group-user' data-user_id = ${user.id}>
                         <div class = "chat-group-user__name">
                           ${user.name}
                         </div>
                         <div class = "chat-group-user__btn">
                           <a class = "chat-group-user__btn--add" href = "#">
                             追加
                           </a>
                         </div>
                       </li>`;
      html += name_area;
    });
    return html;
  }


  function buildHTMLNameStage(html_stage){
    html_stage.find("a").html("削除");
    html_stage.find("a").removeClass("chat-group-user__btn--add").addClass("chat-group-user__btn--remove");
    var id = $(html_stage).attr("id");
    var hidden_form = `<input name="group[user_ids][]" type="hidden" value = "${id}" />`;
    $(html_stage).append(hidden_form);
    return html_stage;
  }

  $("#user_name").keyup(function(e){
      var keyword = $(this).val();
      if( $(".edit_group").size()){
        var group_id = $(".edit_group").attr("id").replace(/edit_group_/, "");
        var action = "edit";
      }else{
        var group_id = "";
        var action = "new";
      }
      if(keyword == ""){
        $("#chat-group-users ul").remove();
      }else{
        $.ajax({
          type: "GET",
          url: "/groups/search.json",
          data: {
            user_name: {
              keyword: keyword
            },
            group: {
              id: group_id
            },
            action_before: action
          },
          dataType: "json"
        })
        .done(function(data){
          if( !($("#chat-group-users ul").size()) ){
            $("#chat-group-users").append("<ul class = 'user-search-result'></ul>");
          }
          var html_result = buildHTMLNameResultNew(data.users);
          $("#chat-group-users ul").append(html_result);

          $(".chat-group-user__btn--add").on("click", function(e){
            e.preventDefault();
            var html_result = $(this).parents("li");
            $(this).parents(".chat-group-user").remove();
            var html_stage = buildHTMLNameStage(html_result);
            if( !($("#stage #user-stage").size()) ){
              $("#stage").append("<div id='user-stage'></div>");
            }
            if( !($("#user-stage ul").size()) ){
              $("#user-stage").append("<ul class = 'user-search-stage'></ul>");
            }
            $("#user-stage ul").append(html_stage);
          });

          $(".chat-group-user__btn--remove").on("click", function(e){
            e.preventDefault();
            console.log("test");
          });

        })
      }
    });
});
