import { StyleSheet } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">About this app</ThemedText>
      </ThemedView>
      <ThemedText>This page is the introduction about this app</ThemedText>
      <Collapsible title="Tech-stack">
        <ThemedText>This app is using simple tech stack:</ThemedText>
        <ThemedText>- Mobile app: React Native</ThemedText>
        <ThemedText>- Routing: Expo Routing</ThemedText>
        <ThemedText>- Music storage: Convex File</ThemedText>
        <ThemedText>- Data: Convex Data</ThemedText>
      </Collapsible>
      <Collapsible title="How to run app">
        <ThemedText>You can run this app by following these steps:</ThemedText>
        <ThemedText>- Clone this repo</ThemedText>
        <ThemedText>- Install dependencies: npm install</ThemedText>
        <ThemedText>- Run app: npx expo start</ThemedText>
      </Collapsible>

      <Collapsible title="What did I achieve in this app">
        <ThemedText>
          Learn how to use Convex and Expo. I usually use React Native CLI +
          Firebase, but I want to try Expo + Convex, since you are using it.
        </ThemedText>
      </Collapsible>

      <Collapsible title="What did I miss in this app">
        <ThemedText>
          Unable to play music in the background or create screen widgets like
          other apps such as SoundCloud or Spotify. This is likely a limitation
          of Expo, as it cannot access Native APIs. I attempted to convert the
          project to React Native CLI on a separate branch (feat/eject-expo), but due to time
          constraints, I decided to accept the current output of the app.
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
