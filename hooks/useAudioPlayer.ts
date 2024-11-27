import { useEffect, useState } from "react";
import TrackPlayer, {
  usePlaybackState,
  useProgress,
  State,
} from "react-native-track-player";

export const useTrackPlayer = () => {
  const playbackState = usePlaybackState();
  const { position, duration } = useProgress();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(playbackState.state === State.Playing);
  }, [playbackState]);

  const togglePlayPause = async () => {
    if (playbackState.state === State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  const seek = async (time: number) => {
    await TrackPlayer.seekTo(time);
  };

  return {
    isPlaying,
    position,
    duration,
    togglePlayPause,
    seek,
  };
};
