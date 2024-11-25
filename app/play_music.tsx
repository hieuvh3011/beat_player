import { Music } from "@/models/music";
import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function PlayMusic() {
  const params = useLocalSearchParams();
  const music: Music = Array.isArray(params.music)
    ? JSON.parse(params.music[0])
    : JSON.parse(params.music);
  console.log("music = ", music.beatName);
  return (
    <View style={styles.container}>
      <Text>Play Music</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
