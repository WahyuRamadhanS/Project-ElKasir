import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import api from "../utils/api";

export default function AddCashierScreen({ navigation }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }

    try {
      const response = await api.post("/pegawai_kasir", {
        Nama: name.trim(),
        KataSandi: password.trim(),
      });

      if (response.status === 201) {
        Alert.alert("Success", "Cashier registered successfully!", [
          { text: "OK", onPress: () => navigation.navigate("RoleSelection") },
        ]);
      } else {
        Alert.alert("Error", "Failed to register cashier.");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        Alert.alert("Error", error.response.data.message);
      } else {
        Alert.alert("Error", "Something went wrong. Please try again.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.formCard}>
        <Text style={styles.title}>Register Cashier</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C5FFF8",
    alignItems: "center",
    padding: 16,
    paddingTop: 45,
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
  formCard: {
    backgroundColor: "#7B66FF",
    borderRadius: 20,
    width: "90%",
    padding: 20,
    alignItems: "center",
    marginTop: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFF",
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#FF5B5B",
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
