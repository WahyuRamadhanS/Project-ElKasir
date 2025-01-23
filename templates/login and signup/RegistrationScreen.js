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
import styles from "../assets/style";
import api from "../utils/api";

export default function RegistrationScreen({ navigation, route }) {
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const { userId } = route.params;

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

  const handleNext = async () => {
    if (!storeName || !address) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      await api.post("/register_store", {
        userId,
        NamaToko: storeName,
        Alamat: address,
        FotoProfil: profileImage, // Handle this appropriately in the backend
      });
      Alert.alert("Success", "Store registered successfully!");
      navigation.navigate("Home"); // Redirect to the home screen
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to register store."
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ position: "absolute", top: 40, left: 20 }}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileImageContainer} onPress={pickImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Icon name="user-circle" size={80} color="#7B66FF" />
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Store Name"
        placeholderTextColor="#000"
        value={storeName}
        onChangeText={setStoreName}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor="#000"
        value={address}
        onChangeText={setAddress}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleNext}>
        <Text style={styles.loginButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}
