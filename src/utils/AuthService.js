//import Cookies from "js-cookie";
import http from "@/utils/http.js";
import secureStorage  from "./secureStorage.js";
import router from "../router";
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
        "com.dlya.bantotal." + prefijo + "_Authenticate_"+version+"Execute",
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

  static removeToken() {
    localStorage.clear();
    sessionStorage.clear();
  }

  static logout() {
    AuthService.removeToken();
    router.push("/login")
  }
}

export default AuthService;
