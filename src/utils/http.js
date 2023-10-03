import axios from "axios";
import Cookies from "js-cookie";


// Obtén el token de sesión y otros datos de tu almacenamiento o fuente adecuada.
var sessionToken = Cookies.get("token");


const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});

export default http;
