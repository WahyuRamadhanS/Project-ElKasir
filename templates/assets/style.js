import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // Main Container
  container: {
    flex: 1,
    backgroundColor: "#C5FFF8",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  // Titles
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6B4EFF",
    marginBottom: 20,
  },

  titleHOME: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6B4EFF",
    top: 10,
    left: 0,
    fontStyle: "Jaro",
    position: "static",
  },

  // Inputs and Buttons
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#A7F2FF",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    color: "#000",
  },

  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#6B4EFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },

  loginButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  orText: {
    marginVertical: 10,
    fontSize: 14,
    color: "#000",
  },

  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: "#000",
  },

  errorText: {
    color: "red",
    fontSize: 12,
  },

  // Social Buttons
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  socialButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 72,
    height: 53,
    borderRadius: 30,
    backgroundColor: "#FFF",
    margin: 7,
    elevation: 2,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },

  // Home Button
  HomeButton: {
    alignItems: "baseline",
    justifyContent: "space-around",
    width: 173,
    height: 89,
    borderRadius: 15,
    backgroundColor: "#7B66FF",
    padding: 10,
    margin: 10,
  },

  // Ellipse Styles
  ellipseBox: {
    height: 120,
    width: 490,
    justifyContent: "center",
    alignItems: "center",
  },

  ellipse: {
    backgroundColor: "#7b66ff",
    borderRadius: 245 / 60,
    height: 120,
    width: 490,
  },

  ellipsetop: {
    position: "absolute",
    top: -40,
    width: 490,
    height: 120,
    backgroundColor: "#7B66FF",
    borderRadius: 1040,
    alignSelf: "center",
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  Ellipseimg: {
    position: "absolute",
    top: -40,
    width: 490,
    height: 120,
    backgroundColor: "#7B66FF",
    borderRadius: 1040,
    alignSelf: "center",
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  ellipsebottom: {
    position: "absolute",
    bottom: -30,
    width: 490,
    height: 120,
    backgroundColor: "#7B66FF",
    borderRadius: 240,
    alignSelf: "center",
  },

  ellipseprofile: {
    position: "absolute",
    top: 130,
    width: 370,
    height: 139,
    backgroundColor: "#7B66FF",
    borderRadius: 11,
    alignSelf: "center",
  },

  ellipseOmset: {
    position: "absolute",
    top: 290,
    width: 370,
    height: 83,
    backgroundColor: "#5FBDFF",
    borderRadius: 11,
    alignSelf: "center",
  },

  // Profile Image Styles
  profileImageContainer: {
    marginTop: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: 100,
    height: 100,
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  // New Styles Below -----------------------------------
  // For FlatList items
  flatListContainer: {
    width: "100%",
    paddingVertical: 20,
  },

  flatListItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#A29CF4",
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
  },

  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },

  itemTextContainer: {
    flex: 1,
    justifyContent: "center",
  },

  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },

  itemSubtitle: {
    fontSize: 14,
    color: "#FFF",
  },

  // New Button Style
  roundedButton: {
    width: "90%",
    height: 50,
    backgroundColor: "#5FBDFF",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
  },

  roundedButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Placeholder Text Styles
  placeholderText: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#B0B0B0",
    textAlign: "center",
    marginVertical: 20,
  },
});
