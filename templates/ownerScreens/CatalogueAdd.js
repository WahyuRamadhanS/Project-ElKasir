import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import api from "../utils/api";

const CatalogueAdd = ({ navigation }) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [code, setCode] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddProduct = async () => {
    if (!productName || !price || !stock || !code || !purchasePrice) {
      Alert.alert("Error", "All fields except image are required.");
      return;
    }

    try {
      const response = await api.post("/produk", {
        NamaProduk: productName,
        Harga: parseFloat(price),
        Stok: parseInt(stock, 10),
        Kode: code,
        HargaBeli: parseFloat(purchasePrice),
        Gambar: image || "https://via.placeholder.com/150",
      });

      if (response.status === 201) {
        Alert.alert("Success", "Product added successfully!");
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Failed to add product.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Product</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>Select Image</Text>
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Stock"
        value={stock}
        onChangeText={setStock}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Code"
        value={code}
        onChangeText={setCode}
      />
      <TextInput
        style={styles.input}
        placeholder="Purchase Price"
        value={purchasePrice}
        onChangeText={setPurchasePrice}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
        <Text style={styles.addButtonText}>Add Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#C5FFF8" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20, color: "#4B0082" },
  imagePicker: {
    width: 150,
    height: 150,
    backgroundColor: "#EAEAEA",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  image: { width: "100%", height: "100%", borderRadius: 10 },
  imagePlaceholder: { color: "#7B7B7B" },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: "#4B0082",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  addButtonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});

export default CatalogueAdd;
