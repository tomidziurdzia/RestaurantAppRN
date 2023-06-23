import { StyleSheet } from "react-native";
import { Button, Text } from "native-base";
import React, { useContext } from "react";
import globalStyles from "../styles/global";
import { useNavigation } from "@react-navigation/native";
import PedidoContext from "../context/pedidos/pedidosContext";

const BotonResumen = () => {
  const navigation = useNavigation();
  const { pedido } = useContext(PedidoContext);

  if (pedido.length === 0) return null;
  return (
    <Button
      onPress={() => navigation.navigate("ResumenPedido")}
      style={globalStyles.boton}
    >
      <Text style={globalStyles.botonTexto}>Ir a Pedido</Text>
    </Button>
  );
};

export default BotonResumen;
