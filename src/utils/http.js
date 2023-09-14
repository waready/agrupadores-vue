import axios from "axios";
import Cookies from "js-cookie";
import store from "@/store";

var sessionToken = Cookies.get("token");
// var refreshToken = Cookies.get('refreshToken');
var token = store.state.Token;

const http = axios.create({
  baseURL: process.env.VUE_APP_APIREST_URL,
  headers: {
    Authorization: sessionToken,
    Requerimiento: 1,
    Canal: "BTDIGITAL",
    Usuario: "INSTALADOR",
    Token: token,
    Device: 1
  }
});

export default http;
