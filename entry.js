import "expo-router/entry";
import TrackPlayer from "react-native-track-player";
import { SetupService } from "./service/SetupService";

(async () => {
  await SetupService();
})();

TrackPlayer.registerPlaybackService(() => require("./service/PlaybackService"));
