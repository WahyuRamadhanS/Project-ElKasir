import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../utils/api";

const HomeScreen = ({ navigation, route }) => {
  const [profileImage, setProfileImage] = useState(
    require("../assets/profile.png")
  );
  const [storeName, setStoreName] = useState("Nama Toko");
  const [totalProductsSold, setTotalProductsSold] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [highestSales, setHighestSales] = useState(0);
  const [lowestSales, setLowestSales] = useState(0);

  // Fetch store name from AsyncStorage
  useEffect(() => {
    const fetchStoreName = async () => {
      const storedName = await AsyncStorage.getItem("NamaToko");
      if (storedName) {
        setStoreName(storedName);
      }
    };
    fetchStoreName();
  }, []);

  // Fetch sales stats and revenue
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/sales/stats");
        const { highest, lowest, totalProducts, monthlyRevenue } =
          response.data;
        setHighestSales(highest || 0);
        setLowestSales(lowest || 0);
        setTotalProductsSold(totalProducts || 0);
        setMonthlyRevenue(monthlyRevenue || 0);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };
    fetchStats();
  }, []);

  // Update store name and profile image
  useEffect(() => {
    if (route.params?.updatedStoreName) {
      setStoreName(route.params.updatedStoreName);
    }
    if (route.params?.updatedProfileImage) {
      setProfileImage({ uri: route.params.updatedProfileImage });
    }
  }, [route.params]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/el-kasir-logo.png")}
            style={styles.logoImage}
          />
        </View>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate("Setting")}
        >
          <Image
            source={require("../assets/settings-icon.png")}
            style={styles.settingsIcon}
          />
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
                <Text style={styles.statLabel}>Products Sold</Text>
                <Text style={styles.statValue}>{totalProductsSold}</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Highest</Text>
                <Text style={styles.statValue}>{highestSales}</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Lowest</Text>
                <Text style={styles.statValue}>{lowestSales}</Text>
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
        <Text style={styles.revenueLabel}>Monthly Revenue</Text>
        <Text style={styles.revenueText}>
          Rp. {monthlyRevenue.toLocaleString("id-ID")}
        </Text>
      </View>

      {/* Menu Grid */}
      <View style={styles.menuGrid}>
        {[
          {
            title: "Absent",
            icon: require("../assets/absen.png"),
            screen: "EmployeeAttendance",
          },
          {
            title: "Financial Report",
            icon: require("../assets/financialreport.png"),
            screen: "FinancialReport",
          },
          {
            title: "Catalogue",
            icon: require("../assets/catalog.png"),
            screen: "Catalogue",
          },
          {
            title: "Transaction History",
            icon: require("../assets/transaction.png"),
            screen: "TransactionHistory",
          },
          {
            title: "Order",
            icon: require("../assets/order.png"),
            screen: "Order",
          },
          {
            title: "Employee",
            icon: require("../assets/person.png"),
            screen: "RoleSelection",
          },
        ].map((menu, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigation.navigate(menu.screen)}
          >
            <Image
              source={menu.icon}
              style={styles.menuIcon}
              resizeMode="contain"
            />
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
