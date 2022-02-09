import { ColorSchemeName, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { useQuery } from "@apollo/client";
import { GET_RESORTS } from "../graphql/queries";
import { MapSearch } from "../components/MapSearch";
import { useMemo } from "react";

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const styles = useMemo(() => themedStyles(colorScheme), [colorScheme]);
  const { loading, error, data } = useQuery(GET_RESORTS);

  return (
    <View style={styles.container}>
      {error ? (
        <Text>Ooops... Something went wrong</Text>
      ) : loading ? (
        <Text>...loading</Text>
      ) : (
        <MapSearch resorts={data?.resorts} />
      )}
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
