import React from "react";
import { StyleSheet, View } from "react-native";
import { Container, Button, Text } from "native-base";
import globalStyles from "../styles/global";
import { useNavigation } from "@react-navigation/native";

const NuevaOrden = () => {
  const navigation = useNavigation();
  return (
    <Container style={globalStyles.contenedor}>
      <View style={[globalStyles.contenido, styles.contenido]}>
        <Button
          rounded
          block
          onPress={() => navigation.navigate("Menu")}
          style={globalStyles.boton}
        >
          <Text style={globalStyles.botonTexto}>Nueva Orden</Text>
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  contenido: {
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default NuevaOrden;
