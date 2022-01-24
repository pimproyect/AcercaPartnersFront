import http from "../http-common";

class PedidosService {
  getAll() {
    return http.get("/Pedidos");
  }

  get(id) {
    return http.get(`/GetPedido?pedido=${id}`);
  }

  add(data) {
    return http.post("/Pedidos", data);
  }

  update(id, data) {
    return http.put(`/Pedidos/${id}`, data);
  }

  delete(id) {
    return http.post(`/Delete?pedido=${id}`);
  }

  deleteAll() {
    return http.delete(`/Pedidos`);
  }

  findByTitle(title) {
    return http.get(`/Pedidos?title=${title}`);
  }
}

export default new PedidosService();