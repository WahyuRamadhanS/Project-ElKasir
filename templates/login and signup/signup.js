import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import styles from "../assets/style";
import api from "../utils/api";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      const response = await api.post("/register", {
        NamaPengguna: email,
        KataSandi: password,
      });
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("Registration", { userId: response.data.userId }); // Navigate to the next screen
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to create account."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#000"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#000"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
        <Text style={styles.loginButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
