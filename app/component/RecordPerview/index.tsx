import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  value: number;
  unit: string;
  type: "carbs" | "insulin";
  title?: string;
  time?: string;
}

export const RecordPreview: React.FC<Props> = ({
  value,
  unit,
  type,
  title,
  time,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome6
          name={type === "insulin" ? "droplet" : "bowl-food"}
          size={24}
          color="white"
        />
      </View>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{value}</Text>
          <Text style={styles.unit}>{unit}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#000",
    marginVertical: 4,
  },
  iconContainer: {
    backgroundColor: "#222",
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginRight: 12,
  },
  header: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: "#888",
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  unit: {
    fontSize: 16,
    color: "#888",
    marginLeft: 4,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  time: {
    fontSize: 12,
    color: "#888",
  },
});
