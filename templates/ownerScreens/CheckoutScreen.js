import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const CheckoutScreen = ({ navigation, route }) => {
  const { orderProducts = [] } = route.params || {}; // Mengambil data produk dari Order
  const [customerName, setCustomerName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [isDiscountEnabled, setDiscountEnabled] = useState(false);
  const [discount, setDiscount] = useState({ value: 0, type: "Rp" });
  const [isAdditionalFeeEnabled, setAdditionalFeeEnabled] = useState(false);
  const [additionalFees, setAdditionalFees] = useState([]);
  const [availableOptions, setAvailableOptions] = useState([
    { id: "tax", name: "Pajak (%)", type: "percentage" },
    { id: "shipping", name: "Ongkos Kirim (Rp)", type: "nominal" },
    { id: "packaging", name: "Kemasan (Rp)", type: "nominal" },
  ]);
  const [isFeeModalVisible, setFeeModalVisible] = useState(false);
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);

  const calculateTotal = () => {
    const productTotal = orderProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    const discountValue =
      discount.type === "%"
        ? (productTotal * discount.value) / 100
        : discount.value;

    const additionalFeesTotal = additionalFees.reduce((total, fee) => {
      if (fee.type === "percentage") {
        return total + (productTotal * fee.value) / 100;
      }
      return total + fee.value;
    }, 0);

    return productTotal - discountValue + additionalFeesTotal;
  };

  const handleConfirmPayment = () => {
    setConfirmModalVisible(false);
    navigation.navigate("Receipt", {
      orderProducts,
      totalAmount: calculateTotal(),
      paymentMethod,
      customerName,
      discount,
      additionalFees,
    });
  };

  const handleAddFee = (option) => {
    setAdditionalFees((prev) => [...prev, { ...option, value: 0 }]);
    setAvailableOptions((prev) => prev.filter((item) => item.id !== option.id));
    setFeeModalVisible(false);
  };

  const handleRemoveFee = (id) => {
    const removedFee = additionalFees.find((fee) => fee.id === id);
    setAdditionalFees((prev) => prev.filter((fee) => fee.id !== id));
    if (removedFee) {
      setAvailableOptions((prev) => [...prev, removedFee]);
    }
  };

  const renderProducts = () => {
    if (!Array.isArray(orderProducts) || orderProducts.length === 0) {
      return <Text style={styles.rincianItem}>Tidak ada produk dalam pesanan.</Text>;
    }
    return orderProducts.map((product, index) => (
      <Text key={index} style={styles.rincianItem}>
        {product.name} {product.quantity}x : Rp. {product.price * product.quantity}
      </Text>
    ));
  };

  const renderDiscountValue = () => {
    const productTotal = orderProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    return discount.type === "%"
      ? Math.round((productTotal * discount.value) / 100)
      : discount.value;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="#000" />
          <Text style={styles.headerText}>Checkout</Text>
        </TouchableOpacity>

        {/* Nama Customer */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nama Customer</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan nama customer"
            value={customerName}
            onChangeText={setCustomerName}
          />
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Metode Pembayaran</Text>
          <View style={styles.paymentMethod}>
            <TouchableOpacity
              style={[
                styles.paymentButton,
                paymentMethod === "Cash" && styles.activePaymentButton,
              ]}
              onPress={() => setPaymentMethod("Cash")}
            >
              <Text
                style={[
                  styles.paymentButtonText,
                  paymentMethod === "Cash" && styles.activePaymentText,
                ]}
              >
                TUNAI
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paymentButton,
                paymentMethod === "NonCash" && styles.activePaymentButton,
              ]}
              onPress={() => setPaymentMethod("NonCash")}
            >
              <Text
                style={[
                  styles.paymentButtonText,
                  paymentMethod === "NonCash" && styles.activePaymentText,
                ]}
              >
                NON TUNAI
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Discount */}
        <View style={styles.section}>
          <View style={styles.switchContainer}>
            <Text style={styles.sectionTitle}>Diskon</Text>
            <Switch
              value={isDiscountEnabled}
              onValueChange={() => setDiscountEnabled(!isDiscountEnabled)}
            />
          </View>
          {isDiscountEnabled && (
            <View style={styles.discountContainer}>
              <TextInput
                style={[styles.input, styles.discountInput]}
                keyboardType="numeric"
                placeholder="Nominal Diskon"
                value={discount.value.toString()}
                onChangeText={(value) =>
                  setDiscount((prev) => ({
                    ...prev,
                    value: parseInt(value, 10) || 0,
                  }))
                }
              />
              <TouchableOpacity
                style={styles.discountTypeButton}
                onPress={() =>
                  setDiscount((prev) => ({
                    ...prev,
                    type: prev.type === "Rp" ? "%" : "Rp",
                  }))
                }
              >
                <Text style={styles.discountTypeText}>{discount.type}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Additional Fees */}
        <View style={styles.section}>
          <View style={styles.switchContainer}>
            <Text style={styles.sectionTitle}>Biaya Tambahan</Text>
            <Switch
              value={isAdditionalFeeEnabled}
              onValueChange={() =>
                setAdditionalFeeEnabled(!isAdditionalFeeEnabled)
              }
            />
          </View>
          {isAdditionalFeeEnabled && (
            <>
              {additionalFees.map((fee) => (
                <View key={fee.id} style={styles.additionalFeeRow}>
                  <Text style={styles.feeLabel}>{fee.name}</Text>
                  <TextInput
                    style={[styles.input, styles.additionalFeeInput]}
                    keyboardType="numeric"
                    placeholder={fee.type === "percentage" ? "%" : "Rp"}
                    value={fee.value.toString()}
                    onChangeText={(value) =>
                      setAdditionalFees((prev) =>
                        prev.map((item) =>
                          item.id === fee.id
                            ? { ...item, value: parseInt(value, 10) || 0 }
                            : item
                        )
                      )
                    }
                  />
                  <TouchableOpacity onPress={() => handleRemoveFee(fee.id)}>
                    <Icon name="trash" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
              {availableOptions.length > 0 && (
                <TouchableOpacity
                  style={styles.addFeeButton}
                  onPress={() => setFeeModalVisible(true)}
                >
                  <Text style={styles.addFeeButtonText}>+ Tambah Biaya</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>

        {/* Modal Pilihan Opsi */}
         <Modal visible={isFeeModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Pilih Biaya Tambahan</Text>
              {availableOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.modalOption}
                  onPress={() => handleAddFee(option)}
                >
                  <Text style={styles.modalOptionText}>{option.name}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setFeeModalVisible(false)}
              >
                <Text style={styles.modalCloseText}>Batal</Text>
              </TouchableOpacity>
              </View>
            </View>
          </Modal>

        {/* Order Summary */}
        <View style={styles.summary}>
          <Text style={styles.sectionTitle}>Rincian Pesanan</Text>
          {renderProducts()}
          <View style={styles.separator} />
          {isDiscountEnabled && (
            <Text style={styles.rincianItem}>
              Diskon ({discount.type}): -Rp. {renderDiscountValue()}
            </Text>
          )}
          {additionalFees.map((fee) => (
            <Text key={fee.id} style={styles.rincianItem}>
              {fee.name} ({fee.type === "percentage" ? "%" : "Rp"}): Rp. {fee.type === "percentage" ? Math.round((orderProducts.reduce((total, product) => total + product.price * product.quantity, 0) * fee.value) / 100) : fee.value}
            </Text>
          ))}
          <Text style={styles.totalText}>Total Akhir: Rp. {calculateTotal()}</Text>
        </View>
      </ScrollView>

      {/* Confirmation Modal */}
      <Modal
        visible={isConfirmModalVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Pembayaran Rp{calculateTotal()}</Text>
            <Text style={styles.modalSmallText}>
              Konfirmasi pembayaran dengan total Rp{calculateTotal()} telah
              dibayarkan oleh pembeli.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setConfirmModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleConfirmPayment}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Checkout Button */}
      <View style={styles.checkoutButtonContainer}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => setConfirmModalVisible(true)}
        >
          <Text style={styles.checkoutButtonText}>Proses Checkout</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#C5FFF8", padding: 0, paddingTop: 35, },
  scrollViewContent: { padding: 20 },
  backButton: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  headerText: { fontSize: 20, marginLeft: 10, fontWeight: "bold" },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  discountContainer: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  discountInput: { flex: 1, marginRight: 10 },
  discountTypeButton: {
    backgroundColor: "#A29CF4",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  discountTypeText: { color: "#FFF", fontWeight: "bold" },
  additionalFeeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  feeLabel: { flex: 1, fontSize: 14, color: "#333", fontWeight: "bold" },
  additionalFeeInput: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    width: 80,
    marginRight: 10,
  },
  addFeeButton: {
    backgroundColor: "#A29CF4",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginVertical: 5,
  },
  addFeeButtonText: { color: "#FFF", fontWeight: "bold" },
  paymentMethod: { flexDirection: "row", justifyContent: "space-around" },
  paymentButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#4B0082",
    borderRadius: 10,
    width: "45%",
    alignItems: "center",
  },
  activePaymentButton: { backgroundColor: "#4B0082" },
  paymentButtonText: { fontSize: 14, color: "#4B0082" },
  activePaymentText: { color: "#FFF" },
  summary: { backgroundColor: "#A29CF4", borderRadius: 10, padding: 15 },
  rincianItem: { fontSize: 14, color: "#333", marginBottom: 5 },
  separator: { borderBottomWidth: 1, borderBottomColor: "#DDD", marginVertical: 10 },
  totalText: { fontSize: 16, fontWeight: "bold", color: "#4B0082" },
  checkoutButtonContainer: {
    padding: 10,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#DDD",
  },
  checkoutButton: {
    backgroundColor: "#FF5B5B",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  checkoutButtonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: "80%",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
    width: "100%",
    alignItems: "center",
  },
  modalOptionText: { fontSize: 16 },
  modalCloseButton: { marginTop: 10 },
  modalCloseText: { color: "red", fontWeight: "bold", fontSize: 16 },
});

export default CheckoutScreen;
