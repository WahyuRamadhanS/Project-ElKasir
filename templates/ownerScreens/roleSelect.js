import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function RoleSelectionScreen({ navigation }) {
  const handleRoleSelect = (role) => {
    navigation.navigate("AddEmployee", { role });
  };

  return (
    <View style={styles.container}>
      {/* Tombol Kembali */}
      <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Select Role</Text>
      <TouchableOpacity
        style={styles.roleButton}
        onPress={() => handleRoleSelect("Cashier")}
      >
        <Text style={styles.roleText}>Cashier</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.roleButton}
        onPress={() => handleRoleSelect("Inventory")}
      >
        <Text style={styles.roleText}>Inventory</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C5FFF8",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#7B66FF",
  },
  roleButton: {
    width: "80%",
    padding: 15,
    backgroundColor: "#7B66FF",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  roleText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
});
