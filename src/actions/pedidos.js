import {
    ADD_PEDIDO,
    RETRIEVE_PEDIDOS,
    UPDATE_PEDIDO,
    DELETE_PEDIDO,
    DELETE_ALL_PEDIDOS
  } from "./types";
  
  import PedidosService from "../services/pedidos.service";
  
  export const addPedido = (Bastidor, Modelo, Matricula, FechaEntrega) => async (dispatch) => {
    try {
      //const Pedidos ={Bastidor: this.Bastidor, Modelo: this.Modelo, Matricula: this.Matricula, FechaEntrega: this.FechaEntrega}  
      //const res = await PedidosService.create({ Bastidor, Modelo, Matricula, FechaEntrega });
      const res = await PedidosService.add({ Bastidor, Modelo, Matricula, FechaEntrega });
  
      dispatch({
        type: ADD_PEDIDO,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrievePedidos = () => async (dispatch) => {
    try {
      const res = await PedidosService.getAll();
      //console.log(res.data);
      dispatch({
        type: RETRIEVE_PEDIDOS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updatePedido = (id, data) => async (dispatch) => {
    try {
      const res = await PedidosService.update(id, data);
  
      dispatch({
        type: UPDATE_PEDIDO,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deletePedido = (Pedido) => async (dispatch) => {
    try {
      await PedidosService.delete(Pedido);
  
      dispatch({
        type: DELETE_PEDIDO,
        payload: { Pedido },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteAllPedidos = () => async (dispatch) => {
    try {
      const res = await PedidosService.deleteAll();
  
      dispatch({
        type: DELETE_ALL_PEDIDOS,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  