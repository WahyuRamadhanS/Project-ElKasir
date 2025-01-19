import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../assets/style"; // Ensure this style file exists

// Login Component
export default function LogIn({ navigation }) {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState({ email: "", password: "" }); // Error state for form validation

  // Predefined accounts (mock data for testing)
  const predefinedAccounts = [
    { email: "cashier@example.com", password: "123456", role: "cashier" }, // Cashier role
    { email: "admin@example.com", password: "admin123", role: "admin" }, // Admin role
    { email: "inventory@example.com", password: "inventory123", role: "inventaris" }, // Inventory role
  ];

  /**
   * Validate form inputs
   * @returns {boolean} - Returns true if inputs are valid, else false
   */
  const validateForm = () => {
    let isValid = true;
    let newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email diperlukan"; // Email is required
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Masukkan email yang valid"; // Invalid email format
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password diperlukan"; // Password is required
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password minimal 6 karakter"; // Password must be at least 6 characters
      isValid = false;
    }

    setError(newErrors);
    return isValid;
  };

  /**
   * Handle user login
   */
  const handleLogin = () => {
    if (validateForm()) {
      // Check if the entered credentials match predefined accounts
      const user = predefinedAccounts.find(
        (account) => account.email === email && account.password === password
      );

      if (user) {
        Alert.alert("Login Success", `Welcome, ${user.email}!`);

        // Navigate to the appropriate screen based on the user's role
        if (user.role === "cashier") {
          navigation.navigate("Kasir"); // Navigate to Cashier Drawer
        } else if (user.role === "inventaris") {
          navigation.navigate("Inventory"); // Navigate to Inventory Drawer
        } else {
          navigation.navigate("Home"); // Navigate to Admin Home
        }
      } else {
        Alert.alert("Login Failed", "Email atau password salah."); // Invalid credentials
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Log in</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        placeholderTextColor="#000"
        value={email}
        onChangeText={setEmail}
      />
      {error.email ? <Text style={styles.errorText}>{error.email}</Text> : null}

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#000"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error.password ? (
        <Text style={styles.errorText}>{error.password}</Text>
      ) : null}

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>

      {/* Social Login Section */}
      <Text style={styles.orText}>or log in with</Text>
      <View style={styles.socialContainer}>
        {/* Google Login */}
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() =>
            Alert.alert("Feature Unavailable", "Google Login belum tersedia.")
          }
        >
          <Image
            source={require("../assets/Google.png")} // Ensure this image exists in the assets folder
            style={styles.icon}
          />
        </TouchableOpacity>

        {/* Facebook Login */}
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() =>
            Alert.alert("Feature Unavailable", "Facebook Login belum tersedia.")
          }
        >
          <Icon name="facebook-square" size={40} color="#1877F2" />
        </TouchableOpacity>

        {/* Apple Login */}
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() =>
            Alert.alert("Feature Unavailable", "Apple Login belum tersedia.")
          }
        >
          <Image
            source={require("../assets/apple.png")} // Ensure this image exists in the assets folder
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Sign Up Link */}
      <Text style={styles.footerText}>
        Don't have an account?{" "}
        <Text
          style={{ color: "#6B4EFF", fontWeight: "bold" }}
          onPress={() => navigation.navigate("SignUp")}
        >
          Sign Up
        </Text>
      </Text>

      {/* Background Ellipse */}
      <View style={styles.ellipsetop} />
      <Image
        source={require("../assets/Ellipse 3.png")} // Ensure this image exists in the assets folder
        style={styles.Ellipseimg}
      />
    </View>
  );
}
