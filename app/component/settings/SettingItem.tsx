import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  title: string;
  onClick: () => void;
  Icon: any;
  iconName: string;
}

export const SettingItem: React.FC<Props> = ({
  onClick,
  title,
  Icon,
  iconName,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Icon name={iconName} size={20} />
        <Text style={styles.text}>{title}</Text>
      </View>
      <FontAwesome6 name="arrow-right-long" size={20} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#E6E6E6",
    marginBottom: 11,
    flexDirection: "row",
    borderRadius: 12,
    justifyContent: "space-between",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 7,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
