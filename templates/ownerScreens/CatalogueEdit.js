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

const CatalogueEdit = ({ navigation, route }) => {
  const { products, setProducts } = useProducts();
  const { product } = route.params || { product: {} };

  const [productName, setProductName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price ? String(product.price) : "");
  const [stock, setStock] = useState(product?.stock ? String(product.stock) : "");
  const [code, setCode] = useState(product?.code || "");
  const [purchase, setPurchase] = useState(product?.purchase ? String(product.purchase) : "");
  const [image, setImage] = useState(product?.image || null);

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

  const handleEditProduct = () => {
    if (!productName || !price || !stock || !code || !purchase) {
      Alert.alert("Error", "All fields except image are required.");
      return;
    }

    if (isNaN(price) || isNaN(stock) || isNaN(purchase)) {
      Alert.alert("Error", "Price, Stock, and Purchase must be numeric values.");
      return;
    }

    const updatedProducts = products.map((item) =>
      item.id === product.id
        ? {
            ...item,
            name: productName,
            price: parseInt(price, 10),
            stock: parseInt(stock, 10),
            code,
            purchase: parseInt(purchase, 10),
            image: image || item.image, // Keep existing image if not changed
          }
        : item
    );

    setProducts(updatedProducts);
    Alert.alert("Success", "Product updated successfully!");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>Select Image (Optional)</Text>
        )}
      </TouchableOpacity>
      <TextInput style={styles.input} placeholder="Product Name" value={productName} onChangeText={setProductName} />
      <TextInput style={styles.input} placeholder="Price" value={price} keyboardType="numeric" onChangeText={setPrice} />
      <TextInput style={styles.input} placeholder="Stock" value={stock} keyboardType="numeric" onChangeText={setStock} />
      <TextInput style={styles.input} placeholder="Code" value={code} onChangeText={setCode} />
      <TextInput
        style={styles.input}
        placeholder="Purchase Price"
        value={purchase}
        keyboardType="numeric"
        onChangeText={setPurchase}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleEditProduct}>
        <Text style={styles.addButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#C5FFF8", paddingTop: 45, },
  backButton: { marginBottom: 20 },
  backText: { fontSize: 18, color: "#4B0082" },
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
  image: { width: "100%", height: "100%", borderRadius: 10 },
  imagePlaceholder: { color: "#7B7B7B" },
  input: { backgroundColor: "#FFF", borderRadius: 10, padding: 10, fontSize: 16, marginBottom: 15 },
  addButton: { backgroundColor: "#4B0082", padding: 15, borderRadius: 10, alignItems: "center" },
  addButtonText: { color: "#FFF", fontWeight: "bold" },
});

export default CatalogueEdit;
