import http from "./http.js";
import store from "@/store";

var prefijo = process.env.VUE_APP_API_PREFIJO
// var version = process.env.VUE_APP_API_VERSION;
class ApiService {
  static async postRequest(url, data) {
    var token = store.state.Token;
    console.log("token", store.state.Token);
    let user = {
      Btinreq: {
        Requerimiento: 1,
        Canal: "BTDIGITAL",
        Usuario: "INSTALADOR",
        Token: token,
        Device: 1
      }
    };
    return (await http.post(url, { ...user, ...data })).data;
  }

  static async GetAgrupadores() {
    return this.postRequest(
      "com.dlya.bantotal." + prefijo + "_BTIndicadores?ObtenerAgrupadores",
      {}
    );
  }

  static async GetIndicadores(id) {
    return this.postRequest(
      "com.dlya.bantotal." + prefijo + "_BTIndicadores?ObtenerIndicadores",
      { agrupadorId: parseInt(id) }
    );
  }

  static async getSucursalesCajas() {
    return this.postRequest(
      "com.dlya.bantotal." +
        prefijo +
        "_BTIndicadores?ObtenerSucursalesCajas",
      {}
    );
  }

  static async getCotizaciones() {
    return this.postRequest(
      "com.dlya.bantotal." + prefijo + "_BTIndicadores?ObtenerMonedasIndices",
      {}
    );
  }

  static async getCuadreMonedaSaldos() {
    return this.postRequest(
      "com.dlya.bantotal." +
        prefijo +
        "_BTIndicadores?ObtenerCierreSaldosPorMoneda",
      {}
    );
  }

  static async getCondicionesGenerales() {
    return this.postRequest(
      "com.dlya.bantotal." +
        prefijo +
        "_BTIndicadores?ObtenerCondicionesGenerales",
      {}
    );
  }

  static async getRubroBolsas() {
    return this.postRequest(
      "com.dlya.bantotal." + prefijo + "_BTIndicadores?ObtenerRubrosBolsa",
      {}
    );
  }

  static async getTansaccionEstado() {
    return this.postRequest(
      "com.dlya.bantotal." +
        prefijo +
        "_BTIndicadores?ObtenerTransaccionesEstados",
      {}
    );
  }
}

export default ApiService;
