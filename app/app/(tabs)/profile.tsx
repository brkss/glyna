import { SettingItem } from "@/component";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import { useRouter } from "expo-router";

import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const _tmp = [
  {
    title: "General",
    items: [
      {
        title: "Data Source",
        link: "/settings/DataSource",
        Icon: FontAwesome,
        iconName: "chain",
      },
      {
        title: "Alerts",
        link: "",
        Icon: Feather,
        iconName: "alert-triangle",
      },
      {
        title: "Units",
        link: "",
        Icon: FontAwesome5,
        iconName: "ruler",
      },
      {
        title: "Notification",
        link: "",
        Icon: Feather,
        iconName: "bell",
      },
      {
        title: "Live Activity",
        link: "",
        Icon: Feather,
        iconName: "eye",
      },
    ],
  },
  {
    title: "Account & Security",
    items: [
      {
        title: "Account Information",
        link: "",
        Icon: Feather,
        iconName: "user",
      },
      {
        title: "Password",
        link: "",
        Icon: Feather,
        iconName: "lock",
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        title: "Contact Us",
        link: "",
        Icon: FontAwesome,
        iconName: "support",
      },
      {
        title: "Donate",
        link: "",
        Icon: FontAwesome6,
        iconName: "money-bill-1",
      },
    ],
  },
];

const ProfilePage: React.FC = () => {
  const router = useRouter();

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Settings</Text>
        <View style={{ marginTop: 27 }}>
          {_tmp.map((cat, key) => (
            <View style={{ marginBottom: 20 }} key={key}>
              <Text style={styles.categoryTitle}>{cat.title}</Text>
              {cat.items.map((item, key) => (
                <SettingItem
                  title={item.title}
                  onClick={() => {
                    if (item.link) {
                      router.push(item.link as any);
                    } else {
                      console.log(`Clicked on ${item.title}`);
                    }
                  }}
                  key={key}
                  Icon={item.Icon}
                  iconName={item.iconName}
                />
              ))}
            </View>
          ))}
        </View>
        <Text style={{ padding: 7, opacity: 0.7 }}>Glyna v1.0.0 2025</Text>
        <View style={{ height: 200 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 11,
    opacity: 0.8,
  },
});
