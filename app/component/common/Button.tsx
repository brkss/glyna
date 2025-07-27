import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  buttonText: string;
  onPress: () => void;
}

export const Button = ({ buttonText, onPress }: Props) => {
  return (
    <View>
      <Pressable onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    //textAlign: "center",
  },
});
