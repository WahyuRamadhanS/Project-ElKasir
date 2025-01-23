import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import api from "../utils/api";
import styles from "../assets/style";

export default function SignUp({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      await api.post("/register", { NamaPengguna: email, KataSandi: password, NamaToko: name });
      Alert.alert("Sign Up Success", "Account created successfully!");
      navigation.navigate("LogIn");
    } catch (error) {
      Alert.alert("Sign Up Failed", error.response?.data?.message || "Error creating account.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Store Name"
        value={name}
        onChangeText={setName}
      />
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
      <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
        <Text style={styles.loginButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
