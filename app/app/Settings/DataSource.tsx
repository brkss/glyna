import { Button, ModalView, TextInput } from "@/component/common";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SettingsDataSource = () => {
  const router = useRouter();
  return (
    <ModalView>
      <Text style={styles.title}>Data Source</Text>
      <View style={{ marginTop: 20 }}>
        <TextInput
          label="Nightscout URL*"
          type="url"
          placeholder="https://example.com"
        />
        <TextInput
          label="API Secret"
          type="password"
          placeholder="API Secret"
        />
        <View style={{ marginTop: 20 }}>
          <Button buttonText="SAVE" onPress={() => {}} />
        </View>
      </View>
    </ModalView>
  );
};

export default SettingsDataSource;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
