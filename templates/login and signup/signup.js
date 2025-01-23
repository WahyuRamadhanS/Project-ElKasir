import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
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

  const handleGoogleSignUp = async () => {
    Alert.alert("Feature Unavailable", "Google Sign Up belum tersedia.");
  };

  const handleFacebookSignUp = async () => {
    Alert.alert("Feature Unavailable", "Facebook Sign Up belum tersedia.");
  };

  const handleAppleSignUp = async () => {
    Alert.alert("Feature Unavailable", "Apple Sign Up belum tersedia.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Store Name"
        placeholderTextColor="#000"
        value={name}
        onChangeText={setName}
      />
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
      
      {/* Tombol Sign Up */}
      <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
        <Text style={styles.loginButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Opsi Sign Up dengan Pihak Ketiga */}
      <Text style={styles.orText}>or sign up with</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity onPress={handleGoogleSignUp} style={styles.socialButton}>
          <Image source={require("../assets/Google.png")} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFacebookSignUp} style={styles.socialButton}>
          <Icon name="facebook-square" size={40} color="#1877F2" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAppleSignUp} style={styles.socialButton}>
          <Image source={require("../assets/apple.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Navigasi ke Login */}
      <Text style={styles.footerText}>
        Already have an account?{" "}
        <Text style={{ color: "#6B4EFF", fontWeight: "bold" }} onPress={() => navigation.navigate("LogIn")}>
          Log In
        </Text>
      </Text>
    </View>
  );
}
