import { Stack } from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
  return (
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
  );
}
