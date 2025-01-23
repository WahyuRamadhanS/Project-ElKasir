import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

/**
 * Helper function to get the current date and time.
 */
const getCurrentDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = today.getFullYear();
  const time = today.toTimeString().split(" ")[0]; // Get time in HH:MM:SS format
  return `${day}/${month}/${year} - ${time}`;
};

const AttendanceScreen = ({ navigation, route }) => {
  const [photo, setPhoto] = useState(null); // Replace camera functionality with a placeholder
  const [currentDate, setCurrentDate] = useState(getCurrentDate()); // Call the helper function
  const role = route.params?.role || "kasir";

  // Handle attendance submission
  const handleSubmit = () => {
    Alert.alert(
      "Attendance Submitted",
      `Attendance successfully marked for ${role} at ${currentDate}.`,
      [
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("kasir", { screen: "KasirOrders" }), // Navigate to KasirOrders inside Kasir drawer
        },
      ]
    );
  };

  // Handle retake photo (placeholder functionality)
  const handleRetakePhoto = () => {
    setPhoto(null); // Reset the placeholder photo
  };

  return (
    <View style={styles.container}>
      {/* Check if a photo is taken or show confirmation screen */}
      {photo ? (
        <ConfirmationView
          photo={photo}
          currentDate={currentDate}
          role={role}
          onRetake={handleRetakePhoto}
          onSubmit={handleSubmit}
        />
      ) : (
        <PlaceholderView setPhoto={setPhoto} />
      )}
    </View>
  );
};

// Placeholder View to simulate taking a photo
const PlaceholderView = ({ setPhoto }) => {
  return (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>[Camera Placeholder]</Text>
      <TouchableOpacity
        style={styles.captureButton}
        onPress={() =>
          setPhoto("https://via.placeholder.com/200") // Simulated photo URL
        }
      >
        <Icon name="camera" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

// Confirmation View for after the photo is "taken"
const ConfirmationView = ({ photo, currentDate, role, onRetake, onSubmit }) => {
  return (
    <View style={styles.confirmationContainer}>
      <Text style={styles.dateText}>--- {currentDate} ---</Text>
      <Text style={styles.roleText}>{role}</Text>
      <Image source={{ uri: photo }} style={styles.photo} />
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={onRetake}>
          <Icon name="times" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onSubmit}>
          <Icon name="check" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C5FFF8",
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C5FFF8",
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6B4EFF",
    marginBottom: 20,
  },
  captureButton: {
    backgroundColor: "#FF5B5B",
    padding: 20,
    borderRadius: 50,
    marginBottom: 50,
  },
  confirmationContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C5FFF8",
    padding: 16,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  roleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6B4EFF",
    marginBottom: 20,
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 30,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  actionButton: {
    backgroundColor: "#6B4EFF",
    padding: 16,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
  },
});

export default AttendanceScreen;
