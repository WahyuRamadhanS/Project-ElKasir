import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import api from "../utils/api";
import styles from "../assets/style";

export default function SignUp({ navigation }) {
  const [name, setName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSignUp = async () => {
    if (!name || !storeName || !phoneNumber || !email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      await api.post("/register", {
        NamaPengguna: email,
        KataSandi: password,
        Nama: name,
        NamaToko: storeName,
        NomorHP: phoneNumber,
        FotoProfil: profileImage, // Jika Anda mengirimkan file, perlu penanganan backend khusus
      });
      Alert.alert("Sign Up Success", "Account created successfully!");
      navigation.navigate("LogIn");
    } catch (error) {
      Alert.alert(
        "Sign Up Failed",
        error.response?.data?.message || "Error creating account."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      {/* Gambar Profil */}
      <TouchableOpacity style={styles.profileImageContainer} onPress={pickImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Icon name="user-circle" size={80} color="#7B66FF" />
        )}
      </TouchableOpacity>

      {/* Input untuk Nama, Nama Toko, Nomor HP, Email, dan Password */}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#000"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Store Name"
        placeholderTextColor="#000"
        value={storeName}
        onChangeText={setStoreName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#000"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
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
        <TouchableOpacity
          onPress={() => Alert.alert("Feature Unavailable", "Google Sign Up belum tersedia.")}
          style={styles.socialButton}
        >
          <Image source={require("../assets/Google.png")} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Alert.alert("Feature Unavailable", "Facebook Sign Up belum tersedia.")}
          style={styles.socialButton}
        >
          <Icon name="facebook-square" size={40} color="#1877F2" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Alert.alert("Feature Unavailable", "Apple Sign Up belum tersedia.")}
          style={styles.socialButton}
        >
          <Image source={require("../assets/apple.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Navigasi ke Login */}
      <Text style={styles.footerText}>
        Already have an account?{" "}
        <Text
          style={{ color: "#6B4EFF", fontWeight: "bold" }}
          onPress={() => navigation.navigate("LogIn")}
        >
          Log In
        </Text>
      </Text>
    </View>
  );
}