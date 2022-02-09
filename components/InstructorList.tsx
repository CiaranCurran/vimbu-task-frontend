import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
} from "react-native";
import { useState, useRef } from "react";
import { Instructor } from "../types";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

export type InstructorListProps = {
  instructors: Instructor[] | undefined;
};

const ITEMWIDTH = 300;
const ITEMMARGIN = 10;
const ITEMLENGTHX = ITEMWIDTH + ITEMMARGIN * 2;

export function InstructorList({ instructors }: InstructorListProps) {
  const navigation = useNavigation();
  const list = useRef<any>({});
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [offset, setOffset] = useState(0);

  return (
    <View style={styles.container}>
      <ScrollView
        onLayout={(e) => {
          setWidth(e.nativeEvent.layout.width);
          setHeight(e.nativeEvent.layout.height);
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
        contentContainerStyle={{
          alignItems: "center",
          paddingLeft: width / 2 - ITEMLENGTHX / 2,
          paddingRight: width / 2 - ITEMLENGTHX / 2,
        }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        onScroll={(e) => setOffset(e.nativeEvent.contentOffset.x)}
        scrollEventThrottle={16}
      >
        {instructors?.map((item, i) => (
          <View
            style={{
              ...styles.instructorContainer,
              // The following logic would naturally be cleaned up by maintaing a list of refs and helper functions - for expediency I will leave it as is
              // Compute height and opacity relative to the item's offset from the centre of the container
              height:
                Math.abs(
                  width / 2 - (i * ITEMLENGTHX + ITEMLENGTHX / 2 - offset),
                ) >
                width / 2
                  ? height / 2
                  : Math.abs(
                      width / 2 - (i * ITEMLENGTHX + ITEMLENGTHX / 2 - offset),
                    ) === 0
                  ? 1
                  : height / 2 +
                    (height / 2) *
                      (1 -
                        Math.abs(
                          width / 2 -
                            (i * ITEMLENGTHX +
                              ITEMLENGTHX / 2 -
                              offset +
                              width / 2 -
                              ITEMLENGTHX / 2),
                        ) /
                          (width / 2)),
              opacity:
                Math.abs(
                  width / 2 - (i * ITEMLENGTHX + ITEMLENGTHX / 2 - offset),
                ) === 0
                  ? 1
                  : width /
                    2 /
                    Math.abs(
                      width / 2 - (i * ITEMLENGTHX + ITEMLENGTHX / 2 - offset),
                    ) /
                    2,
            }}
            key={i}
          >
            <TouchableNativeFeedback
              style={styles.instructorView}
              onPress={() => {
                navigation.navigate("InstructorScreen");
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={styles.instructorImage}
                  source={{ uri: item.image }}
                />
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: Colors.light.tint,
                  }}
                >
                  {item.firstName + " " + item.lastName}
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  instructorContainer: {
    width: ITEMWIDTH,
    margin: ITEMMARGIN,
    height: "100%",
    flex: 1,
    backgroundColor: Colors.light.background,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  instructorView: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 10,
  },
  instructorImage: {
    height: 80,
    width: 80,
    borderRadius: 100,
  },
});
