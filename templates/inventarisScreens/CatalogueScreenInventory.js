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
import api from "../utils/api";

const CatalogueScreenInventory = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isGridView, setIsGridView] = useState(false);

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
    Alert.alert("Delete Product", "Are you sure you want to delete this product?", [
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
    <View style={[styles.itemContainer, isGridView && styles.gridItemContainer]}>
      <Image source={{ uri: item.Gambar || "https://via.placeholder.com/100" }} style={isGridView ? styles.gridItemImage : styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.NamaProduk}</Text>
        {!isGridView && <Text style={styles.itemPrice}>Rp. {item.Harga}</Text>}
        <Text style={styles.itemStock}>Stock: {item.Stok}</Text>
      </View>
      {!isGridView && (
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
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.drawerToggleButton}
          onPress={() => navigation.openDrawer()}
        >
          <Icon name="bars" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toggleViewButton}
          onPress={() => setIsGridView((prev) => !prev)}
        >
          <Icon
            name={isGridView ? "list" : "th-large"}
            size={24}
            color="#FFF"
          />
        </TouchableOpacity>
      </View>

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

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.IDProduk.toString()}
        renderItem={renderProductItem}
        numColumns={isGridView ? 2 : 1}
        contentContainerStyle={styles.listContainer}
      />

      {/* Add Button for Inventory Screen */}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  drawerToggleButton: {
    padding: 8,
    backgroundColor: "#7B66FF",
    borderRadius: 5,
  },
  toggleViewButton: {
    padding: 8,
    backgroundColor: "#7B66FF",
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
    flex: 1,
  },
  gridItemContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  gridItemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 8,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
  itemPrice: {
    fontSize: 14,
    color: "#FFF",
    textAlign: "center",
  },
  itemStock: {
    fontSize: 12,
    color: "#FFF",
    textAlign: "center",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
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

export default CatalogueScreenInventory;
