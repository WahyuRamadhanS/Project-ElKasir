import React from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const employeeData = [
  {
    id: "1",
    name: "Ismail Ahmad Kanabawi",
    time: "07:15",
    status: "Tepat waktu",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    name: "Khidir Karawita",
    time: "07:18",
    status: "Tepat waktu",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    name: "Tomi Dwiwi",
    time: "09:85",
    status: "Terlambat",
    avatar: "https://via.placeholder.com/150",
  },
];

const EmployeeAttendanceScreen = ({ navigation }) => {
  // Mendapatkan tanggal hari ini
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const renderEmployeeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("EmployeeDetail", { employee: item })}
    >
      {/* Avatar */}
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.info}>
        {/* Nama */}
        <Text style={styles.name}>{item.name}</Text>
        {/* Jam */}
        <Text style={styles.time}>{item.time}</Text>
        {/* Status */}
        <Text style={item.status === "Tepat waktu" ? styles.statusOnTime : styles.statusLate}>
          Status: {item.status}
        </Text>
      </View>
      {/* Arrow */}
      <Icon name="chevron-right" size={20} color="#FFF" style={styles.arrowIcon} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Arrow Back to Login */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Home")}>
        <Icon name="arrow-left" size={24} color="#000" />
        <Text style={styles.backButtonText}>ABSENT</Text>
      </TouchableOpacity>

      {/* Tanggal Absensi */}
      <Text style={styles.dateText}>--- {getCurrentDate()} ---</Text>
      {/* Daftar Karyawan */}
      <FlatList
        data={employeeData}
        keyExtractor={(item) => item.id}
        renderItem={renderEmployeeItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C5FFF8",
    paddingHorizontal: 16,
    paddingTop: 45,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: "#6B4EFF", // Mengubah warna menjadi ungu
    marginLeft: 5,
  },
  
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4A4A4A",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#916BFF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  time: {
    fontSize: 14,
    color: "#F5F5F5",
  },
  statusOnTime: {
    fontSize: 14,
    color: "#4CAF50", // Hijau untuk Tepat waktu
  },
  statusLate: {
    fontSize: 14,
    color: "#F44336", // Merah untuk Terlambat
  },
  arrowIcon: {
    marginLeft: 10,
  },
});

export default EmployeeAttendanceScreen;
