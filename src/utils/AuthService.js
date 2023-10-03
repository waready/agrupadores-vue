import http from "@/utils/http.js";
import secureStorage from "./secureStorage.js";
import router from "../router";
import store from "@/store";

const prefijo = process.env.VUE_APP_API_PREFIJO;
const version = process.env.VUE_APP_API_VERSION;
const btServicesEnv = process.env.VUE_APP_BTEXPOSER;
const btServicesEnabled = btServicesEnv === "true";

const API_URL = btServicesEnabled
  ? `${prefijo}Indicadores/${version}/`
  : `com.dlya.bantotal.${prefijo}_BTIndicadores_${version}?`;

class AuthService {
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
        ? `Authenticate/${version}/Execute`
        : `com.dlya.bantotal.${prefijo}_Authenticate_${version}?Execute`;

      const headers = {
        Requerimiento: 1,
        Device: 1,
        Canal: "BTDIGITAL",
        Usuario: username
      };

      const response = await http.post(`${url}`,user,
        { headers }
      );

      const data = response.data;
      AuthService.saveAccessToken(data);
      return { success: true, data, message: "" };
    } catch (e) {
      return { success: false, message: "Error en la autenticación: " + e };
    }
  }

  static saveAccessToken(tokenResponse) {
    secureStorage.setItem("token", `${tokenResponse.SessionToken}`);
  }

  static async postRequest(endpoint, parametros) {
    const token = store.state.Token;
    const usuario = store.state.user;

    const user = {
      Btinreq: {
        Requerimiento: 1,
        Canal: "BTDIGITAL",
        Usuario: usuario,
        Token: token,
        Device: 1
      }
    };
    
    const headers = {
      Requerimiento: 1,
      Canal: "BTDIGITAL",
      Usuario: usuario,
      Token: token,
      Device: 1
    };

    const data = {
      Requerimiento: 1,
      Canal: "BTDIGITAL",
      Usuario: usuario,
      Token: token,
      Device: 1
    };

    if (btServicesEnabled) {
      const response = await (endpoint === "ObtenerIndicadores"
        ? http.post(`${API_URL}${endpoint}`, { ...user, ...parametros }, { headers })
        : http.get(`${API_URL}${endpoint}`, { params: data, headers }));

      return response.data;
    } else {
      console.log("nooo esta!")
      return (await http.post(`${API_URL}${endpoint}`, { ...user, ...parametros })).data;
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

  static async GetIndicadores(id) {
    // const endpoint = btServicesEnabled
    //   ? `ObtenerIndicadores`
    //   : `ObtenerIndicadores/${parseInt(id)}`;
    const endpoint = `ObtenerIndicadores`;
    return this.postRequest(endpoint, { agrupadorId: parseInt(id) });
  }

  static async GetAgrupadores() {
    const endpoint = "ObtenerAgrupadores";
    return this.postRequest(endpoint, {});
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
