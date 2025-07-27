import { ModalView } from "@/component/common";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text } from "react-native";

const SettingsDataSource = () => {
  const router = useRouter();
  return (
    <ModalView>
      <Text>Data Source</Text>
    </ModalView>
  );
};

export default SettingsDataSource;

const styles = StyleSheet.create({});
