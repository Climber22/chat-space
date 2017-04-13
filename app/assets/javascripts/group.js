$(function(){
  // newの方
  $("#user_name").keyup(function(e){
    e.preventDefault();
    alert("ok");
      var keyword = $(this).val();
      $.ajax({
        type: "POST",
        url: "/groups/search.json",
        data: {
          user_name: {
            keyword: keyword
          }
        },
        dataType: "json"
      })
    });

  // $("#new_group").on("submit", function(e){
  //   e.preventDefault();
  //   var group_menber_field = $("#user_name").val();
  // });
  // $(".edit_group").on("submit", function(e){
  //   e.preventDefault();
  // });
});
