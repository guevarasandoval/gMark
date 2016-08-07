(function (global) {
    var ServicioViewModel,
        app = global.app = global.app || {};

    ServicioViewModel = kendo.data.ObservableObject.extend({
        tituloServicio1: "",
        descripcionServicio1: "",
        tituloServicio2: "",
        descripcionServicio2: "",
        tituloServicio3: "",
        descripcionServicio3: "",
        tituloServicio4: "",
        descripcionServicio4: "",
		
        onShow: function () {
            var that = this;

            
            var dataSource = new kendo.data.DataSource({
              transport: {
                 read: {
                  url: "http://guevaraservicelb.iaas-guevara-cia.com:8099/esb/api/v2/gappservice/_proc/sp_lista_info_services",                    
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
              app.servicioService.viewModel.set("tituloServicio1", data[0].value); 
              app.servicioService.viewModel.set("tituloServicio2", data[1].value); 
              app.servicioService.viewModel.set("tituloServicio3", data[2].value); 
              app.servicioService.viewModel.set("tituloServicio4", data[3].value);
               
              app.servicioService.viewModel.set("descripcionServicio1", data[4].value); 
              app.servicioService.viewModel.set("descripcionServicio2", data[5].value); 
              app.servicioService.viewModel.set("descripcionServicio3", data[6].value); 
              app.servicioService.viewModel.set("descripcionServicio4", data[7].value); 
               
               
               
              return;
            });
       	
            
        }
    });

    app.servicioService = {
        viewModel: new ServicioViewModel()
    };
})(window);