import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";

const HomeScreen = ({ navigation, route }) => {
  const [profileImage, setProfileImage] = useState(require("../assets/profile.png")); // Gambar default
  const [storeName, setStoreName] = useState("Uchi Parfume"); // Nama toko default
  const [totalProductsSold, setTotalProductsSold] = useState(150); // Jumlah produk yang terjual
  const [productPrice, setProductPrice] = useState(103400); // Harga per produk
  const [monthlyRevenue, setMonthlyRevenue] = useState(0); // Omzet bulanan

  // Perbarui data setelah kembali dari EditProfileScreen
  useEffect(() => {
    if (route.params?.updatedStoreName) {
      setStoreName(route.params.updatedStoreName);
    }
    if (route.params?.updatedProfileImage) {
      setProfileImage({ uri: route.params.updatedProfileImage });
    }
  }, [route.params]);

  // Hitung omzet bulanan setiap kali jumlah produk atau harga berubah
  useEffect(() => {
    const revenue = totalProductsSold * productPrice;
    setMonthlyRevenue(revenue);
  }, [totalProductsSold, productPrice]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/el-kasir-logo.png")} style={styles.logoImage} />
        </View>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate("Setting")}
        >
          <Image source={require("../assets/settings-icon.png")} style={styles.settingsIcon} />
        </TouchableOpacity>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.profileContainer}>
          <Image source={profileImage} style={styles.profileImage} />
          <View style={styles.profileDetails}>
            <Text style={styles.storeName}>{storeName}</Text>
            <View style={styles.statsContainer}>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>product</Text>
                <Text style={styles.statValue}>{totalProductsSold}</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>highest</Text>
                <Text style={styles.statValue}>146</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>lowest</Text>
                <Text style={styles.statValue}>15</Text>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate("EditProfile", {
              currentStoreName: storeName,
              currentProfileImage: profileImage.uri,
            })
          }
        >
          <Text style={styles.editIcon}>✎</Text>
        </TouchableOpacity>
      </View>

      {/* Revenue Card */}
      <View style={styles.revenueCard}>
        <Text style={styles.revenueLabel}>Omzet Perbulan</Text>
        <Text style={styles.revenueText}>
          Rp. {monthlyRevenue.toLocaleString("id-ID")}
        </Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editIcon}>✎</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Grid */}
      <View style={styles.menuGrid}>
        {[  
          { title: "absent", icon: require("../assets/absen.png"), screen: "EmployeeAttendance" },
          { title: "financial report", icon: require("../assets/financialreport.png"), screen: "FinancialReport" },
          { title: "catalogue", icon: require("../assets/catalog.png"), screen: "Catalogue" },
          { title: "transaction history", icon: require("../assets/transaction.png"), screen: "TransactionHistory" },
          { title: "order", icon: require("../assets/order.png"), screen: "Order" },
          { title: "employee", icon: require("../assets/person.png"), screen: "AddEmployee" },
        ].map((menu, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigation.navigate(menu.screen)}
          >
            <Image source={menu.icon} style={styles.menuIcon} resizeMode="contain" />
            <Text style={styles.menuText}>{menu.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#C5FFF8",
    padding: 16,
    paddingTop: 45,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logoContainer: {
    flex: 0,
    alignItems: "flex-start",
  },
  logoImage: {
    width: 181,
    height: 60,
    resizeMode: "contain",
  },
  settingsButton: {
    padding: 8,
  },
  settingsIcon: {
    width: 24,
    height: 24,
  },
  profileCard: {
    backgroundColor: "#9370DB",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    position: "relative",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileDetails: {
    flex: 1,
  },
  storeName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stat: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    color: "#FFFFFF",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  editButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 5,
  },
  editIcon: {
    fontSize: 14,
    color: "#4B0082",
  },
  revenueCard: {
    backgroundColor: "#87CEEB",
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    alignItems: "flex-start",
    position: "relative",
  },
  revenueLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  revenueText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  menuItem: {
    width: "48%",
    backgroundColor: "#9370DB",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginBottom: 16,
    elevation: 5,
  },
  menuIcon: {
    width: 37,
    height: 37,
    marginBottom: 8,
  },
  menuText: {
    fontSize: 12,
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default HomeScreen;
