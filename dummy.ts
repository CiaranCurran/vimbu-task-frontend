import DefaultImage from "./les_deus_alpes.jpeg";
import { Image } from "react-native";
const DEFAULT_IMAGE = Image.resolveAssetSource(DefaultImage).uri;

export const resorts = [
  {
    id: "les",
    name: "Les Deus Alpes",
    coordinates: { latitude: 45.0156572, longitude: 6.1175621 },
    image: DEFAULT_IMAGE,
    country: "France",
  },
];
