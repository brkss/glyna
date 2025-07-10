import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.currentReadingContainer}>
          <Text style={styles.currentReadingValue}>155</Text>
          <Text style={styles.currentReadingUnit}>mg/dL</Text>
        </View>
        <Text style={styles.readingTime}>last read 18:05</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 30,
    color : 'white'
  },
  currentReadingContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "flex-start",
  },
  currentReadingValue: {
    fontSize: 70,
    fontWeight: 500,
    color: "white",
  },
  currentReadingUnit: {
    fontSize: 25,
    marginLeft: 4,
    color: "white",
  },
  readingTime: {
    textAlign: "left",
    opacity: 0.8,
    color: "white",
  },
});
