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

const CatalogueEdit = ({ navigation, route }) => {
  const { product } = route.params;
  const [productName, setProductName] = useState(product?.NamaProduk || "");
  const [price, setPrice] = useState(product?.Harga?.toString() || "");
  const [stock, setStock] = useState(product?.Stok?.toString() || "");
  const [code, setCode] = useState(product?.Kode || "");
  const [purchasePrice, setPurchasePrice] = useState(product?.HargaBeli?.toString() || "");
  const [image, setImage] = useState(product?.Gambar || null);

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

  const handleEditProduct = async () => {
    if (!productName || !price || !stock || !code || !purchasePrice) {
      Alert.alert("Error", "All fields except image are required.");
      return;
    }

    try {
      const response = await api.put(`/produk/${product.IDProduk}`, {
        NamaProduk: productName,
        Harga: parseFloat(price),
        Stok: parseInt(stock, 10),
        Kode: code,
        HargaBeli: parseFloat(purchasePrice),
        Gambar: image,
      });

      if (response.status === 200) {
        Alert.alert("Success", "Product updated successfully!");
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Failed to update product.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Product</Text>
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
      <TouchableOpacity style={styles.editButton} onPress={handleEditProduct}>
        <Text style={styles.editButtonText}>Save Changes</Text>
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
  editButton: {
    backgroundColor: "#4B0082",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  editButtonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});

export default CatalogueEdit;
