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
import styles from "../assets/style"; // Import your styles

export default function RegistrationScreen({ navigation }) {
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [emailPhone, setEmailPhone] = useState("");
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

  const handleNext = () => {
    if (storeName && address && emailPhone) {
      Alert.alert("Success", "Proceeding to verification!");
      navigation.navigate("Home", { contact: emailPhone });
    } else {
      Alert.alert("Error", "Please fill in all fields.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Tombol panah kembali */}
      <TouchableOpacity
        style={{ position: "absolute", top: 40, left: 20 }}
        onPress={() => navigation.goBack()} // Kembali ke halaman sebelumnya
      >
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>

      {/* Gambar Profil */}
      <TouchableOpacity style={styles.profileImageContainer} onPress={pickImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Icon name="user-circle" size={80} color="#7B66FF" />
        )}
      </TouchableOpacity>

      {/* Input untuk Nama, Alamat, dan Email */}
      <TextInput
        style={styles.input}
        placeholder="Nama"
        placeholderTextColor="#000"
        value={storeName}
        onChangeText={setStoreName}
      />
      <TextInput
        style={styles.input}
        placeholder="Alamat"
        placeholderTextColor="#000"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Email-phone"
        placeholderTextColor="#000"
        value={emailPhone}
        onChangeText={setEmailPhone}
      />

      {/* Tombol Next */}
      <TouchableOpacity style={styles.loginButton} onPress={handleNext}>
        <Text style={styles.loginButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}
