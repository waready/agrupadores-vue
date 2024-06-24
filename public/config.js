/**
 * Author: Antony Japura Paredes
 * Email: antonyjapura11@gmail.com
 * Created at: 2023-06-06 06:06
 */

// Initialize variables globales 
// BTEXPOSER ON ("true") - OFF ("false")

window.GetBTexposer= "false"

// url ambiente - ejemplo:
/*
    url ambiente = http://appjava2019:10222/desaprodv2r3orcl/servlet/com.dlya.bantotal.odwsbt_Authenticate_v1
    GetUrlPro = http://pioneroapp:6004/productogx16/servlet/
*/
/*
    BTEXPOSER
    GetUrlPro = https://pioneroapp2.dlya.corp:3001/api/
*/

window.GetUrlPro= "http://10.25.4.10:6021/bthibrido/servlet/"

//sufijo del ambiente - ejemplo
/*
    url ambiente = http://appjava2019:10222/desaprodv2r3orcl/servlet/com.dlya.bantotal.odwsbt_Authenticate_v1
    GetSufijo = odwsbt
*/
/*
    BTEXPOSER 
    GetSufijo = ""
*/
window.GetSufijo= "ardwsbt"

//Version auth 
/*
    url ambiente = http://appjava2019:10222/desaprodv2r3orcl/servlet/com.dlya.bantotal.odwsbt_Authenticate_v1
    GetVrSer = v1?
*/
/*
    BTEXPOSER
    GetVrSer = v1/
*/
window.GetVrSer= "v1"

//Power bi url embed
/*
    url embed = http://appjava2019:10222/desaprodv2r3orcl/servlet/com.dlya.bantotal.odwsbt_Authenticate_v1
    GetPowerUrlEmbed = http://10.25.4.10:5300/getEmbedToken 
*/
window.GetPowerUrlEmbed = "http://10.25.4.10:5300/getEmbedToken"
