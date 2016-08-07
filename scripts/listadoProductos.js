(function (global, $) {
    var ListadoProductoViewModel,
        //idcategoria = global.categoria = global.categoria || {},
        app = global.app = global.app || {};
   		
    

    ListadoProductoViewModel = kendo.data.ObservableObject.extend({
        idcategoria: "",
        listadoProductoDataSource: null,
       
        init: function () {
            var that = this,
                dataSource,
                jsonUrlToLoad;

            kendo.data.ObservableObject.fn.init.apply(that, []);// no borrar!!!!
			
            
            //When you build for Apache Cordova 3.0.0, apply this code instead of using relative URLs. In Apache Cordova 3.0.0, relative URLs might not work properly.
            //jsonUrlToLoad = app.makeUrlAbsolute("data/weather.json");
            
			
            
            dataSource = new kendo.data.DataSource({
              transport: {
                  read: function(options) {
                      // make JSONP request to http://demos.telerik.com/kendo-ui/service/products/create
                      $.ajax({
                        url: "http://guevaraservicelb.iaas-guevara-cia.com:8099/esb/api/v2/gappservice/_proc/sp_lista_productos_x_categoria",
                        method: "POST",
                    	dataType: "json",
                        // send the created data items as the "models" service parameter encoded in JSON
                        data: {
                            api_key:"b46cdad63bbd397853c5f4b93b3fa16e1b71decd620c3825d47bdd8daf5da0e1",
                            params: [{
                                    name: "idcategoria",
                                    value:  options.data[0]
                                }]

                        },
                        success: function(result) {
                          // notify the data source that the request succeeded
                          options.success(result);
                        },
                        error: function(result) {
                          // notify the data source that the request failed
                          options.error(result);
                        }
                      });
                  }
                           
                      	
                        
                  }
            });  
            
            that.set("listadoProductoDataSource", dataSource);
         
        },
        refreshListaProductos : function(e) {
            //navigator.notification.alert( "Entro a refresh",function () { }, "Login failed", 'OK');
            
            $("#listaProductosListView").data("kendoMobileListView").dataSource.read(e.view.params.id);
            $("#listaProductosListView").kendoMobileListView({
                    template : $("#producto-template").html()
                });
            var listView = $("#listaProductosListView").data("kendoMobileListView");
            listView.refresh();
            return;
        },
 
        showListaProductos : function(e) {
 			//navigator.notification.alert( e.view.params.id,function () { }, "Login failed", 'OK');
            
            $("#listaProductosListView").kendoMobileListView({
                    dataSource : dataSource//,
            });
            
            
            /*
            if ($("#listaProductosListView").data("kendoMobileListView") != null) {
                //$("#listaProductosListView").data("kendoMobileListView").dataSource.read();
                
                navigator.notification.alert( "Entro a diferente de nulo",function () { }, "Login failed", 'OK');
                $("#listaProductosListView").data("kendoMobileListView").dataSource.read(e.view.params.id);
                var listView = $("#listaProductosListView").data("kendoMobileListView");
            	listView.refresh();
                return;
                
            } else {
                //navigator.notification.alert( "Entro a nulo",function () { }, "Login failed", 'OK');
                
                
                
            }
            */
            
            
        }
        
        
    });

    app.listadoProductoService = {
        viewModel: new ListadoProductoViewModel()
    };
    
   
    
    
    
})(window,jQuery);