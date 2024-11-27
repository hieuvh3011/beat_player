import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { useState, useEffect } from 'react';

interface AudioPlayer {
  loadAudio: (url: string | null) => Promise<void>;
  togglePlayPause: () => Promise<void>;
  seek: (positionMillis: number) => Promise<void>;
  isPlaying: boolean;
  position: number;
  duration: number;
  isLoading: boolean;
}

export const useAudioPlayer = (): AudioPlayer => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
    }).then(() => {
      console.log("Audio mode set successfully");
    }).catch((err) => {
      console.error("Error setting audio mode:", err);
    });
  }, []);

  const loadAudio = async (url: string | null): Promise<void> => {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }

    if (url) {
      setIsLoading(true);
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: false }
      );

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setPosition(status.positionMillis || 0);
          setDuration(status.durationMillis || 0);
          setIsPlaying(status.isPlaying);
          setIsLoading(false);
        }
      });

      setSound(newSound);
    }
  };

  const togglePlayPause = async (): Promise<void> => {
    if (!sound) return;
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  const seek = async (positionMillis: number): Promise<void> => {
    if (sound) {
      await sound.setPositionAsync(positionMillis);
    }
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return {
    loadAudio,
    togglePlayPause,
    seek,
    isPlaying,
    position,
    duration,
    isLoading,
  };
};
