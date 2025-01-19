import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useProducts } from "../../ProductContext";

const CatalogueAdd = ({ navigation }) => {
  const { products, setProducts } = useProducts();
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [code, setCode] = useState("");
  const [purchase, setPurchase] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const handleAddProduct = () => {
    if (!productName || !price || !stock || !code || !purchase) {
      Alert.alert("Error", "All fields except image are required.");
      return;
    }

    if (isNaN(price) || isNaN(stock) || isNaN(purchase)) {
      Alert.alert("Error", "Price, Stock, and Purchase must be numeric values.");
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      name: productName,
      price: parseInt(price, 10),
      stock: parseInt(stock, 10),
      code,
      purchase: parseInt(purchase, 10),
      image: image || "https://via.placeholder.com/150", // Gunakan gambar placeholder jika tidak ada gambar
    };

    setProducts([...products, newProduct]);

    Alert.alert("Success", "Product added successfully!");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      {/* Image Picker */}
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>Select Image (Optional)</Text>
        )}
      </TouchableOpacity>

      {/* Input Fields */}
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
        value={purchase}
        onChangeText={setPurchase}
        keyboardType="numeric"
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
        <Text style={styles.addButtonText}>Add</Text>
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
  backButton: {
    marginBottom: 20,
  },
  backText: {
    fontSize: 18,
    color: "#4B0082",
  },
  imagePicker: {
    backgroundColor: "#EAEAEA",
    height: 150,
    width: 150,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  imagePlaceholder: {
    color: "#7B7B7B",
  },
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
    marginTop: 10,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CatalogueAdd;
