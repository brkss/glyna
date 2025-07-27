import React from "react";
import { TextInput as Input, StyleSheet, Text, View } from "react-native";

interface Props {
  label: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  type?: "default" | "password" | "url";
}

export const TextInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  type,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        secureTextEntry={type === "password"}
        keyboardType={type === "url" ? "url" : "default"}
        autoCapitalize={"none"}
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
  },
});
