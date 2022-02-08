import {
  ColorSchemeName,
  Dimensions,
  ImageBackground,
  Platform,
  StyleSheet,
  Image,
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, useThemeColor, View } from "../components/Themed";
import { resorts } from "../dummy";
import MapView, { MapEvent, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { createRef, useEffect, useMemo, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Resort } from "../types";

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const styles = useMemo(() => themedStyles(colorScheme), [colorScheme]);
  const [showDetails, setShowDetails] = useState(false);
  const [resorts, setResorts] = useState<Resort[]>([]);
  const map = useRef<MapView>(null);

  useEffect(() => {
    const fetchResorts = () => {
      setResorts(resorts);
    };
    fetchResorts();
  }, []);

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

  const onPressToExitHandler = () => {
    setShowDetails(false);
    map.current?.animateCamera(
      {
        center: { latitude: 48.9049353, longitude: 11.3947024 },
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
          {resorts.map((resort) => (
            <Marker
              key={resort.id}
              coordinate={resort.coordinates}
              onPress={markerPressHandler}
              title={"marker"}
              onSelect={() => {
                console.log("selected");
              }}
            />
          ))}
        </MapView>
        {showDetails && (
          <>
            <View style={styles.detailsContainer} pointerEvents="none">
              <ImageBackground
                resizeMode="cover"
                source={{ uri: resorts[0].image }}
                imageStyle={{
                  borderRadius: 20,
                  height: "100%",
                  width: "100%",
                  overflow: "hidden",
                }}
                style={{
                  width: "95%",
                  height: "20%",
                  position: "absolute",
                  top: "5%",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.4)",
                    borderRadius: 20,
                    position: "absolute",
                  }}
                />
                <View style={styles.detailsHeaderContent}>
                  <Text style={styles.headerTitle}>{resorts[0].name}</Text>
                  <Text style={styles.subHeader}>{resorts[0].country}</Text>
                </View>
              </ImageBackground>
              <LinearGradient
                colors={["rgba(255,255,255,0)", "rgba(0,209,255,1)"]}
                style={styles.gradientOverlay}
              />
            </View>
            <Text
              style={{ position: "absolute", bottom: 10 }}
              onPress={onPressToExitHandler}
            >
              {"Return to map"}
            </Text>
          </>
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
      flex: 1,
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
    detailsHeaderContent: {
      width: "100%",
      height: "100%",
      padding: 5,
      backgroundColor: "transparent",
    },
    gradientOverlay: {
      width: "100%",
      height: "40%",
      position: "absolute",
      bottom: 0,
      borderRadius: 20,
    },
    headerTitle: {
      color: Colors.dark.text,
      fontSize: 30,
      fontWeight: "bold",
    },
    subHeader: {
      color: Colors.light.tint,
      fontSize: 20,
      fontWeight: "bold",
    },
  });
