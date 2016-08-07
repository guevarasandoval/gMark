(function (global) {
    var InicioViewModel,
        app = global.app = global.app || {};

    InicioViewModel = kendo.data.ObservableObject.extend({
        storeName: "",
        descripcionEmpresa: "",
		
        
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
              app.inicioService.viewModel.set("storeName", data[0].value); 
              app.inicioService.viewModel.set("descripcionEmpresa", data[13].value); 
              return;
            });
       	
            
        }
    });

    app.inicioService = {
        viewModel: new InicioViewModel()
    };
})(window);