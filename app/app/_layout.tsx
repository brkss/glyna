import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="settings/DataSource"
          options={{
            presentation: "transparentModal",
            title: "Data Source",
            headerShown: false,
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
