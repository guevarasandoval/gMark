(function (global) {
    var CatalogoViewModel,
        //idcategoria = global.categoria = global.categoria || {},
        app = global.app = global.app || {};
   		
    

    CatalogoViewModel = kendo.data.ObservableObject.extend({
        catalogoDataSource: null,
        
		
        init: function () {
            var that = this,
                dataSource,
                jsonUrlToLoad;

            kendo.data.ObservableObject.fn.init.apply(that, []);// no borrar!!!!

            //When you build for Apache Cordova 3.0.0, apply this code instead of using relative URLs. In Apache Cordova 3.0.0, relative URLs might not work properly.
            //jsonUrlToLoad = app.makeUrlAbsolute("data/weather.json");
            

            
            dataSource = new kendo.data.DataSource({
              transport: {
                read: {
                  url: "http://guevaraservicelb.iaas-guevara-cia.com:8099/esb/api/v2/gappservice/_proc/sp_lista_categorias",                    
                  method: "GET",
                  dataType: "json", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                  data: { api_key:"b46cdad63bbd397853c5f4b93b3fa16e1b71decd620c3825d47bdd8daf5da0e1"
                          
                        
                        } 
                }
              }//,
             // schema: { //sólo para aquellos serviciso que devuelven con un nivel de anidamiento incial llamado "resource"
               // data: function(response) {
                //  return response.resource;
                //}
             // }
            });
            
           
            
            that.set("catalogoDataSource", dataSource);
         
        },
        
        itemClick: function(e) {
        
        //var that = this;
        var dataItem = e.dataItem;
        //categoria=dataItem.id;  
        //global.idcategoria=  categoria;
        //navigator.notification.alert(global.idcategoria,function () { }, "Login failed", 'OK');
        app.application.navigate("#tabstrip-listadoProductos?id=" + dataItem.id);
        //app.application.navigate("#tabstrip-listadoProductos");
		    

    	}
        
        
    });

    app.catalogoService = {
        viewModel: new CatalogoViewModel()
    };
    
    
    
    
})(window);