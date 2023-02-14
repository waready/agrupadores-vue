/**
 * Author: Wilson Pilco Nuñez
 * Email: wilsonaux1@gmail.com
 * Created at: 2023-01-16 22:28
 */

import http from "src/utils/http.js";

class MarketplaceService {
  static async getPublicacions(params) {
    return (await http.get("api/marketplace/publicacion/", { params })).data;
  }

  static async getPublicacion(id) {
    return (await http.get(`api/marketplace/publicacion/${id}/`)).data;
  }

  static async savePublicacion(reg) {
    if (reg.id === undefined || reg.id === null) {
      return (await http.post("api/marketplace/publicacion/", reg)).data;
    } else {
      return (await http.put(`api/marketplace/publicacion/${reg.id}/`, reg))
        .data;
    }
  }

  static async deletePublicacion(id) {
    return (await http.delete(`api/marketplace/publicacion/${id}/`)).data;
  }
}

export default MarketplaceService;
