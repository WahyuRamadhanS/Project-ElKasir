import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const FinancialReportScreen = ({ navigation }) => {
  const [currentYear, setCurrentYear] = useState(2025);
  const [currentMonth, setCurrentMonth] = useState(0);

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const generateWeeklyData = () => {
    return Array.from({ length: 4 }, () => Math.floor(Math.random() * 500));
  };

  const reports = [
    { month: "January", data: generateWeeklyData(), income: "Rp. 2.000.000", productsSold: 400, avgIncome: "Rp. 5.000.000" },
    { month: "February", data: generateWeeklyData(), income: "Rp. 2.500.000", productsSold: 500, avgIncome: "Rp. 5.500.000" },
    { month: "March", data: generateWeeklyData(), income: "Rp. 3.000.000", productsSold: 600, avgIncome: "Rp. 6.000.000" },
    { month: "April", data: generateWeeklyData(), income: "Rp. 3.500.000", productsSold: 700, avgIncome: "Rp. 6.500.000" },
    { month: "May", data: generateWeeklyData(), income: "Rp. 4.000.000", productsSold: 800, avgIncome: "Rp. 7.000.000" },
    { month: "June", data: generateWeeklyData(), income: "Rp. 4.500.000", productsSold: 900, avgIncome: "Rp. 7.500.000" },
    { month: "July", data: generateWeeklyData(), income: "Rp. 5.000.000", productsSold: 1000, avgIncome: "Rp. 8.000.000" },
    { month: "August", data: generateWeeklyData(), income: "Rp. 5.500.000", productsSold: 1100, avgIncome: "Rp. 8.500.000" },
    { month: "September", data: generateWeeklyData(), income: "Rp. 6.000.000", productsSold: 1200, avgIncome: "Rp. 9.000.000" },
    { month: "October", data: generateWeeklyData(), income: "Rp. 6.500.000", productsSold: 1300, avgIncome: "Rp. 9.500.000" },
    { month: "November", data: generateWeeklyData(), income: "Rp. 7.000.000", productsSold: 1400, avgIncome: "Rp. 10.000.000" },
    { month: "December", data: generateWeeklyData(), income: "Rp. 7.500.000", productsSold: 1500, avgIncome: "Rp. 10.500.000" },
  ];

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev + 1) % reports.length);
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev - 1 + reports.length) % reports.length);
  };

  const handleNextYear = () => {
    setCurrentYear((prev) => prev + 1);
  };

  const handlePrevYear = () => {
    setCurrentYear((prev) => prev - 1);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      {/* Year Navigation */}
      <View style={styles.yearNavigation}>
        <TouchableOpacity style={styles.navButton} onPress={handlePrevYear}>
          <Text style={styles.navButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.yearText}>{currentYear}</Text>
        <TouchableOpacity style={styles.navButton} onPress={handleNextYear}>
          <Text style={styles.navButtonText}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Chart Section */}
      <View style={styles.chartCard}>
        <BarChart
          data={{
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            datasets: [{ data: reports[currentMonth].data }],
          }}
          width={Dimensions.get("window").width * 0.85} // Dynamic width
          height={250}
          fromZero={true}
          yAxisSuffix=" pcs"
          chartConfig={{
            backgroundColor: "#5F9EA0",
            backgroundGradientFrom: "#5F9EA0",
            backgroundGradientTo: "#5F9EA0",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          style={styles.chart}
        />
        <Text style={styles.monthText}>{reports[currentMonth].month}</Text>
        <View style={styles.navigationButtons}>
          <TouchableOpacity style={styles.navButton} onPress={handlePrevMonth}>
            <Text style={styles.navButtonText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={handleNextMonth}>
            <Text style={styles.navButtonText}>→</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Report Details */}
      <View style={styles.reportCard}>
        <Text style={styles.reportText}>Income: {reports[currentMonth].income}</Text>
        <Text style={styles.reportText}>Products Sold: {reports[currentMonth].productsSold}</Text>
        <Text style={styles.reportText}>Average Income: {reports[currentMonth].avgIncome}</Text>
      </View>

      {/* Download PDF Button */}
      <TouchableOpacity style={styles.downloadButton}>
        <Text style={styles.downloadButtonText}>📥 Download PDF</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#C5FFF8", // Warna utama sebagai latar belakang
    alignItems: "center",
    padding: 20,
    paddingTop: 45,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 15,
  },
  backText: {
    fontSize: 16,
    color: "#7B66FF", // Warna sekunder untuk tombol kembali
    fontWeight: "bold",
  },
  yearNavigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  yearText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#7B66FF", // Warna sekunder untuk teks tahun
    marginHorizontal: 20,
  },
  chartCard: {
    backgroundColor: "#7B66FF", // Warna sekunder untuk kartu grafik
    borderRadius: 15,
    width: "95%",
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
  },
  monthText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF", // Warna putih untuk teks di atas kartu berwarna
    marginVertical: 10,
    textTransform: "uppercase",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
    marginTop: 10,
  },
  navButton: {
    backgroundColor: "#FFFFFF", // Warna putih untuk tombol navigasi
    borderRadius: 25,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7B66FF", // Warna sekunder untuk teks tombol navigasi
  },
  reportCard: {
    backgroundColor: "#7B66FF", // Warna sekunder untuk kartu laporan
    borderRadius: 10,
    width: "95%",
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  reportText: {
    fontSize: 16,
    color: "#FFFFFF", // Warna putih untuk teks laporan
    marginBottom: 8,
    fontWeight: "500",
  },
  downloadButton: {
    backgroundColor: "#FF4040", // Warna utama untuk tombol unduh
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "95%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  downloadButtonText: {
    color: "#7B66FF", // Warna sekunder untuk teks tombol unduh
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FinancialReportScreen;
