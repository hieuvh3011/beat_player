import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Slider from "@react-native-community/slider";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useLocalSearchParams } from "expo-router";
import { Music } from "@/models/music";
import { useTrackPlayer } from "@/hooks/useAudioPlayer";
import { setupPlayer } from "react-native-track-player/lib/src/trackPlayer";
import TrackPlayer from "react-native-track-player";

const PlayMusic = () => {
  const params = useLocalSearchParams();
  const music: Music = Array.isArray(params.music)
    ? JSON.parse(params.music[0])
    : JSON.parse(params.music);
  console.log("music = ", music);

  const { isPlaying, position, duration, togglePlayPause, seek } =
    useTrackPlayer();

  useEffect(() => {
    const setup = async () => {
      await setupPlayer();
      await TrackPlayer.add({
        id: music._id,
        url: music.musicUrl,
        title: music.beatName,
        artist: music.author,
      });
    };

    setup();

    return () => {
      TrackPlayer.reset();
    };
  }, [music]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{music.beatName}</Text>
      <Text style={styles.artist}>{music.author}</Text>

      <Slider
        style={styles.slider}
        value={position}
        maximumValue={duration}
        onSlidingComplete={seek}
        minimumTrackTintColor="#1DB954"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#1DB954"
      />
      <Text style={styles.time}>
        {formatTime(position)} / {formatTime(duration)}
      </Text>

      <TouchableOpacity onPress={togglePlayPause} style={styles.playButton}>
        <IconSymbol
          name={isPlaying ? "pause.circle" : "play.circle"}
          size={80}
          color="#1DB954"
        />
      </TouchableOpacity>
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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  artist: {
    fontSize: 16,
    color: "#888",
    marginBottom: 20,
  },
  slider: {
    width: 300,
    height: 40,
    marginBottom: 10,
  },
  time: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: "#1DB954",
    padding: 15,
    borderRadius: 30,
  },
  playButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default PlayMusic;
