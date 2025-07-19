import { icon } from "@/constants/icon";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface Props {
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  routeName: "index" | "record" | "profile";
  label: string;
  color: string;
}

export const TabBarButton: React.FC<Props> = ({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  color,
  label,
}) => {
  const scale = useSharedValue(0);

  React.useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, { duration: 350 });
  }, [scale, isFocused]);

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scale.value, [0, 1], [1, 0]),
  }));

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    const top = interpolate(scale.value, [0, 1], [0, 9]);
    return {
      transform: [
        {
          scale: scaleValue,
        },
      ],
      top: top,
    };
  });

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarItem}
    >
      <Animated.View style={animatedIconStyle}>
        {icon[routeName]({
          color: isFocused ? "#fff" : "#fff",
        })}
      </Animated.View>

      <Animated.Text
        style={[
          { color: isFocused ? "#fff" : "#fff", fontSize: 12 },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
