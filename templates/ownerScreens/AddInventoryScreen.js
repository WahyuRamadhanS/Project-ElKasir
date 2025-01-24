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
import Icon from "react-native-vector-icons/MaterialIcons";
import api from "../utils/api";

export default function AddInventoryScreen({ navigation }) {
  const [name, setName] = useState("");
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

  const handleRegister = async () => {
    if (!name || !password) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }

    try {
      await api.post("/pegawai_inventaris", {
        Nama: name,
        KataSandi: password,
        FotoProfil: profileImage, // Dikirimkan sebagai URI, backend perlu menangani
      });

      Alert.alert("Success", "Inventory registered successfully!", [
        { text: "OK", onPress: () => navigation.navigate("RoleSelection") },
      ]);
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Failed to register.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.formCard}>
        <Text style={styles.title}>Register Inventory</Text>
        <TouchableOpacity style={styles.profileImageContainer} onPress={pickImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Icon name="person" size={80} color="#7B66FF" />
          )}
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
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
  