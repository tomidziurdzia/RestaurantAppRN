import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";

import NuevaOrden from "./views/NuevaOrden";
import Menu from "./views/Menu";
import DetallePlatillo from "./views/DetallePlatillo";
import FormularioPlatillo from "./views/FormularioPlatillo";
import ResumenPedido from "./views/ResumenPedido";
import ProgresoPedido from "./views/ProgresoPedido";

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#FFDA00",
            },
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="NuevaOrden"
            component={NuevaOrden}
            options={{ title: "Nueva Orden" }}
          />

          <Stack.Screen
            name="Menu"
            component={Menu}
            options={{ title: "Nuestro Menu" }}
          />

          <Stack.Screen
            name="DetallePlatillo"
            component={DetallePlatillo}
            options={{ title: "Detalle Platillo" }}
          />

          <Stack.Screen
            name="FormularioPlatillo"
            component={FormularioPlatillo}
            options={{ title: "Ordenar Platillo" }}
          />

          <Stack.Screen
            name="ResumenPedido"
            component={ResumenPedido}
            options={{ title: "Resumen Pedido" }}
          />

          <Stack.Screen
            name="ProgresoPedido"
            component={ProgresoPedido}
            options={{ title: "Progreso" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
