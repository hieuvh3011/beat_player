import { Text, StyleSheet, View, FlatList } from "react-native";
import { Music } from "@/models/music";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import MusicItem from "@/components/MusicItem";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const music = useQuery(api.music.getMusic) || [];

  const renderEmpty = () => {
    return <Text>No music found</Text>;
  };

  const renderItem = ({ item }: { item: Music }) => {
    return (
      <MusicItem
        music={item}
        onPress={() => {
          onPressMusic(item);
        }}
      />
    );
  };

  const onPressMusic = (music: Music) => {
    router.push({
      pathname: "/play_music",
      params: { music: JSON.stringify(music) },
    });
  };

  const keyExtractor = (item: Music) => item._id;

  return (
    <FlatList
      style={styles.fullWidth}
      data={music}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={renderEmpty}
    />
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    width: "100%",
    paddingHorizontal: 16,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingBottom: 100,
  },
});
