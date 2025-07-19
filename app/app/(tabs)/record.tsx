import React from "react";
import { StyleSheet, Text, View } from "react-native";

const RecordPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Record Page </Text>
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
