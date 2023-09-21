//import Cookies from "js-cookie";
import http from "@/utils/http.js";
import secureStorage from "./secureStorage.js";
import router from "../router";
import store from "@/store";
var prefijo = process.env.VUE_APP_API_PREFIJO;
var version = process.env.VUE_APP_API_VERSION;

class AuthService {


  static checkIfHasToken() {
    return secureStorage.getItem("token") !== null;
  }

  static async login(username, password) {
    try {
      let user = {
        Btinreq: {
          Requerimiento: 1,
          Device: 1,
          Token: "?",
          Usuario: username,
          //Canal: "BTVISION"
          Canal: "BTDIGITAL"
        },
        UserId: username,
        UserPassword: password
      };
      var response = await http.post(
        "com.dlya.bantotal." + prefijo + "_Authenticate_" + version + "Execute",
        user
      );
      // var response = {
      //   data :"holi"
      // }

      var data = response.data;
      // Cookies.set("token", "Bearer " + data.access);
      // Cookies.set("refreshToken", data.refresh);
      AuthService.saveAccessToken(response.data);
      return {
        success: true,
        data: data,
        message: ""
      };
    } catch (e) {
      return {
        success: false,
        message: "Error en la autenticacion: " + e
      };
    } finally {
      //
    }
  }

  static saveAccessToken(tokenResponse) {
    secureStorage.setItem(
      "token", `${tokenResponse.SessionToken}`
    );
    //http.defaults.headers["Authorization"] = secureStorage.getItem("token");
  }

  static async postRequest(url, data) {
    var token = store.state.Token;
    //console.log("token", store.state.Token);
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

  static removeToken() {
    localStorage.clear();
    sessionStorage.clear();
  }

  static logout() {
    AuthService.removeToken();
    router.push("/login")
  }

  static async GetAgrupadores() {
    return this.postRequest(
      "com.dlya.bantotal." + prefijo + "_BTIndicadores_" + version + "ObtenerAgrupadores",
      {}
    );
  }

  static async GetIndicadores(id) {
    return this.postRequest(
      "com.dlya.bantotal." + prefijo + "_BTIndicadores_" + version + "ObtenerIndicadores",
      { agrupadorId: parseInt(id) }
    );
  }

  static async getSucursalesCajas() {
    return this.postRequest(
      "com.dlya.bantotal." +
      prefijo +
      "_BTIndicadores_" + version + "ObtenerSucursalesCajas",
      {}
    );
  }

  static async getCotizaciones() {
    return this.postRequest(
      "com.dlya.bantotal." + prefijo + "_BTIndicadores_" + version + "ObtenerMonedasIndices",
      {}
    );
  }

  static async getCuadreMonedaSaldos() {
    return this.postRequest(
      "com.dlya.bantotal." +
      prefijo +
      "_BTIndicadores_" + version + "ObtenerCierreSaldosPorMoneda",
      {}
    );
  }

  static async getCondicionesGenerales() {
    return this.postRequest(
      "com.dlya.bantotal." +
      prefijo +
      "_BTIndicadores_" + version + "ObtenerCondicionesGenerales",
      {}
    );
  }

  static async getRubroBolsas() {
    return this.postRequest(
      "com.dlya.bantotal." + prefijo + "_BTIndicadores_" + version + "ObtenerRubrosBolsas",
      {}
    );
  }

  static async getTansaccionEstado() {
    return this.postRequest(
      "com.dlya.bantotal." +
      prefijo +
      "_BTIndicadores_" + version + "ObtenerTransaccionesEstados",
      {}
    );
  }
}

export default AuthService;
