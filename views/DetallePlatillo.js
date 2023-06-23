import { StyleSheet, Image } from "react-native";
import React, { useContext } from "react";
import PedidoContext from "../context/pedidos/pedidosContext";
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Body,
  Text,
  H1,
  Card,
  CardItem,
} from "native-base";
import globalStyles from "../styles/global";
import { useNavigation } from "@react-navigation/native";

const DetallePlatillo = () => {
  const { platillo } = useContext(PedidoContext);
  const { nombre, imagen, descripcion, precio } = platillo;
  const navigation = useNavigation();

  return (
    <Container style={globalStyles.contenedor}>
      <Content style={globalStyles.contenido}>
        <H1 style={globalStyles.titulo}>{nombre}</H1>
        <Card>
          <CardItem>
            <Body>
              <Image style={globalStyles.imagen} source={{ uri: imagen }} />
              <Text style={{ marginTop: 20 }}>{descripcion}</Text>
              <Text style={globalStyles.cantidad}>Precio: $ {precio}</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>

      <Footer>
        <FooterTab>
          <Button
            onPress={() => navigation.navigate("FormularioPlatillo")}
            style={globalStyles.boton}
          >
            <Text style={globalStyles.botonTexto}>Ordenar Platillo</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default DetallePlatillo;

const styles = StyleSheet.create({});
