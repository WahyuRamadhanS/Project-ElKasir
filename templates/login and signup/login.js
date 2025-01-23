import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import api from "../utils/api";
import styles from "../assets/style";

export default function LogIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", { NamaPengguna: email, KataSandi: password });
      Alert.alert("Login Success", "You are logged in!");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Login Failed", error.response?.data?.message || "Invalid credentials.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
}
