(function (global) {
    var ContactoViewModel,
        app = global.app = global.app || {};

    ContactoViewModel = kendo.data.ObservableObject.extend({
        emailEmpresa: "",
        direccion: "",
        web: "",
        facebook: "",
        twitter: "",
        telefono: "",
        nombreContacto: "",
        emailContacto: "",
        comentario: "",
		
        onShow: function () {
           var that = this;

            
            var dataSource = new kendo.data.DataSource({
              transport: {
                 read: {
                  url: "http://guevaraservicelb.iaas-guevara-cia.com:8099/esb/api/v2/gappservice/_proc/sp_lista_info_home",                    
                  method: "GET",
                  dataType: "json", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                  data: { api_key:"b46cdad63bbd397853c5f4b93b3fa16e1b71decd620c3825d47bdd8daf5da0e1"
                        } 
                }
              }//,
              //schema: {
                //data: function(response) {
                  //return response.resource; // twitter's response is { "statuses": [ /* results */ ] }
                //}
              //}
            });
            
           dataSource.fetch(function(){
              var data = this.data();
               
              app.contactoService.viewModel.set("emailEmpresa", data[1].value); 
              app.contactoService.viewModel.set("direccion", data[4].value); 
              app.contactoService.viewModel.set("web", data[14].value); 
              app.contactoService.viewModel.set("facebook", data[15].value); 
              app.contactoService.viewModel.set("twitter", data[16].value);
              app.contactoService.viewModel.set("telefono", data[5].value); 
               
              return;
            });
       	
            
        },
        
        onSubmit: function () {
            
            var that = this,
                nombreContacto = that.get("nombreContacto").trim(),
                emailContacto = that.get("emailContacto").trim(),
                comentario = that.get("comentario").trim();
				
            
            //navigator.notification.alert( nombreContacto + emailContacto +  comentario,function () { }, "Login failed", 'OK');
            
            var attributes = {
                "Recipients": [
                    emailContacto
                ],
                "Context": {
                    "nombreContacto": nombreContacto,
                    "comentario": comentario,
                    "correoContacto": emailContacto
                }
            };

            $.ajax({
                type: "POST",
                url: 'http://api.everlive.com/v1/Metadata/Applications/020xlv84quf44t6h/EmailTemplates/b0ddbcd0-5c36-11e6-a1e6-d7e1265b2ab1/send',
                contentType: "application/json",
                headers: {
                    "Authorization": "Masterkey nzHakO2Z9B5XcH8nKhFOx2DhVSqozotx"
                },
                data: JSON.stringify(attributes),
                success: function(data) {
                    alert("Email successfully sent.");
                },
                error: function(error) {
                    alert(JSON.stringify(error));
                }
            })
            
            
            
			
            
            /*
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
                  return response.resource; // twitter's response is { "statuses": [ /* results */ /* ] }
               
    			}
              }
            });
            
    		*/
            /*
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
    
    		*/
       	
            
        },
        
        
        
        goToLinkWeb : function(e){
          
            if(device.platform.toLowerCase() === "android"){
                  navigator.app.loadUrl("http://" + this.get("web"), { openExternal:true } ); 
             } else {
                  
                 window.open("http://" + this.get("web"), '_system');
             }
		},
        
        
        goToLinkPhone: function() {
             if(device.platform.toLowerCase() === "android"){
                  navigator.app.loadUrl("tel:" + this.get("telefono"), { openExternal:true } ); 
             } else {
                  
                 window.open("tel:" + this.get("telefono"), '_system');
             }
            
        
        } ,
        
        goToLinkFacebook: function() {
            
            if(device.platform.toLowerCase() === "android"){
                  navigator.app.loadUrl("http://" + this.get("facebook"), { openExternal:true } ); 
             } else {
                  window.open("http://" + this.get("facebook"), '_system');
             }
          
        
        } ,
        
        goToLinkTwitter: function() {
            if(device.platform.toLowerCase() === "android"){
                  navigator.app.loadUrl("http://" + this.get("twitter"), { openExternal:true } ); 
             } else {
                  window.open("http://" + this.get("twitter"), '_system');
             }
            
            
       
        } 
    });

    app.contactoService = {
        viewModel: new ContactoViewModel()
    };
})(window);