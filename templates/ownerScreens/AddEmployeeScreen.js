import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import api from "../utils/api";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function RegisterEmployeeScreen({ route, navigation }) {
  const { role } = route.params; // Role diterima dari navigasi
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
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

  const handleRegisterEmployee = async () => {
    if (!name || !phone || !email || !password) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }

    try {
      const endpoint =
        role === "Cashier"
          ? "/pegawai_kasir"
          : role === "Inventory"
          ? "/pegawai_inventaris"
          : null;

      if (!endpoint) {
        Alert.alert("Error", "Invalid role selected.");
        return;
      }

      await api.post(endpoint, {
        Nama: name,
        KataSandi: password,
        FotoProfil: profileImage, // Foto profil dikirimkan sebagai URI, backend harus menangani upload
      });

      Alert.alert("Success", `${name} registered as ${role} successfully!`, [
        { text: "OK", onPress: () => navigation.navigate("Home") },
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
      {/* Tombol Kembali */}
      <TouchableOpacity
        onPress={() => navigation.navigate("RoleSelection")}
        style={styles.backButton}
      >
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <View style={styles.formCard}>
        <Text style={styles.title}>Register {role}</Text>

        {/* Foto Profil */}
        <TouchableOpacity style={styles.profileImageContainer} onPress={pickImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Icon name="person" size={80} color="#7B66FF" />
          )}
        </TouchableOpacity>

        {/* Input Nama */}
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        {/* Input Password */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        {/* Tombol Daftar */}
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
  profileImageContainer: {
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
  input: {
    backgroundColor: "#FFF",
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
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
