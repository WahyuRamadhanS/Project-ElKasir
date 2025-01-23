import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import api from "../utils/api";
import styles from "../assets/style";

export default function LogIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", { NamaPengguna: email, KataSandi: password });
      const { role } = response.data;
  
      Alert.alert("Login Success", "You are logged in!");
  
      // Navigasi berdasarkan role
      if (role === "Cashier") {
        navigation.navigate("KasirOrders");
      } else if (role === "Inventory") {
        navigation.navigate("InventoryCatalogue");
      } else if (role === "Owner") {
        navigation.navigate("Home");
      }
    } catch (error) {
      Alert.alert("Login Failed", error.response?.data?.message || "Invalid credentials.");
    }
  };
  

  const handleGoogleSignIn = async () => {
    Alert.alert("Feature Unavailable", "Google Login belum tersedia.");
  };

  const handleFacebookSignIn = async () => {
    Alert.alert("Feature Unavailable", "Facebook Login belum tersedia.");
  };

  const handleAppleSignIn = async () => {
    Alert.alert("Feature Unavailable", "Apple Login belum tersedia.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>

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

      <Text style={styles.orText}>or log in with</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity onPress={handleGoogleSignIn} style={styles.socialButton}>
          <Image source={require("../assets/Google.png")} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFacebookSignIn} style={styles.socialButton}>
          <Icon name="facebook-square" size={40} color="#1877F2" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAppleSignIn} style={styles.socialButton}>
          <Image source={require("../assets/apple.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.footerText}>
          Don't have an account?{" "}
          <Text style={{ color: "#6B4EFF", fontWeight: "bold" }}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
