import http  from "./http.js";
import store from "@/store";

var prefijo= 'ardwsbt'
var token = store.state.Token
//var prefijo = 'odwsbt'
class ApiService {
    static async GetAgrupadores(){

        let user = {
            "Btinreq": {
                "Requerimiento": 1,
                "Canal": "BTDIGITAL",
                "Usuario": "INSTALADOR",
                "Token": token,
                "Device": 1
              }
        }
        return (await http.post("com.dlya.bantotal."+prefijo+"_BTIndicadores?ObtenerAgrupadores",user)).data;
      }
      static async GetIndicadores(id){

        let user = {
            "Btinreq": {
                "Requerimiento": 1,
                "Canal": "BTDIGITAL",
                "Usuario": "INSTALADOR",
                "Device": 1,
                "Token": token,
              },
            "IdAgrupador": parseInt(id)
        }
        return (await http.post("com.dlya.bantotal."+prefijo+"_BTIndicadores?ObtenerIndxAgru",user)).data;
      }
      static async getSucursalesCajas(){

        let user = {
            "Btinreq": {
              "Requerimiento": 1,
              "Canal": "BTDIGITAL",
              "Usuario": "INSTALADOR",
              "Device": 1,
              "Token": token,
              },
        }
        return (await http.post("com.dlya.bantotal."+prefijo+"_BTIndicadores?ObtenerSucursalesCajas",user)).data;
      }
      static async getCotizaciones(){

        let user = {
            "Btinreq": {
              "Requerimiento": 1,
              "Canal": "BTDIGITAL",
              "Usuario": "INSTALADOR",
              "Device": 1,
              "Token": token,
              },
        }
        return (await http.post("com.dlya.bantotal."+prefijo+"_BTIndicadores?ObtenerMonedasIndices",user)).data;
      }
      static async getCuadreMonedaSaldos(){

        let user = {
            "Btinreq": {
              "Requerimiento": 1,
              "Canal": "BTDIGITAL",
              "Usuario": "INSTALADOR",
              "Device": 1,
              "Token": token,
              },
        }
        return (await http.post("com.dlya.bantotal."+prefijo+"_BTIndicadores?ObtenerCuadreMonedasSaldos",user)).data;
      }



}

export default ApiService;