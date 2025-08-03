import { BloodSugarGraph } from "@/component/BloodSugarGraph";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const sampleData = [
  { time: new Date("2025-07-29T01:00:00"), value: 85 },
  { time: new Date("2025-07-29T01:30:00"), value: 92 },
  { time: new Date("2025-07-29T02:00:00"), value: 88 },
  { time: new Date("2025-07-29T02:30:00"), value: 95 },
  { time: new Date("2025-07-29T03:00:00"), value: 120 },
  { time: new Date("2025-07-29T03:30:00"), value: 115 },
  { time: new Date("2025-07-29T04:00:00"), value: 98 },
  { time: new Date("2025-07-29T04:30:00"), value: 102 },
  { time: new Date("2025-07-29T05:00:00"), value: 95 },
  { time: new Date("2025-07-29T05:30:00"), value: 89 },
  { time: new Date("2025-07-29T06:00:00"), value: 75 },
  { time: new Date("2025-07-29T06:30:00"), value: 68 },
  { time: new Date("2025-07-29T07:00:00"), value: 72 },
  { time: new Date("2025-07-29T07:30:00"), value: 85 },
  { time: new Date("2025-07-29T08:00:00"), value: 110 },
  { time: new Date("2025-07-29T08:30:00"), value: 145 },
  { time: new Date("2025-07-29T09:00:00"), value: 180 },
  { time: new Date("2025-07-29T09:30:00"), value: 165 },
  { time: new Date("2025-07-29T10:00:00"), value: 140 },
  { time: new Date("2025-07-29T10:30:00"), value: 125 },
];

const HomePage: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#111" }}>
      <StatusBar style="light" translucent={false} />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.currentReading}>178</Text>
          <Text style={styles.unit}>mg/dL</Text>
          <FontAwesome6
            name="arrow-right-long"
            style={styles.arrow}
            size={24}
            color="white"
          />
        </View>

        <BloodSugarGraph data={sampleData} height={300} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: "baseline",
    flexDirection: "row",
  },
  currentReading: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  unit: {
    marginLeft: 4,
    fontSize: 18,
    color: "#888",
  },
  arrow: {
    marginLeft: 12,
  },
});
