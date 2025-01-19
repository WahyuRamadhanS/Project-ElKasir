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
import Icon from "react-native-vector-icons/MaterialIcons"; // Pastikan pustaka ini diinstal

const RegisterEmployeeScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterEmployee = () => {
    if (!name || !address || !position || !phone || !email || !password) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }

    // Simulasi penyimpanan data karyawan
    const employeeData = {
      name,
      address,
      position,
      phone,
      email,
    };

    console.log("Employee Registered:", employeeData);

    Alert.alert(
      "Success",
      `Employee ${name} added as ${position} successfully!`,
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Form Card */}
      <View style={styles.formCard}>
        {/* Profile Image Placeholder */}
        <View style={styles.profileContainer}>
          <View style={styles.profileImage}>
            <Text style={styles.profileText}>Photo</Text>
          </View>
          <TouchableOpacity style={styles.editIcon}>
            <Text style={styles.editText}>✎</Text>
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        {/* Dropdown Position */}
        <View style={styles.dropdown}>
          <Picker
            selectedValue={position}
            onValueChange={(itemValue) => setPosition(itemValue)}
          >
            <Picker.Item label="Select Position" value="" />
            <Picker.Item label="Cashier" value="Cashier" />
            <Picker.Item label="Inventory" value="Inventory" />
            <Picker.Item label="Manager" value="Manager" />
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

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleRegisterEmployee}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    fontSize: 14,
    color: "#7B66FF",
  },
  editIcon: {
    position: "absolute",
    bottom: -5,
    right: -5,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 4,
  },
  editText: {
    fontSize: 12,
    color: "#000",
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

export default RegisterEmployeeScreen;
