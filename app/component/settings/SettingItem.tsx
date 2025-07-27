import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
    <Pressable onPress={onClick} style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.iconContainer}>
          <Icon name={iconName} size={20} />
        </View>
        <Text style={styles.text}>{title}</Text>
      </View>
      <FontAwesome6
        name="arrow-right-long"
        size={18}
        color="black"
        style={{ opacity: 0.7 }}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    //backgroundColor: "#E6E6E6",
    alignItems: "center",
    marginBottom: 15,
    flexDirection: "row",
    borderRadius: 12,
    justifyContent: "space-between",
  },
  iconContainer: {
    backgroundColor: "#f4f7f8",
    padding: 7,
    borderRadius: 100,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    //fontWeight: "bold",
  },
});
