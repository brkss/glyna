import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const RecordPage: React.FC = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>Record Page </Text>
      <Pressable onPress={() => router.push("/Record/InsulinRecord")}>
        <Text>Add Insulin Record</Text>
      </Pressable>
    </View>
  );
};

export default RecordPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
