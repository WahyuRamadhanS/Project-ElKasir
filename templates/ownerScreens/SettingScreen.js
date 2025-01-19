import React, { useState } from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function SettingScreen({ navigation }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode((previousState) => !previousState);

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log Out",
          onPress: () => navigation.replace("LogIn"), // Navigasi ke layar login
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkMode]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={isDarkMode ? "#FFF" : "#000"} />
        </TouchableOpacity>
        <Text style={[styles.title, isDarkMode && styles.darkText]}>Setting</Text>
      </View>

      {/* Dark Mode Option */}
      <View style={styles.option}>
        <Text style={[styles.optionText, isDarkMode && styles.darkText]}>Dark mode</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleDarkMode}
          value={isDarkMode}
        />
      </View>

      {/* Language Option */}
      <TouchableOpacity style={styles.option} onPress={() => alert("Change language pressed!")}>
        <Text style={[styles.optionText, isDarkMode && styles.darkText]}>Language</Text>
        <Icon name="language" size={20} color={isDarkMode ? "#FFF" : "#000"} />
      </TouchableOpacity>

      {/* Log Out Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
        <Icon name="sign-out" size={20} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#C5FFF8",
    paddingTop: 45,
  },
  darkMode: {
    backgroundColor: "#333",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#000",
  },
  darkText: {
    color: "#FFF",
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
  },
  optionText: {
    fontSize: 16,
    color: "#000",
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF5B5B",
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  logoutText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
    marginRight: 10,
  },
});