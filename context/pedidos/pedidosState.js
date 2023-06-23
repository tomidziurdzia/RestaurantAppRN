import { useReducer } from "react";
import PedidoReducer from "./pedidosReducer";
import PedidoContext from "./pedidosContext";
import {
  SELECCIONAR_PRODUCTO,
  CONFIRMAR_ORDERNAR_PLATILLO,
  MOSTRAR_RESUMEN,
  ELIMINAR_PRODUCTO,
  PEDIDO_ORDENADO,
} from "../../types";

const PedidoState = (props) => {
  // State inicial
  const initialState = {
    pedido: [],
    platillo: null,
    total: 0,
    idpedido: "",
  };

  //useReducer con dispatch para las funciones
  const [state, dispatch] = useReducer(PedidoReducer, initialState);

  //Selecciona producto
  const seleccionarPlatillo = (platillo) => {
    dispatch({
      type: SELECCIONAR_PRODUCTO,
      payload: platillo,
    });
  };

  const guardarPedido = (pedido) => {
    dispatch({
      type: CONFIRMAR_ORDERNAR_PLATILLO,
      payload: pedido,
    });
  };

  const mostrarResumen = (total) => {
    dispatch({
      type: MOSTRAR_RESUMEN,
      payload: total,
    });
  };

  const eliminarProducto = (id) => {
    dispatch({
      type: ELIMINAR_PRODUCTO,
      payload: id,
    });
  };

  const pedidoRealizado = (id) => {
    dispatch({
      type: PEDIDO_ORDENADO,
      payload: id,
    });
  };

  return (
    <PedidoContext.Provider
      value={{
        idpedido: state.idpedido,
        pedido: state.pedido,
        seleccionarPlatillo,
        total: state.total,
        mostrarResumen,
        platillo: state.platillo,
        guardarPedido,
        eliminarProducto,
        pedidoRealizado,
      }}
    >
      {props.children}
    </PedidoContext.Provider>
  );
};

export default PedidoState;
