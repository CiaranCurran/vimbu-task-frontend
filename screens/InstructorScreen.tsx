import { RouteProp, StackActions } from "@react-navigation/native";
import { Platform, StyleSheet, Image } from "react-native";

import { Text, View } from "../components/Themed";
import { Instructor } from "../types";

type InstructorScreenParamList = {
  route: RouteProp<{ params: { instructorParam: Instructor } }, "params">;
};

export default function InstructorScreen({
  route: { params: instructorParam },
  navigation,
}) {
  const instructor = { ...instructorParam } as Instructor;

  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
        onPress={() => navigation.dispatch(StackActions.pop())}
      >
        {instructor?.firstName} {instructor?.lastName}
      </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Image style={styles.image} source={{ uri: instructor.image }} />
      <Text style={styles.rate}>{`Rate: €${instructor.rate}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: Platform.OS === "android" ? 80 : 0,
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
  image: {
    width: 200,
    height: 200,
    borderRadius: 200,
  },
  rate: {
    fontSize: 40,
    marginTop: 20,
  },
});
