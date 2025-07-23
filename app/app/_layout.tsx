import { Stack } from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Settings ! */}
      <Stack.Screen
        name="Settings/DataSource"
        options={{ presentation: "modal", title: "Data Source" }}
      />
    </Stack>
  );
}
