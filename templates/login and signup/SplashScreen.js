import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Image, Animated, Dimensions } from "react-native";

const SplashScreen = ({ navigation }) => {
  const slideAnim = useRef(new Animated.Value(Dimensions.get("window").height)).current; // Slide for first image
  const firstImageOpacity = useRef(new Animated.Value(1)).current; // Opacity for first image
  const secondImageOpacity = useRef(new Animated.Value(0)).current; // Opacity for second image

  useEffect(() => {
    Animated.sequence([
      // Slide in the first image
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Transition to the second image
      Animated.parallel([
        Animated.timing(firstImageOpacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(secondImageOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setTimeout(() => {
        navigation.replace("LogIn"); // Redirect to login page after animation
      }, 1000); // Show for additional 1 second
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* First Image */}
      <Animated.View
        style={[styles.logoContainer, { transform: [{ translateY: slideAnim }], opacity: firstImageOpacity }]}
      >
        <Image source={require("../assets/splashLogo.png")} style={styles.logo} />
      </Animated.View>

      {/* Second Image */}
      <Animated.View
        style={[styles.logoContainer, { opacity: secondImageOpacity }]}
      >
        <Image source={require("../assets/splashLogo2.png")} style={styles.logo} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C5FFF8", // Background color utama
  },
  logoContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 350,
    height: 350,
    resizeMode: "contain",
  },
});

export default SplashScreen;
