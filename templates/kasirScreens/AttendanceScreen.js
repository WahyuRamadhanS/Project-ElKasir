import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import { Camera } from "expo-camera";
import Icon from "react-native-vector-icons/FontAwesome";

const AttendanceScreen = ({ navigation, route }) => {
  const [photo, setPhoto] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleSubmit = () => {
    Alert.alert(
      "Attendance Submitted",
      "Your attendance has been marked successfully!",
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (!hasPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Camera access is required.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {photo ? (
        <ConfirmationView photo={photo} onRetake={() => setPhoto(null)} onSubmit={handleSubmit} />
      ) : (
        <CameraView setPhoto={setPhoto} />
      )}
    </View>
  );
};

const CameraView = ({ setPhoto }) => {
  const [cameraRef, setCameraRef] = useState(null);

  const handleTakePhoto = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.takePictureAsync({ quality: 1 });
        setPhoto(photo.uri);
      } catch (error) {
        console.error("Error taking photo:", error);
        Alert.alert("Error", "Failed to take photo. Please try again.");
      }
    } else {
      Alert.alert("Error", "Camera is not ready.");
    }
  };

  return (
    <Camera
      style={styles.camera}
      type={Camera.Type.front} // Menggunakan kamera depan
      ref={(ref) => setCameraRef(ref)}
    >
      <View style={styles.controlContainer}>
        <TouchableOpacity style={styles.captureButton} onPress={handleTakePhoto}>
          <Icon name="camera" size={30} color="#FFF" />
        </TouchableOpacity>
      </View>
    </Camera>
  );
};

const ConfirmationView = ({ photo, onRetake, onSubmit }) => (
  <View style={styles.confirmationContainer}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C5FFF8",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  permissionText: {
    fontSize: 18,
    color: "#FF5B5B",
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  controlContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  captureButton: {
    backgroundColor: "#FF5B5B",
    padding: 20,
    borderRadius: 50,
  },
  confirmationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  },
});

export default AttendanceScreen;
