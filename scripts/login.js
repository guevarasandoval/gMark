(function (global) {
    var LoginViewModel,
        app = global.app = global.app || {};

    LoginViewModel = kendo.data.ObservableObject.extend({
        isLoggedIn: false,
        username: "",
        password: "",
		
        onLogin: function () {
            var that = this,
                username = that.get("username").trim(),
                password = that.get("password").trim();

            if (username === "" || password === "") {
                navigator.notification.alert("Both fields are required!",
                    function () { }, "Login failed", 'OK');

                return;
            }
			
            
            
            var dataSource = new kendo.data.DataSource({
              transport: {
                read: {
                  url: "http://guevaraservicelb.iaas-guevara-cia.com:8099/esb/api/v2/menajedelivery/_table/md_users",                    
                  dataType: "json", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                  data: { api_key:"ad90c65513c075fa144e472fdd20fff33cb65fa676b88aa9be464db885123304",
                          filter:"username="+username
                        
                        } // search for tweets that contain "html5"
                }
              },
              schema: {
                data: function(response) {
                  return response.resource; // twitter's response is { "statuses": [ /* results */ ] }
                }
              }
            });
            
           dataSource.fetch(function(){
              var data = this.data();
               
               if (data[0].username == username ) {
                that.set("isLoggedIn", true);
                return;
            	}else{
                    
                    navigator.notification.alert("Error en Logueo",
                    function () { }, "Login failed", 'OK');  
                    that.set("isLoggedIn", false);
                return;
                }
               
               
               
            });
       	
            
        },

        onLogout: function () {
            var that = this;

            that.clearForm();
            that.set("isLoggedIn", false);
        },

        clearForm: function () {
            var that = this;

            that.set("username", "");
            that.set("password", "");
        },

        checkEnter: function (e) {
            var that = this;

            if (e.keyCode == 13) {
                $(e.target).blur();
                that.onLogin();
            }
        }
    });

    app.loginService = {
        viewModel: new LoginViewModel()
    };
})(window);