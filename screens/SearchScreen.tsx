import { Dimensions, Platform, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, useThemeColor, View } from "../components/Themed";

import MapView, { Marker } from "react-native-maps";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export default function SearchScreen() {
  const colorScheme = useColorScheme();

  return (
    <View
      style={
        colorScheme === "dark" ? darkStyles.container : lightStyles.container
      }
    >
      <View style={baseStyles.mapViewWrapper}>
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            borderRadius: 20,
          }}
        >
          <Marker coordinate={{ latitude: 48.9, longitude: 11.39 }} />
        </MapView>
      </View>
    </View>
  );
}

const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  mapViewWrapper: {
    width: "100%",
    height: "100%",
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

const lightStyles = StyleSheet.create({
  container: {
    ...baseStyles.container,
    backgroundColor: Colors.light.background,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    ...baseStyles.container,
    backgroundColor: Colors.dark.background,
  },
});
