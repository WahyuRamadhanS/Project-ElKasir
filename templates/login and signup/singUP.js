import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../assets/style"; // Import your styles

export default function SignUp({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const validateForm = () => {
    let valid = true;
    let newErrors = { name: "", email: "", password: "", confirmPassword: "" };

    if (!name) {
      newErrors.name = "Nama diperlukan";
      valid = false;
    }

    if (!email) {
      newErrors.email = "Email diperlukan";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Masukkan email yang valid";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password diperlukan";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
      valid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password tidak cocok";
      valid = false;
    }

    setError(newErrors);
    return valid;
  };

  const handleSignUp = () => {
    if (validateForm()) {
      // After successful sign-up, navigate to RegistrationScreen
      Alert.alert("Sign Up Success", `Welcome, ${name}!`);
      navigation.navigate("Registration"); // Navigate to the RegistrationScreen
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#000"
        value={name}
        onChangeText={setName}
      />
      {error.name ? <Text style={styles.errorText}>{error.name}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email/Phone Number"
        keyboardType="email-address"
        placeholderTextColor="#000"
        value={email}
        onChangeText={setEmail}
      />
      {error.email ? <Text style={styles.errorText}>{error.email}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#000"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error.password ? <Text style={styles.errorText}>{error.password}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#000"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {error.confirmPassword ? <Text style={styles.errorText}>{error.confirmPassword}</Text> : null}

      <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
        <Text style={styles.loginButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or sign up with</Text>

      <View style={styles.socialContainer}>
        {/* Google Button */}
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => navigation.navigate("Home")} // Navigasi ke HomeScreens
        >
          <Image
            source={require("../assets/Google.png")}
            style={styles.icon}
          />
        </TouchableOpacity>

        {/* Facebook Button */}
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => navigation.navigate("Home")} // Navigasi ke HomeScreens
        >
          <Icon name="facebook-square" size={40} color="#1877F2" />
        </TouchableOpacity>

        {/* Apple Button */}
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => navigation.navigate("Home")} // Navigasi ke HomeScreens
        >
          <Image
            source={require("../assets/apple.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>
        Don't have an account?{" "}
        <Text style={{ color: "#6B4EFF", fontWeight: "bold" }} onPress={() => navigation.navigate("LogIn")}>
          Log in
        </Text>
      </Text>
    </View>
  );
}
