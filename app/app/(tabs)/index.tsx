import { BloodSugarGraph } from "@/component/BloodSugarGraph";
import { RecordPreview } from "@/component/RecordPerview";
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

const latestRecords = [
  {
    time: new Date("2025-07-29T01:00:00"),
    value: 12,
    title: "Novorapid",
    type: "insulin",
    unit: "u",
  },
  {
    time: new Date("2025-07-29T01:30:00"),
    value: 92,
    title: "Carbohydrates",
    type: "carbs",
    unit: "g",
  },
  {
    time: new Date("2025-07-29T02:00:00"),
    value: 88,
    title: "Carbohydrates",
    type: "carbs",
    unit: "g",
  },
  {
    time: new Date("2025-07-29T02:30:00"),
    value: 95,
    title: "Carbohydrates",
    type: "carbs",
    unit: "g",
  },
];

const HomePage: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#111" }}>
      <StatusBar style="light" translucent={false} />
      <ScrollView style={styles.container}>
        <View style={styles.kpisContainer}>
          <View style={styles.header}>
            <Text style={styles.currentReading}>178</Text>
            <View>
              <FontAwesome6
                name="arrow-right-long"
                style={styles.arrow}
                size={24}
                color="white"
              />
              <Text style={styles.unit}>mg/dL</Text>
            </View>
            <View style={{ flexDirection: "row", flex: 1 }} />
            <View style={styles.kpi}>
              <Text style={styles.title}>IOB</Text>
              <View style={styles.valueContainer}>
                <Text style={styles.value}>0.5</Text>
                <Text style={[styles.unit, { fontSize: 14 }]}>U</Text>
              </View>
            </View>
            <View style={styles.kpi}>
              <Text style={styles.title}>COB</Text>
              <View style={styles.valueContainer}>
                <Text style={styles.value}>10</Text>
                <Text style={[styles.unit, { fontSize: 14 }]}>g</Text>
              </View>
            </View>
          </View>
        </View>

        <BloodSugarGraph data={sampleData} height={300} />
        {/* Latest Records .. */}
        <View style={styles.latestRecords}>
          <Text style={styles.latestRecordsTitle}>Latest Records</Text>
          {latestRecords.map((record) => (
            <RecordPreview
              key={record.time.toISOString()}
              time={record.time.toLocaleTimeString()}
              value={record.value}
              unit={record.unit}
              type={record.type as "carbs" | "insulin"}
              title={record.title}
            />
          ))}
        </View>
        <View style={{ height: 200 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
  },
  kpisContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    marginBottom: 24,
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
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
  kpi: {
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
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  // Latest Records
  latestRecords: {
    marginTop: 30,
  },
  latestRecordsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
});
