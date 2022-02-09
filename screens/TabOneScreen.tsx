import { StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to my app</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View
        style={{
          position: "absolute",
          bottom: 50,
          right: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "orange", margin: 5 }}>
          Find instructors here!
        </Text>
        <FontAwesome5 name="hand-point-down" size={30} color={"orange"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
