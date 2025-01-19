import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const DetailAbsentScreen = ({ route, navigation }) => {
  const { employee } = route.params; // Data karyawan diterima melalui parameter

  // Mendapatkan tanggal hari ini jika `employee.date` tidak diberikan
  const getCurrentDate = () => {
    const today = new Date(); // Mendapatkan tanggal sekarang
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const attendanceDate = employee.date || getCurrentDate(); // Gunakan tanggal dari data atau tanggal sekarang

  return (
    <View style={styles.container}>
      {/* Tombol Back */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>

      {/* Card Absen */}
      <View style={styles.card}>
        {/* Tanggal */}
        <Text style={styles.dateText}>--- {attendanceDate} ---</Text>

        {/* Nama & Jam */}
        <Text style={styles.nameText}>{employee.name}</Text>
        <Text style={styles.timeText}>{employee.time}</Text>

        {/* Avatar */}
        <Image source={{ uri: employee.avatar }} style={styles.avatar} />

        {/* Status */}
        <Text style={styles.statusText}>
          Status: <Text style={styles.statusValue}>{employee.status}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C5FFF8", // Warna latar belakang
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  card: {
    width: "90%",
    backgroundColor: "#916BFF", // Warna ungu
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  dateText: {
    fontSize: 14,
    color: "#FFF",
    marginBottom: 10,
    fontWeight: "bold", // Membuat tanggal lebih tebal
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
  timeText: {
    fontSize: 16,
    color: "#FFF",
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  statusText: {
    fontSize: 16,
    color: "#FFF",
  },
  statusValue: {
    fontWeight: "bold",
    textTransform: "capitalize", // Membuat status menjadi huruf kapital awal
  },
});

export default DetailAbsentScreen;
