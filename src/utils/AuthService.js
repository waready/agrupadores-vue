import http from "@/utils/http.js";
import secureStorage from "./secureStorage.js";
import router from "../router";
import store from "@/store";

const prefijo = process.env.VUE_APP_API_PREFIJO;
const version = process.env.VUE_APP_API_VERSION;
const btServicesEnv = process.env.VUE_APP_BTEXPOSER;
const btServicesEnabled = btServicesEnv === 'true';

const API_URL = btServicesEnabled
  ? `${prefijo}BTIndicadores/${version}`
  : `com.dlya.bantotal.${prefijo}_BTIndicadores_${version}`;

class AuthService {
  static checkIfHasToken() {
    return secureStorage.getItem("token") !== null;
  }

  static async login(username, password) {
    try {
      const user = {
        Btinreq: {
          Requerimiento: 1,
          Device: 1,
          Token: "?",
          Usuario: username,
          Canal: "BTDIGITAL"
        },
        UserId: username,
        UserPassword: password
      };

      const url = btServicesEnabled
        ? `Authenticate/${version}Execute`
        : `com.dlya.bantotal.${prefijo}_Authenticate_${version}Execute`;
      const response = await http.post(url, user);

      const data = response.data;
      AuthService.saveAccessToken(data);
      return {
        success: true,
        data: data,
        message: ""
      };
    } catch (e) {
      return {
        success: false,
        message: "Error en la autenticación: " + e
      };
    }
  }

  static saveAccessToken(tokenResponse) {
    secureStorage.setItem("token", `${tokenResponse.SessionToken}`);
  }

  static async postRequest(endpoint, data) {
    const token = store.state.Token;
    const user = {
      Btinreq: {
        Requerimiento: 1,
        Canal: "BTDIGITAL",
        Usuario: "INSTALADOR",
        Token: token,
        Device: 1
      }
    };
  
    if (btServicesEnabled) {
      return (await http.get(`${API_URL}${endpoint}`, { ...user, ...data })).data;
    } else {
      return (await http.post(`${API_URL}${endpoint}`, { ...user, ...data })).data;
    }
  }
  

  static removeToken() {
    localStorage.clear();
    sessionStorage.clear();
  }

  static logout() {
    AuthService.removeToken();
    router.push("/login");
  }

  static async GetAgrupadores() {
    const endpoint = "ObtenerAgrupadores";
    return this.postRequest(endpoint, {});
  }

  static async GetIndicadores(id) {
    const endpoint = `ObtenerIndicadores/${parseInt(id)}`;
    return this.postRequest(endpoint, { agrupadorId: parseInt(id) });
  }
  static async GetIndicadores(id) {
    // Construye la URL de la solicitud condicionalmente
    const endpoint = btServicesEnabled
      ? `ObtenerIndicadores/${parseInt(id)}`
      : `ObtenerIndicadores`;
  
    return this.postRequest(endpoint, { agrupadorId: parseInt(id) });
  }


  static async getSucursalesCajas() {
    const endpoint = "ObtenerSucursalesCajas";
    return this.postRequest(endpoint, {});
  }

  static async getCotizaciones() {
    const endpoint = "ObtenerMonedasIndices";
    return this.postRequest(endpoint, {});
  }

  static async getCuadreMonedaSaldos() {
    const endpoint = "ObtenerCierreSaldosPorMoneda";
    return this.postRequest(endpoint, {});
  }

  static async getCondicionesGenerales() {
    const endpoint = "ObtenerCondicionesGenerales";
    return this.postRequest(endpoint, {});
  }

  static async getRubroBolsas() {
    const endpoint = "ObtenerRubrosBolsas";
    return this.postRequest(endpoint, {});
  }

  static async getTansaccionEstado() {
    const endpoint = "ObtenerTransaccionesEstados";
    return this.postRequest(endpoint, {});
  }
}

export default AuthService;
