(function (global) {
    var app = global.app = global.app || {};
	
    app.makeUrlAbsolute = function (url) {
            var anchorEl = document.createElement("a");
            anchorEl.href = url;
            return anchorEl.href;
        };

    document.addEventListener("deviceready", function () {
            
        navigator.splashscreen.hide();
		
        // aca se coloca todo aquello que se quiere hacer ni bien se inicializa la aplicación
        
        //Push
        app.everlive = new Everlive({
        appId: app.config.everlive.appId,
        scheme: app.config.everlive.scheme
    	});
        
        if (!app.isKeySet(app.config.everlive.appId)) {
            $(app.config.views.init).hide();
            $('#pushApp').addClass('noappid-scrn').html(app.constants.NO_APP_ID_MESSAGE);
            return;
        } else if (!app.isKeySet(app.androidProjectNumber) && device.platform.toLowerCase() === 'android') {
            $(app.config.views.init).hide();
            $('#pushApp').addClass('noappid-scrn').html(app.constants.NO_GOOGLE_API_PROJECT_NUMBER);
            return;
        }
        
        function onConfirm(buttonIndex) {
            // aca se puede hacer programar hacer algo cuadno se apreta el boton del callback
            
        	//alert('You selected button ' + buttonIndex);
        }
        
        function alertDismissed(str) {
        	// aca se puede hacer programar hacer algo cuadno se apreta el boton del callback
            var protocol1="http";
            var protocol2="https";
             if(str!="" && (str.indexOf(protocol1) !=-1 || str.indexOf(protocol2) !=-1)){
            	var ref = cordova.InAppBrowser.open(str, '_system', 'location=yes');
        	}
            
           
        }
        
        function onPrompt(results) {
            // aca se puede hacer programar hacer algo cuadno se apreta el boton del callback
             navigator.notification.alert(
                'Gracias por su respuesta.', // message
                alertDismissed, // callback
                'Respuesta Recibida', // title
                'Done' // buttonName
            );
            //alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
        }


        
        var onAndroidPushReceived = function(args) {
           	var str = JSON.stringify(args);
            var obj = $.parseJSON(str);
			
            navigator.notification.alert(
                obj.payload.message, // message
                alertDismissed(obj.payload.message), // callback
                obj.payload.title, // title
                'Done' // buttonName
            );
            /*
            navigator.notification.prompt(
                obj.payload.message,  // message
                onPrompt,                  // callback to invoke
                obj.payload.title,            // title
                ['Ok','Cancel']//,             // buttonLabels
                //'Valor de respuesta por default'                 // defaultText
            );
            */
           
			/*
            navigator.notification.confirm(
                obj.payload.message, // message
                onConfirm,            // callback to invoke with index of button pressed
                obj.payload.title,           // title
                ['OK','Cancel']     // buttonLabels
            );
            */
        };
        
        var onIosPushReceived = function(args) {
            
            var str = JSON.stringify(args);
            var obj = $.parseJSON(str);
			
            navigator.notification.alert(
                obj.payload.message, // message
                alertDismissed(obj.payload.message), // callback
                obj.payload.title, // title
                'Done' // buttonName
            );
            /*
            navigator.notification.prompt(
                obj.payload.message,  // message
                onPrompt,                  // callback to invoke
                obj.payload.title,            // title
                ['Ok','Cancel']//,             // buttonLabels
                //'Valor de respuesta por default'                 // defaultText
            );
            */
           
			/*
            navigator.notification.confirm(
                obj.payload.message, // message
                onConfirm,            // callback to invoke with index of button pressed
                obj.payload.title,           // title
                ['OK','Cancel']     // buttonLabels
            );
            */
            
            
        };
        
        var onWP8PushReceived = function (args) {
            
            var str = JSON.stringify(args);
            var obj = $.parseJSON(str);
			
            navigator.notification.alert(
                obj.payload.message, // message
                alertDismissed(obj.payload.message), // callback
                obj.payload.title, // title
                'Done' // buttonName
            );
            /*
            navigator.notification.prompt(
                obj.payload.message,  // message
                onPrompt,                  // callback to invoke
                obj.payload.title,            // title
                ['Ok','Cancel']//,             // buttonLabels
                //'Valor de respuesta por default'                 // defaultText
            );
            */
           
			/*
            navigator.notification.confirm(
                obj.payload.message, // message
                onConfirm,            // callback to invoke with index of button pressed
                obj.payload.title,           // title
                ['OK','Cancel']     // buttonLabels
            );
            */
            
        };
        
         var _onDeviceIsRegistered = function () {
            app.hideLoading();

        };
        
        var pushSettings = {
                android: {
                    senderID: app.androidProjectNumber
                },
                iOS: {
                    badge: 'true',
                    sound: 'true',
                    alert: 'true'
                },
                wp8: {
                    channelName: 'EverlivePushChannel'
                },
                notificationCallbackAndroid : onAndroidPushReceived,
                notificationCallbackIOS: onIosPushReceived,
                notificationCallbackWP8: onWP8PushReceived,
                customParameters: {
                    Age: 21
                }
            };
        
         app.everlive.push.register(pushSettings)
                .then(
                    _onDeviceIsRegistered,
                    function (err) {
                        app.hideLoading();
                        alert('REGISTER ERROR: ' + JSON.stringify(err));
                    }
                );
        
        //fin Push
        
        
       /* // si quiero cambiar el skin de la aplicacion
        app.changeSkin = function (e) {
            var mobileSkin = "";

            if (e.sender.element.text() === "Flat") {
                e.sender.element.text("Native");
                mobileSkin = "flat";
            } else {
                e.sender.element.text("Flat");
                mobileSkin = "";
            }

            app.application.skin(mobileSkin);
        };
        */
		var that = this;
        
        dataSource = new kendo.data.DataSource({
              transport: {
                read: {
                  url: "http://guevaraservicelb.iaas-guevara-cia.com:8099/esb/api/v2/gappservice/_proc/sp_obtener_plan",                    
                  method: "GET",
                  dataType: "json", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                  data: { api_key:"b46cdad63bbd397853c5f4b93b3fa16e1b71decd620c3825d47bdd8daf5da0e1"
                          
                        
                        } 
                }
              },
              schema: { //sólo para aquellos servicio que devuelven con un nivel de anidamiento incial llamado "resource"
                data: function(response) {
                  //return response.resource;
                  return response;  
                }
              }
            });
            
        	
        	dataSource.fetch(function(){
             var data = this.data();
             var plan;
       		 plan=data[0].plan;
             
                
                 if(plan=="BR"){
                    app.application = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout-br" });
                    var mobileSkin = "";
                    mobileSkin = "flat";
                    app.application.skin(mobileSkin);

                }else if(plan=="PL"){
                    app.application = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout-pl" });
                    var mobileSkin = "";
                    mobileSkin = "flat";
                    app.application.skin(mobileSkin);
                }else if(plan=="OR"){
                    app.application = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout-or" });
                    var mobileSkin = "";
                    mobileSkin = "flat";
                    app.application.skin(mobileSkin);
                }else if(plan=="PT"){
                    app.application = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout-pt" });
                    var mobileSkin = "";
                    mobileSkin = "flat";
                    app.application.skin(mobileSkin);
                }
        
                
            //navigator.notification.alert("aqui"+plan,function () { }, "Info", 'OK');
            
            });
            
        	
        
        
        
       
        
    }, false);
    
    
       
})(window);