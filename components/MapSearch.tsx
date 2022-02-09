import {
  View,
  StyleSheet,
  ColorSchemeName,
  ImageBackground,
  Text,
} from "react-native";
import Colors from "../constants/Colors";
import MapView, { PROVIDER_GOOGLE, Marker, MapEvent } from "react-native-maps";
import useColorScheme from "../hooks/useColorScheme";
import React, { useRef, useState } from "react";
import { Resort } from "../types";
import Animated, {
  FadeIn,
  FadeOut,
  ZoomInDown,
  ZoomInUp,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { InstructorList } from "./InstructorList";

export type MapSearchProps = {
  resorts: Resort[];
};

export function MapSearch({ resorts }: MapSearchProps) {
  const colorScheme = useColorScheme();
  const styles = themedStyles(colorScheme);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedResort, setSelectedResort] = useState<Resort>();
  const map = useRef<MapView>(null);

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
        center: {
          latitude: initialRegion.latitude,
          longitude: initialRegion.longitude,
        },
        pitch: 2,
        heading: 0,
        altitude: 2000,
        zoom: 4,
      },
      { duration: 500 },
    );
  };

  return (
    <View style={styles.mapViewWrapper}>
      <MapView
        ref={map}
        initialRegion={initialRegion}
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
          backgroundColor: Colors[colorScheme].background,
          borderRadius: 20,
        }}
      >
        {resorts?.map((resort: Resort) => (
          <Marker
            key={resort.id}
            coordinate={{
              latitude: resort.latitude,
              longitude: resort.longitude,
            }}
            onPress={(event) => markerPressHandler(event, resort)}
            title={resort.name}
            pinColor={Colors.light.tint}
            onSelect={() => {
              console.log("selected");
            }}
          />
        ))}
      </MapView>
      {showDetails && (
        <>
          <Animated.View
            style={styles.detailsContainer}
            pointerEvents="none"
            entering={FadeIn.duration(1000)}
            exiting={FadeOut.duration(500)}
          >
            <Animated.View
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
              entering={ZoomInUp.duration(500)}
            >
              <ImageBackground
                resizeMode="cover"
                source={{ uri: selectedResort?.image }}
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
                  <Text style={styles.headerTitle}>{selectedResort?.name}</Text>
                  <Text style={styles.subHeader}>
                    {selectedResort?.country}
                  </Text>
                  <Text style={styles.rate}>{`Lessons from €${Math.min(
                    ...selectedResort?.instructors.map((i) => i.rate),
                  )}/h`}</Text>
                </View>
              </ImageBackground>
            </Animated.View>
            <LinearGradient
              colors={["rgba(255,255,255,0)", "rgba(0,209,255,1)"]}
              style={styles.gradientOverlay}
            />
          </Animated.View>
          <Text style={styles.returnText} onPress={onPressToExitHandler}>
            {"Return to map"}
          </Text>
          <Animated.View
            style={{
              width: "100%",
              height: "20%",
              backgroundColor: "transparent",
              position: "absolute",
              bottom: "10%",
            }}
            entering={ZoomInDown.duration(1000)}
            exiting={FadeOut.duration(500)}
          >
            <InstructorList instructors={selectedResort?.instructors} />
          </Animated.View>
        </>
      )}
    </View>
  );
}

const initialRegion = {
  latitude: 48.9049353,
  longitude: 11.3947024,
  latitudeDelta: 50,
  longitudeDelta: 50,
};

const themedStyles = (colorScheme: NonNullable<ColorSchemeName>) =>
  StyleSheet.create({
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
      padding: 10,
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
      padding: 0,
      margin: 0,
      lineHeight: 22,
    },
    returnText: {
      color: Colors.dark.text,
      position: "absolute",
      bottom: 10,
      fontWeight: "bold",
    },
    rate: {
      color: Colors.dark.text,
      fontWeight: "bold",
      fontSize: 20,
      position: "absolute",
      bottom: 10,
      right: 10,
    },
  });
