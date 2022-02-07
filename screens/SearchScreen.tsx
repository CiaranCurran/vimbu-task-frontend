import {
  ColorSchemeName,
  Dimensions,
  Platform,
  StyleSheet,
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, useThemeColor, View } from "../components/Themed";

import MapView, { MapEvent, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { createRef, useMemo, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const styles = useMemo(() => themedStyles(colorScheme), [colorScheme]);
  const [showDetails, setShowDetails] = useState(false);

  const map = useRef<MapView>(null);

  const markerPressHandler = (event: MapEvent) => {
    setShowDetails(true);
    map.current?.animateCamera(
      {
        center: event.nativeEvent.coordinate,
        pitch: 2,
        heading: 0,
        altitude: 2000,
        zoom: 10,
      },
      { duration: 1000 },
    );
  };

  const onPressToExitHandler = (event: MapEvent) => {
    setShowDetails(false);
    map.current?.animateCamera(
      {
        center: event.nativeEvent.coordinate,
        pitch: 2,
        heading: 0,
        altitude: 2000,
        zoom: 5,
      },
      { duration: 500 },
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapViewWrapper}>
        <MapView
          ref={map}
          initialRegion={{
            latitude: 48.9049353,
            longitude: 11.3947024,
            latitudeDelta: 50,
            longitudeDelta: 50,
          }}
          showsCompass={false}
          showsMyLocationButton={false}
          showsScale={false}
          showsTraffic={false}
          showsUserLocation={false}
          toolbarEnabled={false}
          customMapStyle={Colors[colorScheme].mapStyle}
          provider={PROVIDER_GOOGLE}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            borderRadius: 20,
          }}
        >
          <Marker
            coordinate={{ latitude: 48.9, longitude: 11.39 }}
            onPress={markerPressHandler}
            title={"marker"}
            onSelect={() => {
              console.log("selected");
            }}
          />
        </MapView>
        {showDetails && (
          <View style={styles.detailsContainer} pointerEvents="none">
            <LinearGradient
              colors={["rgba(255,255,255,0)", "rgba(0,209,255,1)"]}
              style={styles.gradientOverlay}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const themedStyles = (colorScheme: NonNullable<ColorSchemeName>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      backgroundColor: Colors[colorScheme].background,
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
    detailsContainer: {
      width: "100%",
      height: "100%",
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
      top: 0,
      borderRadius: 20,
      backgroundColor: "transparent",
    },
    detailsHeader: {
      width: "80%",
      position: "absolute",
      top: -100,
      height: "10%",
      backgroundColor: Colors[colorScheme].background,
    },
    gradientOverlay: {
      width: "100%",
      height: "40%",
      position: "absolute",
      bottom: 0,
      borderRadius: 20,
    },
  });
