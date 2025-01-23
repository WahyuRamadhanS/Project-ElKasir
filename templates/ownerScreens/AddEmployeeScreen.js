import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import api from "../utils/api"; // Import API util
import Icon from "react-native-vector-icons/MaterialIcons";

export default function RegisterEmployeeScreen({ navigation }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterEmployee = async () => {
    if (!name || !address || !position || !phone || !email || !password) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }

    try {
      const endpoint =
        position === "Cashier"
          ? "/pegawai_kasir"
          : position === "Inventory"
          ? "/pegawai_inventaris"
          : null;

      if (!endpoint) {
        Alert.alert("Error", "Invalid position selected.");
        return;
      }

      await api.post(endpoint, {
        Nama: name,
        KataSandi: password,
        NomorHP: phone,
        Email: email,
      });

      Alert.alert("Success", `${name} registered as ${position} successfully!`, [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to register employee."
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <View style={styles.formCard}>
        <Text style={styles.title}>Add Employee</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <View style={styles.dropdown}>
          <Picker
            selectedValue={position}
            onValueChange={(itemValue) => setPosition(itemValue)}
          >
            <Picker.Item label="Select Position" value="" />
            <Picker.Item label="Cashier" value="Cashier" />
            <Picker.Item label="Inventory" value="Inventory" />
          </Picker>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleRegisterEmployee}>
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
  dropdown: {
    backgroundColor: "#FFF",
    width: "100%",
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
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

