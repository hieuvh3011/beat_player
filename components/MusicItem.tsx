import { Music } from "@/models/music";
import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

interface MusicItemProps {
  music: Music;
  onPress: () => void;
}

export default function MusicItem({ music, onPress }: MusicItemProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={onPress}
    >
      <Image
        source={{ uri: "https://fakeimg.pl/250x250/" }}
        style={styles.image}
      />
      <View style={styles.textArea}>
        <Text
          numberOfLines={1}
          style={styles.title}
        >{`${music.beatName}.mp3`}</Text>
        <Text style={styles.author}>{`Author: ${music.author}`}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FAFAFA",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  textArea: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  author: {
    fontSize: 12,
    marginTop: 4,
    fontStyle: "italic",
  },
});
