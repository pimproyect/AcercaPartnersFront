import {
    ADD_PEDIDO,
    RETRIEVE_PEDIDOS,
    UPDATE_PEDIDO,
    DELETE_PEDIDO,
    DELETE_ALL_PEDIDOS,
  } from "../actions/types";
  
  const initialState = [];
  
  function tutorialReducer(tutorials = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case ADD_PEDIDO:
        return [...tutorials, payload];
  
      case RETRIEVE_PEDIDOS:
          
        return payload;
  
      case     UPDATE_PEDIDO:
        return tutorials.map((tutorial) => {
          if (tutorial.id === payload.id) {
            return {
              ...tutorial,
              ...payload,
            };
          } else {
            return tutorial;
          }
        });
  
      case DELETE_PEDIDO:
        return tutorials.filter(({ id }) => id !== payload.id);
  
      case DELETE_ALL_PEDIDOS:
        return [];
  
      default:
        return tutorials;
    }
  };
  
  export default tutorialReducer;