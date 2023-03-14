import http  from "./http.js";
import store from "@/store";

//var prefijo= 'ardwsbt'
var prefijo = 'odwsbt'
class ApiService {
    static async GetAgrupadores(){

        let user = {
            "Btinreq": {
                "Requerimiento": 1,
                "Canal": "BTDIGITAL",
                "Usuario": "?",
                "Device": "?",
                "Token": "?"
              }
        }
        return (await http.post("com.dlya.bantotal."+prefijo+"_BTIndicadores?ObtenerAgrupadores",user)).data;
      }
      static async GetIndicadores(id){

        let user = {
            "Btinreq": {
                "Requerimiento": 1,
                "Canal": "BTDIGITAL",
                "Usuario": "?",
                "Device": "?",
                "Token": "?"
              },
            "codigo": id
        }
        return (await http.post("com.dlya.bantotal.odwsbt_BTIndicadores?ObtenerIndicadoresPorAgrupador",user)).data;
      }
      static async getSucursalesCajas(){

        let user = {
            "Btinreq": {
                "Requerimiento": 1,
                "Canal": "BTDIGITAL",
                "Usuario": "?",
                "Device": "?",
                "Token": "?"
              },
        }
        return (await http.post("com.dlya.bantotal.odwsbt_BTIndicadores?InformacionDeSucursalesCajas",user)).data;
      }
      static async getCotizaciones(){

        let user = {
            "Btinreq": {
                "Requerimiento": 1,
                "Canal": "BTDIGITAL",
                "Usuario": "?",
                "Device": "?",
                "Token": "?"
              },
        }
        return (await http.post("com.dlya.bantotal.odwsbt_BTIndicadores?InformacionDeCotizacion",user)).data;
      }


}

export default ApiService;