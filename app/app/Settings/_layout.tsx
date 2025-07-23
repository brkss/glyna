import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: 'modal',
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="DataSource"
        options={{
          title: 'Data Source',
          headerBackTitle: 'Settings',
        }}
      />
    </Stack>
  );
}
