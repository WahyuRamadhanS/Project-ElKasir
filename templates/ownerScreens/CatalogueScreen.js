import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useProducts } from "../../ProductContext";

const CatalogueScreen = ({ navigation }) => {
  const { products, setProducts } = useProducts();
  const [search, setSearch] = useState("");

  // Function to delete a product
  const handleDeleteProduct = (id) => {
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updatedProducts = products.filter((product) => product.id !== id);
            setProducts(updatedProducts);
          },
        },
      ]
    );
  };

  // Render a single catalog item
  const renderCatalogueItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {/* Product Image */}
      <Image
        source={{ uri: item.image || "https://via.placeholder.com/100" }}
        style={styles.itemImage}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>Rp. {item.price}</Text>
        <Text style={styles.itemStock}>Stock: {item.stock}</Text>
      </View>
      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("CatalogueEdit", { product: item })}
        >
          <Icon name="pencil" size={20} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteProduct(item.id)}
        >
          <Icon name="trash" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#FFF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by product name"
          placeholderTextColor="#FFF"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Catalogue List */}
      <FlatList
        data={products.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )}
        keyExtractor={(item) => item.id}
        renderItem={renderCatalogueItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      {/* Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("CatalogueAdd")}
      >
        <Icon name="plus" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C5FFF8",
    padding: 16,
    paddingTop: 45,
  },
  header: {
    marginBottom: 10,
  },
  backButton: {
    padding: 8,
    backgroundColor: "#FFF",
    borderRadius: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7B66FF",
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    color: "#FFF",
  },
  listContainer: {
    paddingVertical: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#A29CF4",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  itemPrice: {
    fontSize: 14,
    color: "#FFF",
  },
  itemStock: {
    fontSize: 12,
    color: "#FFF",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#FFB700",
    padding: 8,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: "#FF5B5B",
    padding: 8,
    borderRadius: 5,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#FF5B5B",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CatalogueScreen;
