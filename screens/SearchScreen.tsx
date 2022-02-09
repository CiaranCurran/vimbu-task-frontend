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
import { useQuery } from "@apollo/client";
import { GET_RESORTS } from "../graphql/queries";
import { Resort } from "../types";
import Animated, { FadeIn, ZoomInUp } from "react-native-reanimated";
import { MapSearch } from "../components/MapSearch";

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const styles = useMemo(() => themedStyles(colorScheme), [colorScheme]);
  const [showDetails, setShowDetails] = useState(false);
  const { loading, error, data } = useQuery(GET_RESORTS);
  const map = useRef<MapView>(null);
  const [selectedResort, setSelectedResort] = useState<Resort>();

  const markerPressHandler = (event: MapEvent, resort: Resort) => {
    setSelectedResort(resort);
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
      <MapSearch resorts={data?.resorts} />
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
  });
