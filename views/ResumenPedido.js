import { Alert, StyleSheet } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Content,
  Form,
  Icon,
  Input,
  Grid,
  Button,
  Text,
  Col,
  FooterTab,
  Footer,
  List,
  H1,
  ListItem,
  Left,
  Thumbnail,
  Body,
} from "native-base";
import globalStyles from "../styles/global";
import PedidoContext from "../context/pedidos/pedidosContext";
import { useNavigation } from "@react-navigation/native";
import firebase from "../firebase";

const ResumenPedido = () => {
  const calcularTotal = () => {
    let nuevoTotal = 0;
    nuevoTotal = pedido.reduce(
      (nuevoTotal, articulo) => nuevoTotal + articulo.total,
      0
    );

    mostrarResumen(nuevoTotal);
  };

  const { pedido, total, mostrarResumen, eliminarProducto, pedidoRealizado } =
    useContext(PedidoContext);
  const navigation = useNavigation();

  useEffect(() => {
    calcularTotal();
  }, [pedido]);

  const progresoPedido = () => {
    Alert.alert(
      "Revisa tu pedido",
      "Un pedido confirmado ya no se podra modificar",
      [
        {
          text: "Confirmar",
          onPress: async () => {
            // Firebaser
            const pedidoObj = {
              tiempoEntrega: 0,
              completado: false,
              total: Number(total),
              orden: pedido,
              creado: Date.now(),
            };
            try {
              const pedido = await firebase.db
                .collection("ordenes")
                .add(pedidoObj);

              pedidoRealizado(pedido.id);
              navigation.navigate("ProgresoPedido");
            } catch (error) {
              console.log(error);
            }
          },
        },
        {
          text: "Revisar",
          style: "cancel",
        },
      ]
    );
  };

  const confirmarEliminacion = (id) => {
    Alert.alert(
      "Deseas Eliminar este articulo?",
      "Una vez eliminado ya no se podra modificar",
      [
        {
          text: "Confirmar",
          onPress: () => {
            eliminarProducto(id);
          },
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <Container style={globalStyles.contenedor}>
      <Content style={globalStyles.contenido}>
        <H1 style={globalStyles.titulo}>Resumen Pedido</H1>
        {pedido.map((platillo, i) => {
          const { cantidad, nombre, imagen, id, precio } = platillo;
          return (
            <List key={id + i}>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail large source={{ uri: imagen }} />
                </Left>

                <Body>
                  <Text>{nombre}</Text>
                  <Text>Cantidad: {cantidad}</Text>
                  <Text>Precio: ${precio}</Text>

                  <Button
                    onPress={() => confirmarEliminacion(id)}
                    full
                    danger
                    style={{ marginTop: 20 }}
                  >
                    <Text style={[globalStyles.botonTexto, { color: "#FFF" }]}>
                      Eliminar
                    </Text>
                  </Button>
                </Body>
              </ListItem>
            </List>
          );
        })}
        <Text style={globalStyles.cantidad}>Total a pagar: ${total} </Text>
        <Button
          full
          style={globalStyles.boton}
          onPress={() => navigation.navigate("Menu")}
        >
          <Text style={globalStyles.botonTexto}>Seguir ordenando</Text>
        </Button>
      </Content>
      <Footer>
        <FooterTab>
          <Button full style={globalStyles.boton} onPress={progresoPedido}>
            <Text style={globalStyles.botonTexto}>Ordenar Pedido</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default ResumenPedido;
