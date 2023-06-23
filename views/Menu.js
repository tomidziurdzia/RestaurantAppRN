import { StyleSheet } from "react-native";
import React, { useContext, useEffect, Fragment } from "react";
import FirebaseContext from "../context/firebase/firebaseContext";
import PedidoContext from "../context/pedidos/pedidosContext";
import {
  Container,
  Thumbnail,
  List,
  Text,
  Separator,
  Content,
  ListItem,
  Body,
} from "native-base";
import globalStyles from "../styles/global";
import { useNavigation } from "@react-navigation/native";

const Menu = () => {
  const { obtenerProductos, menu } = useContext(FirebaseContext);
  const { seleccionarPlatillo } = useContext(PedidoContext);
  const navigation = useNavigation();

  useEffect(() => {
    obtenerProductos();
  }, []);

  const mostrarHeading = (categoria, i) => {
    if (i > 0) {
      const categoriaAnterior = menu[i - 1].categoria;
      if (categoriaAnterior !== categoria) {
        return (
          <Separator style={styles.separador}>
            <Text style={styles.separadorTexto}>{categoria}</Text>
          </Separator>
        );
      }
    } else {
      return (
        <Separator style={styles.separador}>
          <Text style={styles.separadorTexto}>{categoria}</Text>
        </Separator>
      );
    }
  };

  return (
    <Container style={globalStyles.contenedor}>
      <Content style={{ backgroundColor: "#FFF" }}>
        <List>
          {menu.map((platillo, i) => {
            const { imagen, nombre, descripcion, categoria, id, precio } =
              platillo;
            return (
              <Fragment key={id}>
                {mostrarHeading(categoria, i)}
                <ListItem
                  onPress={() => {
                    // Eliminar algo del platillo
                    const { existencia, ...platillo2 } = platillo;
                    seleccionarPlatillo(platillo2);

                    navigation.navigate("DetallePlatillo");
                  }}
                >
                  <Thumbnail large source={{ uri: imagen }} />
                  <Body>
                    <Text>{nombre} </Text>
                    <Text note numberOfLines={2}>
                      {descripcion}
                    </Text>
                    <Text>Precio: $ {precio}</Text>
                  </Body>
                </ListItem>
              </Fragment>
            );
          })}
        </List>
      </Content>
    </Container>
  );
};

export default Menu;

const styles = StyleSheet.create({
  separador: {
    backgroundColor: "#000",
  },
  separadorTexto: {
    color: "#FFAD00",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
