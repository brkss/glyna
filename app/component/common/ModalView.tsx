import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

/**
 * Note that this should be used with the presentation: "transparentModal" !
 */

interface Props {
  h?: number; // modal height 0 -> 100%
  children: React.ReactNode;
}
export const ModalView = ({ children, h = 50 }: Props) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backButton} />
      <BlurView
        intensity={100}
        experimentalBlurMethod="dimezisBlurView"
        tint="extraLight"
        style={[
          styles.body,
          {
            height: `${h}%`,
          },
        ]}
      >
        {children}
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    height: "70%",
    width: "100%",
    position: "absolute",
    bottom: 0,

    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    padding: 30,
  },
  backButton: {
    flex: 1,
  },
});
