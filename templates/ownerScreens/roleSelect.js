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
    if (role === "Cashier") {
      navigation.navigate("AddCashier");
    } else if (role === "Inventory") {
      navigation.navigate("AddInventory");
    }
  };

  return (
    <View style={styles.container}>
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
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 10,
    elevation: 3,
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
