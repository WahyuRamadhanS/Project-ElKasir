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

const OrderScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [search, setSearch] = useState("");
  const [isGridView, setIsGridView] = useState(true);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/produk"); // Endpoint untuk mendapatkan produk
        setProducts(response.data);
      } catch (error) {
        Alert.alert(
          "Error",
          error.response?.data?.message || "Failed to fetch products."
        );
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (id) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: (prevCart[id] || 0) + 1,
    }));
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[id] > 0) {
        updatedCart[id] -= 1;
        if (updatedCart[id] === 0) {
          delete updatedCart[id];
        }
      }
      return updatedCart;
    });
  };

  const renderProduct = ({ item }) => {
    const quantity = cart[item.IDProduk] || 0;

    return (
      <View style={isGridView ? styles.gridItem : styles.listItem}>
        <Image
          source={{ uri: item.Gambar || "https://via.placeholder.com/100" }}
          style={isGridView ? styles.gridImage : styles.listImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.productName}>{item.NamaProduk}</Text>
          <Text style={styles.productPrice}>Rp. {item.Harga}</Text>
        </View>
        <View style={styles.cartControls}>
          <TouchableOpacity onPress={() => removeFromCart(item.IDProduk)}>
            <Text style={styles.cartControlText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.cartQuantity}>{quantity}</Text>
          <TouchableOpacity onPress={() => addToCart(item.IDProduk)}>
            <Text style={styles.cartControlText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      const quantity = cart[product.IDProduk] || 0;
      return total + product.Harga * quantity;
    }, 0);
  };

  const filteredProducts = products.filter((product) =>
    product.NamaProduk.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()} // Membuka drawer sidebar
          style={styles.iconContainer}
        >
          <Icon name="bars" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsGridView(!isGridView)}
          style={styles.iconContainer}
        >
          <Icon
            name={isGridView ? "bars" : "th-large"}
            size={24}
            color="#000"
          />
        </TouchableOpacity>
      </View>

      {/* Search Section */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#FFF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#FFF"
          />
        </View>
        <TouchableOpacity style={styles.cameraIconContainer}>
          <Icon name="camera" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.IDProduk.toString()}
        renderItem={renderProduct}
        numColumns={isGridView ? 2 : 1}
        contentContainerStyle={styles.productGrid}
        columnWrapperStyle={isGridView && styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: Rp. {calculateTotal()}</Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => {
            const selectedProducts = products.filter(
              (product) => cart[product.IDProduk]
            );
            const orderProducts = selectedProducts.map((product) => ({
              ...product,
              quantity: cart[product.IDProduk],
            }));
            navigation.navigate("Checkout", { orderProducts });
          }}
        >
          <Text style={styles.checkoutText}>Check Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C5FFF8",
    paddingTop: 45,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#FFF",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#A29CF4",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7B66FF",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    color: "#FFF",
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 5,
  },
  cameraIconContainer: {
    marginLeft: 10,
    backgroundColor: "#7B66FF",
    padding: 8,
    borderRadius: 10,
  },
  productGrid: {
    paddingVertical: 13,
    alignItems: "center",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  gridItem: {
    width: 168,
    height: 212,
    backgroundColor: "#A29CF4",
    borderRadius: 10,
    margin: 10,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
  },
  listItem: {
    width: "95%",
    height: 100,
    backgroundColor: "#A29CF4",
    borderRadius: 10,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  gridImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  listImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "left",
  },
  productPrice: {
    fontSize: 14,
    color: "#FFF",
    textAlign: "left",
  },
  cartControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cartControlText: {
    fontSize: 20,
    color: "#FFF",
    paddingHorizontal: 10,
  },
  cartQuantity: {
    fontSize: 16,
    color: "#FFF",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#A29CF4",
  },
  totalText: {
    fontSize: 18,
    color: "#FFF",
  },
  checkoutButton: {
    backgroundColor: "#FF5B5B",
    borderRadius: 10,
    padding: 10,
  },
  checkoutText: {
    color: "#FFF",
    fontSize: 16,
  },
});

export default OrderScreen;
