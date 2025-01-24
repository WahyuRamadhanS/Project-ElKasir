import React, { useEffect, useState } from "react";
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
import api from "../../utils/api";

const CatalogueScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/produk");
        setProducts(response.data);
      } catch (error) {
        Alert.alert("Error", error.response?.data?.message || "Failed to fetch products.");
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    Alert.alert("Delete Product", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/produk/${id}`);
            setProducts((prevProducts) => prevProducts.filter((product) => product.IDProduk !== id));
            Alert.alert("Success", "Product deleted successfully!");
          } catch (error) {
            Alert.alert("Error", error.response?.data?.message || "Failed to delete product.");
          }
        },
      },
    ]);
  };

  const filteredProducts = products.filter((product) =>
    product.NamaProduk.toLowerCase().includes(search.toLowerCase())
  );

  const renderProductItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.Gambar || "https://via.placeholder.com/100" }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.NamaProduk}</Text>
        <Text style={styles.itemPrice}>Rp. {item.Harga}</Text>
        <Text style={styles.itemStock}>Stock: {item.Stok}</Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("CatalogueEdit", { product: item })}
        >
          <Icon name="pencil" size={20} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteProduct(item.IDProduk)}
        >
          <Icon name="trash" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#FFF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#FFF"
        />
      </View>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.IDProduk.toString()}
        renderItem={renderProductItem}
        contentContainerStyle={styles.listContainer}
      />
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
  container: { flex: 1, backgroundColor: "#C5FFF8", padding: 16 },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#7B66FF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  searchInput: { flex: 1, color: "#FFF" },
  searchIcon: { marginRight: 10 },
  listContainer: { paddingVertical: 10 },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#A29CF4",
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    padding: 10,
  },
  itemImage: { width: 60, height: 60, borderRadius: 10, marginRight: 10 },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: "bold", color: "#FFF" },
  itemPrice: { fontSize: 14, color: "#FFF" },
  itemStock: { fontSize: 12, color: "#FFF" },
  actionButtons: { flexDirection: "row" },
  editButton: {
    backgroundColor: "#FFB700",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: { backgroundColor: "#FF5B5B", padding: 10, borderRadius: 5 },
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
