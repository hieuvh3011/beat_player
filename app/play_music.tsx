import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Slider from "@react-native-community/slider";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useLocalSearchParams } from "expo-router";
import { Music } from "@/models/music";

const PlayMusic = () => {
  const params = useLocalSearchParams();
  const music: Music = Array.isArray(params.music)
    ? JSON.parse(params.music[0])
    : JSON.parse(params.music);
  console.log("music = ", music);

  const {
    loadAudio,
    togglePlayPause,
    seek,
    isPlaying,
    position,
    duration,
    isLoading,
  } = useAudioPlayer();

  useEffect(() => {
    loadAudio(music.musicUrl);

    return () => {
      loadAudio(null);
    };
  }, []);

  const formatTime = (millisecond: number) => {
    const minutes = Math.floor(millisecond / 60000);
    const seconds = Math.floor((millisecond % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{music.beatName}</Text>
      <Text style={styles.author}>{music.author}</Text>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onSlidingComplete={seek}
        minimumTrackTintColor="#1DB954"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#1DB954"
      />
      <Text style={styles.time}>
        {formatTime(position)} / {formatTime(duration)}
      </Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#1DB954" />
      ) : (
        <TouchableOpacity style={styles.iconButton} onPress={togglePlayPause}>
          <IconSymbol
            name={isPlaying ? "pause.circle" : "play.circle"}
            size={80}
            color="#1DB954"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  slider: {
    width: 300,
    height: 40,
    marginBottom: 16,
  },
  time: {
    fontSize: 14,
    color: "#333",
    marginBottom: 16,
  },
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PlayMusic;
