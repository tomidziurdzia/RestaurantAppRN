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
} from "native-base";
import globalStyles from "../styles/global";
import PedidoContext from "../context/pedidos/pedidosContext";
import { useNavigation } from "@react-navigation/native";

const FormularioPlatillo = () => {
  const [cantidad, setCantidad] = useState(1);
  const { platillo, guardarPedido } = useContext(PedidoContext);
  const { precio } = platillo;
  const navigation = useNavigation();

  const aumentarUno = () => {
    const nuevaCantidad = parseInt(cantidad) + 1;
    setCantidad(nuevaCantidad);
  };

  const decrementarUno = () => {
    if (cantidad > 1) {
      const nuevaCantidad = parseInt(cantidad) - 1;
      setCantidad(nuevaCantidad);
    }
  };

  const [total, setTotal] = useState(0);

  const calcularTotal = () => {
    const totalPagar = precio * cantidad;
    setTotal(totalPagar);
  };

  useEffect(() => {
    calcularTotal();
  }, [cantidad]);

  const confirmarOrden = () => {
    Alert.alert(
      "Deseas confirmar tu pedido?",
      "Un pedido confirmado ya no se podra modificar",
      [
        {
          text: "Confirmar",
          onPress: () => {
            // ALmacenar pedido
            const pedido = {
              ...platillo,
              cantidad,
              total,
            };

            guardarPedido(pedido);
            navigation.navigate("ResumenPedido");
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
    <Container>
      <Content>
        <Form>
          <Text style={globalStyles.titulo}>Cantidad</Text>
          <Grid>
            <Col>
              <Button
                full
                props
                dark
                onPress={() => decrementarUno()}
                style={{ height: 80, justifyContent: "center" }}
              >
                <Icon style={{ fontSize: 40 }} name="remove" />
              </Button>
            </Col>
            <Col>
              <Input
                value={cantidad.toString()}
                style={{ textAlign: "center", fontSize: 20 }}
                onChangeText={() => setCantidad(cantidad)}
                keyboardType="numeric"
              />
            </Col>
            <Col>
              <Button
                onPress={() => aumentarUno()}
                full
                props
                dark
                style={{ height: 80, justifyContent: "center" }}
              >
                <Icon style={{ fontSize: 40 }} name="add" />
              </Button>
            </Col>
          </Grid>
          <Text style={globalStyles.cantidad}>Total: ${total}</Text>
        </Form>
      </Content>
      <Footer>
        <FooterTab>
          <Button onPress={confirmarOrden} style={globalStyles.boton}>
            <Text style={globalStyles.botonTexto}>Agregar al pedido</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default FormularioPlatillo;

const styles = StyleSheet.create({});
