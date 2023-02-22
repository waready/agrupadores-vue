import Cookies from "js-cookie";
import http from "src/utils/http.js";

class AuthService {
  static async login(username, password) {
    try {
      let user = {
        Btinreq: {
          Requerimiento: 1,
          Device: 1,
          Token: "?",
          Usuario: username,
          Canal: "BTVISION"
        },
        UserId: username,
        UserPassword: password
      };
      var response = await http.post(
        "com.dlya.bantotal.odwsbt_Authenticate_v1?Execute",
        user
      );
      // var response = {
      //   data :"holi"
      // } 
    
      var data = response.data;
      Cookies.set("token", "Bearer " + data.access);
      Cookies.set("refreshToken", data.refresh);
      return {
        success: true,
        data:data,
        message: ""
      };
    } catch (e) {
      return {
        success: false,
        message: "Error en la autenticacion: " + e.response.data.detail
      };
    } finally {
      //
    }
  }
}

export default AuthService;
