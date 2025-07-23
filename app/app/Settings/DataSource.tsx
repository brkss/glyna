import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SettingsDataSource = () => {
  return (
    <View style={styles.container}>
      <Text>Data Source</Text>
    </View>
  );
};

export default SettingsDataSource;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
