import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { 
  Pressable, 
  StyleSheet, 
  View, 
  ScrollView,
  Keyboard,
  Dimensions
} from "react-native";

/**
 * Note that this should be used with the presentation: "transparentModal" !
 */

interface Props {
  h?: number; // modal height 0 -> 100%
  children: React.ReactNode;
}
export const ModalView = ({ children, h = 50 }: Props) => {
  const router = useRouter();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
      setIsKeyboardVisible(true);
    });
    
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  const modalHeight = isKeyboardVisible 
    ? Math.min((screenHeight - keyboardHeight) * 0.9, screenHeight * (h / 100))
    : screenHeight * (h / 100);

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
            height: modalHeight,
            bottom: isKeyboardVisible ? keyboardHeight : 0,
          },
        ]}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    width: "100%",
    position: "absolute",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    padding: 30,
  },
  scrollContent: {
    flexGrow: 1,
  },
  backButton: {
    flex: 1,
  },
});
