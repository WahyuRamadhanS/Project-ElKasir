import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "react-native-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";

const EditProfileScreen = ({ navigation, route }) => {
  // Mendapatkan data awal dari `HomeScreen`
  const [storeName, setStoreName] = useState(route.params?.currentStoreName || "");
  const [profileImage, setProfileImage] = useState(route.params?.currentProfileImage || null);

  // Fungsi untuk memilih gambar menggunakan ImagePicker
  const handlePickImage = () => {
    ImagePicker.launchImageLibrary(
      { mediaType: "photo", includeBase64: false },
      (response) => {
        if (!response.didCancel && !response.errorCode && response.assets?.length > 0) {
          setProfileImage(response.assets[0].uri); // Simpan URI gambar yang dipilih
        }
      }
    );
  };

  // Fungsi untuk menyimpan perubahan
  const handleSaveChanges = () => {
    if (!storeName) {
      Alert.alert("Error", "Store Name cannot be empty!");
      return;
    }

    // Kirimkan data perubahan ke `HomeScreen`
    navigation.navigate("Home", {
      updatedStoreName: storeName,
      updatedProfileImage: profileImage,
    });
  };

  return (
    <View style={styles.container}>
      {/* Tombol Kembali */}
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.iconContainer}
    >
      <Icon name="arrow-left" size={24} color="#000" />
    </TouchableOpacity>

      {/* Foto Profil */}
      <View style={styles.profileImageContainer}>
        <TouchableOpacity onPress={handlePickImage}>
          <Image
            source={profileImage ? { uri: profileImage } : require("../assets/profile.png")}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.editProfileText}>edit profile</Text>
      </View>

      {/* Form Input */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#FFFFFF"
        editable={false} // Tidak diubah (hanya untuk nama pengguna, bukan nama toko)
      />
      <TextInput
        style={styles.input}
        placeholder="Store Name"
        placeholderTextColor="#FFFFFF"
        value={storeName}
        onChangeText={setStoreName}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor="#FFFFFF"
        editable={false} // Tidak diubah
      />
      <TextInput
        style={styles.input}
        placeholder="No.Hp/Email"
        placeholderTextColor="#FFFFFF"
        editable={false} // Tidak diubah
      />

      {/* Tombol Simpan */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>save change</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C5FFF8",
    padding: 20,
    paddingTop: 45,
  },

  iconContainer: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#FFF",
  },
  backIcon: {
    fontSize: 24,
    color: "#4B0082",
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
  },
  editProfileText: {
    fontSize: 14,
    color: "#4B0082",
    marginTop: 10,
  },
  input: {
    backgroundColor: "#9370DB",
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: "#9370DB",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    marginTop: 20,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EditProfileScreen;
