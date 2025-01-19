import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const CustomDrawerContent = ({ navigation }) => {
  return (
    <View style={styles.drawerContainer}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require("../assets/profile.png")} // Gambar profil default
          style={styles.profileImage}
        />
        <View style={styles.profileInfoContainer}>
          <Text style={styles.profileName}>Ismail Ahmad Kanabawi</Text>
          <Text style={styles.profileInfo}>08xxxxxxxxxx</Text>
          <Text style={styles.profileInfo}>ismailbinmail@gmail.com</Text>
          <Text style={styles.profileJob}>Inventaris</Text>
        </View>
      </View>

      {/* DANA Balance */}
      <View style={styles.danaCard}>
        <Text style={styles.danaLabel}>DANA Balance</Text>
        <Text style={styles.danaBalance}>Rp. 500.000</Text>
      </View>

      {/* Menu Options */}
      <View style={styles.menuOptions}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("InventoryAttendance")}
        >
          <MaterialIcons
            name="fingerprint"
            size={20}
            color="#000"
            style={styles.menuIcon}
          />
          <Text style={styles.menuText}>Absent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("InventoryCatalogue")}
        >
          <Icon
            name="book"
            size={20}
            color="#000"
            style={styles.menuIcon}
          />
          <Text style={styles.menuText}>Catalogue</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Options */}
      <View style={styles.bottomOptions}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Setting")}
        >
          <Icon name="cog" size={20} color="#000" style={styles.menuIcon} />
          <Text style={styles.menuText}>Setting</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Report")}
        >
          <Icon name="file" size={20} color="#000" style={styles.menuIcon} />
          <Text style={styles.menuText}>Report</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: "#5F9EA0", // Updated background color for better contrast
    padding: 16,
    paddingTop: 45,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfoContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 4,
  },
  profileInfo: {
    fontSize: 14,
    color: "#FFF",
    marginBottom: 4,
  },
  profileJob: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 5,
  },
  danaCard: {
    backgroundColor: "#4682B4", // Updated for better balance
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    alignItems: "center",
  },
  danaLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
  danaBalance: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 5,
  },
  menuOptions: {
    flex: 1,
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  menuIcon: {
    marginRight: 15,
    color: "#FFF",
  },
  menuText: {
    fontSize: 16,
    color: "#FFF",
  },
  bottomOptions: {
    borderTopWidth: 1,
    borderTopColor: "#FFF",
    paddingTop: 10,
  },
});

export default CustomDrawerContent;
