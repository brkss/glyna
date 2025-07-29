import { Stack } from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="Settings/DataSource"
        options={{
          presentation: "transparentModal",
          title: "Data Source",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Record/InsulinRecord"
        options={{
          presentation: "transparentModal",
          title: "Add Insulin Record",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
