import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useProducts } from "../../ProductContext";

const OrderScreen = ({ navigation, route }) => {
  const { products, cart, setCart } = useProducts(); // Mengambil data dari global state
  const [search, setSearch] = useState("");
  const [isGridView, setIsGridView] = useState(true); // State untuk mengganti tampilan

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
    const quantity = cart[item.id] || 0;

    return (
      <View style={isGridView ? styles.gridItem : styles.listItem}>
        <Image
          source={{ uri: item.image }}
          style={isGridView ? styles.gridImage : styles.listImage} // Ubah ukuran image berdasarkan mode tampilan
        />
        <View style={styles.textContainer}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>Rp. {item.price}</Text>
        </View>
        <View style={styles.cartControls}>
          <TouchableOpacity onPress={() => removeFromCart(item.id)}>
            <Text style={styles.cartControlText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.cartQuantity}>{quantity}</Text>
          <TouchableOpacity onPress={() => addToCart(item.id)}>
            <Text style={styles.cartControlText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      const quantity = cart[product.id] || 0;
      return total + product.price * quantity;
    }, 0);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconContainer}
        >
          <Icon name="arrow-left" size={24} color="#000" />
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

      {/* Product List or Grid */}
      <FlatList
        data={filteredProducts || []}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        numColumns={isGridView ? 2 : 1} // Grid: 2 kolom, List: 1 kolom
        contentContainerStyle={styles.productGrid}
        columnWrapperStyle={isGridView && styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        key={isGridView ? "grid" : "list"} // Force re-render when switching layouts
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: Rp. {calculateTotal()}</Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => {
            const selectedProducts = products.filter((product) => cart[product.id]);
            const orderProducts = selectedProducts.map((product) => ({
              ...product,
              quantity: cart[product.id],
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
    justifyContent: "center", // Agar teks nama dan harga berada di tengah
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
