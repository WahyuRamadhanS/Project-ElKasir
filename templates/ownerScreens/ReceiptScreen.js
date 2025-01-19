import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Share, Platform } from "react-native";
import RNPrint from "react-native-print"; // Ensure this package is installed

const ReceiptScreen = ({ route, navigation }) => {
  const {
    totalAmount = 0,
    paymentMethod = "",
    customerName = "",
    products = [],
    discount = { value: 0, type: "Rp" },
    additionalFees = [],
  } = route.params || {};

  const discountValue =
    discount.type === "%"
      ? (totalAmount * discount.value) / 100
      : discount.value;

  const additionalFeesTotal = additionalFees.reduce((total, fee) => {
    return fee.type === "percentage"
      ? total + (totalAmount * fee.value) / 100
      : total + fee.value;
  }, 0);

  const finalTotal = Math.max(totalAmount - discountValue + additionalFeesTotal, 0);

  const handlePrint = async () => {
    const receiptContent = `
      <html>
        <body style="font-family: Arial, sans-serif; text-align: center;">
          <h1>Uchi Parfume</h1>
          <p>Jl. yang benar</p>
          <p>08XXXXXXXXXX</p>
          <hr />
          <p><strong>Nama Pelanggan:</strong> ${customerName}</p>
          <hr />
          <p><strong>Rincian Pesanan:</strong></p>
          ${products.map((product) => `<p>${product.name} ${product.quantity}x : Rp. ${product.price * product.quantity}</p>`).join("")}
          <hr />
          ${discount.value > 0 ? `<p><strong>Diskon (${discount.type}):</strong> -Rp. ${Math.round(discountValue)}</p>` : ""}
          ${additionalFees.map((fee) => `<p>${fee.name} (${fee.type === "percentage" ? "%" : "Rp"}): +Rp. ${fee.type === "percentage" ? Math.round((totalAmount * fee.value) / 100) : fee.value}</p>`).join("")}
          <p><strong>Total Pesanan:</strong> Rp. ${finalTotal}</p>
          <p><strong>Metode Pembayaran:</strong> ${paymentMethod}</p>
          <hr />
          <p>Terima kasih telah berbelanja!</p>
          <p>Semoga harimu menyenangkan!</p>
        </body>
      </html>
    `;

    try {
      await RNPrint.print({ html: receiptContent });
    } catch (error) {
      Alert.alert("Error", "Tidak dapat mencetak struk.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.receiptContainer}>
        <Text style={styles.title}>Uchi Parfume</Text>
        <Text style={styles.subtitle}>Jl. yang benar</Text>
        <Text style={styles.subtitle}>08XXXXXXXXXX</Text>
        <View style={styles.divider} />
        <Text style={styles.text}>Nama Pelanggan: {customerName}</Text>
        <View style={styles.divider} />
        <Text style={styles.text}>Rincian Pesanan:</Text>
        {products.length > 0 ? (
          products.map((product, index) => (
            <Text key={index} style={styles.text}>
              {product.name} {product.quantity}x : Rp. {product.price * product.quantity}
            </Text>
          ))
        ) : (
          <Text style={styles.text}>Tidak ada produk.</Text>
        )}
        <View style={styles.divider} />
        {discount.value > 0 && (
          <Text style={styles.text}>
            Diskon ({discount.type}): -Rp. {Math.round(discountValue)}
          </Text>
        )}
        {additionalFees.map((fee, index) => (
          <Text key={index} style={styles.text}>
            {fee.name} ({fee.type === "percentage" ? "%" : "Rp"}): +Rp. {fee.type === "percentage" ? Math.round((totalAmount * fee.value) / 100) : fee.value}
          </Text>
        ))}
        <Text style={styles.text}>Total Pesanan: Rp. {finalTotal}</Text>
        <Text style={styles.text}>Metode Pembayaran: {paymentMethod}</Text>
        <View style={styles.divider} />
        <Text style={styles.footer}>Terima kasih telah berbelanja!</Text>
        <Text style={styles.footer}>Semoga harimu menyenangkan!</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.buttonText}>Kembali ke Beranda</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={handlePrint}>
        <Text style={styles.buttonText}>Print Struk</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#C5FFF8", justifyContent: "center", alignItems: "center" },
  receiptContainer: { backgroundColor: "#FFF", padding: 20, borderRadius: 10, width: "90%" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: "center", marginBottom: 5 },
  divider: { borderBottomWidth: 1, borderBottomColor: "#DDD", marginVertical: 10 },
  text: { fontSize: 16, marginBottom: 10 },
  footer: { fontSize: 14, textAlign: "center", color: "#666" },
  button: { backgroundColor: "#4B0082", padding: 15, borderRadius: 10, marginTop: 20 },
  buttonText: { color: "#FFF", fontSize: 16, fontWeight: "bold", textAlign: "center" },
});

export default ReceiptScreen;
