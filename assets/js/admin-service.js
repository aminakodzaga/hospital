var AdminService = {
    init: function(){
    var token = localStorage.getItem("token");
    if (token){
      window.location.replace("admin.html");
    }

    $('#loginForm').validate({
      submitHandler: function(form) {
        var entity = Object.fromEntries((new FormData(form)).entries());
        AdminService.login(entity);
      }
    });
  },
  
  login: function(entity){
    $.ajax({
      url: 'rest/login',
      type: 'POST',
      data: JSON.stringify(entity),
      contentType: "application/json",
      dataType: "json",
      success: function(result) {
        localStorage.removeItem("token");
        localStorage.setItem("token", result.token);
        window.location.replace("admin.html");
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest.responseText);      
    }
    });
  },

  logout: function(){
    localStorage.clear();
    window.location.replace("login.html");
  }
}