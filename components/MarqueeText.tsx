import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  View,
  Dimensions,
  TextStyle,
  ViewStyle,
} from "react-native";

interface MarqueeTextProps {
  text: string;
  speed?: number;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
  isPlaying?: boolean;
  containerWidth?: number;
}

const MarqueeText: React.FC<MarqueeTextProps> = ({
  text,
  speed = 50, // 50px/s
  textStyle = {},
  containerStyle = {},
  isPlaying = false,
  containerWidth = Dimensions.get("window").width,
}) => {
  const animation = useRef(new Animated.Value(0)).current;
  const textWidth = useRef(0);
  const isFirstRun = useRef(true);

  useEffect(() => {
    const startAnimation = () => {
      if (!isPlaying || textWidth.current === 0) {
        animation.setValue(containerWidth / 2 - textWidth.current / 2);
        return;
      }

      const loopAnimation = () => {
        const fromPosition = isFirstRun.current
          ? containerWidth / 2 - textWidth.current / 2
          : -textWidth.current;

        isFirstRun.current = false;

        animation.setValue(fromPosition);
        Animated.timing(animation, {
          toValue: containerWidth,
          duration: ((containerWidth + textWidth.current) / speed) * 1000,
          useNativeDriver: true,
        }).start(() => loopAnimation());
      };

      loopAnimation();
    };

    startAnimation();
  }, [isPlaying, textWidth.current]);

  return (
    <View style={[styles.container, { width: containerWidth }, containerStyle]}>
      <Animated.Text
        style={[
          styles.text,
          textStyle,
          {
            transform: [
              {
                translateX: animation.interpolate({
                  inputRange: [0, containerWidth],
                  outputRange: [
                    containerWidth / 2 - textWidth.current / 2,
                    -textWidth.current,
                  ],
                }),
              },
            ],
            textAlign: "left",
          },
        ]}
        onLayout={(e) => {
          textWidth.current = e.nativeEvent.layout.width;
        }}
        numberOfLines={isPlaying ? undefined : 1}
        ellipsizeMode={isPlaying ? undefined : "tail"}
      >
        {text}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  text: {
    fontSize: 16,
    color: "#000",
  },
});

export default React.memo(MarqueeText);
