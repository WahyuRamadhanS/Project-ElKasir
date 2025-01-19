import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const TransactionHistory = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null); // State untuk transaksi yang dipilih
  const [isModalVisible, setModalVisible] = useState(false);

  // Data transaksi
  const transactions = [
    {
      id: "1",
      date: "12/10/2024",
      total: "Rp. 45.000",
      products: [
        { name: "Product A", sold: 2 },
        { name: "Product B", sold: 3 },
      ],
    },
    {
      id: "2",
      date: "13/10/2024",
      total: "Rp. 30.000",
      products: [
        { name: "Product C", sold: 1 },
        { name: "Product D", sold: 1 },
      ],
    },
    {
      id: "3",
      date: "14/10/2024",
      total: "Rp. 20.000",
      products: [
        { name: "Product E", sold: 2 },
      ],
    },
  ];

  // Filter transaksi berdasarkan pencarian
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.date.includes(search)
  );

  // Ketika transaksi ditekan
  const handleTransactionPress = (transaction) => {
    setSelectedTransaction(transaction);
    setModalVisible(true);
  };

  const renderTransaction = ({ item }) => (
    <TouchableOpacity
      style={styles.transactionCard}
      onPress={() => handleTransactionPress(item)}
    >
      <Text style={styles.transactionDate}>--- {item.date} ---</Text>
      <Text style={styles.transactionTotal}>{item.total}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#000" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by date"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Transaction List */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={renderTransaction}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.transactionList}
      />

      {/* Modal for Transaction Details */}
      {selectedTransaction && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Details for {selectedTransaction.date}
              </Text>
              <FlatList
                data={selectedTransaction.products}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Text style={styles.productText}>
                    {item.name}: {item.sold} sold
                  </Text>
                )}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  transactionList: {
    paddingBottom: 20,
  },
  transactionCard: {
    backgroundColor: "#87CEEB",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    alignItems: "center", // Untuk membuat teks berada di tengah
  },
  transactionDate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4A4A4A",
  },
  transactionTotal: {
    fontSize: 14,
    color: "#4A4A4A",
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4A4A4A",
  },
  productText: {
    fontSize: 16,
    color: "#4A4A4A",
    marginVertical: 5,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#FF5B5B",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
});

export default TransactionHistory;
