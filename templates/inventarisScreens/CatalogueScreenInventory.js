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

const CatalogueScreenInventory = ({ navigation }) => {
  const { products, setProducts } = useProducts();
  const [search, setSearch] = useState("");
  const [isGridView, setIsGridView] = useState(false); // State to toggle Grid/List view

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
    <View
      style={[
        styles.itemContainer,
        isGridView && styles.gridItemContainer, // Apply grid styling if in grid view
      ]}
    >
      {/* Product Image */}
      <Image
        source={{ uri: item.image || "https://via.placeholder.com/100" }}
        style={isGridView ? styles.gridItemImage : styles.itemImage} // Adjust image style for grid/list
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        {!isGridView && <Text style={styles.itemPrice}>Rp. {item.price}</Text>} {/* Show price only in list */}
        <Text style={styles.itemStock}>Stock: {item.stock}</Text>
      </View>
      {!isGridView && ( // Show action buttons only in list view
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
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Drawer Toggle Button */}
        <TouchableOpacity
          style={styles.drawerToggleButton}
          onPress={() => navigation.openDrawer()}
        >
          <Icon name="bars" size={24} color="#FFF" />
        </TouchableOpacity>

        {/* Toggle Grid/List View Button */}
        <TouchableOpacity
          style={styles.toggleViewButton}
          onPress={() => setIsGridView((prev) => !prev)}
        >
          <Icon
            name={isGridView ? "list" : "th-large"} // Change icon based on the current view mode
            size={24}
            color="#FFF"
          />
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
        key={isGridView ? "grid" : "list"} // Force FlatList to re-render on mode change
        renderItem={renderCatalogueItem}
        showsVerticalScrollIndicator={false}
        numColumns={isGridView ? 2 : 1} // Use 2 columns for grid, 1 column for list
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
