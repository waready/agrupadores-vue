import axios from "axios";
import Cookies from "js-cookie";

var sessionToken = Cookies.get("token");
// var refreshToken = Cookies.get('refreshToken');

const http = axios.create({
  baseURL: process.env.VUE_APP_APIREST_URL,
  headers: {
    Authorization: sessionToken
  }
});

export default http;
