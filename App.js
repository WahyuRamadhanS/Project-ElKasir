import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ProductProvider } from "./ProductContext";

// Import Screens
import SplashScreen from "./templates/login and signup/SplashScreen";
import LogIn from "./templates/login and signup/login";
import SignUp from "./templates/login and signup/signup";
import VerificationScreen from "./templates/login and signup/VerificationScreen";

import HomeScreens from "./templates/ownerScreens/HomeScreens";
import SettingScreen from "./templates/ownerScreens/SettingScreen";
import EditProfileScreen from "./templates/ownerScreens/EditProfileScreen";
import EmployeeAttendanceScreen from "./templates/ownerScreens/EmployeeAttendanceScreen";
import EmployeeDetailScreen from "./templates/ownerScreens/EmployeeDetailScreen";
import AddCashierScreen from "./templates/ownerScreens/AddCashierScreen";
import AddInventoryScreen from "./templates/ownerScreens/AddInventoryScreen";
import RoleSelectionScreen from "./templates/ownerScreens/roleSelect";
import FinancialReportScreen from "./templates/ownerScreens/FinancialReportScreen";
import OrderScreen from "./templates/ownerScreens/OrderScreen";
import CatalogueScreen from "./templates/ownerScreens/CatalogueScreen";
import CatalogueEdit from "./templates/ownerScreens/CatalogueEdit";
import CatalogueAdd from "./templates/ownerScreens/CatalogueAdd";
import TransactionHistory from "./templates/ownerScreens/TransactionHistory";
import CheckoutScreen from "./templates/ownerScreens/CheckoutScreen";
import ReceiptScreen from "./templates/ownerScreens/ReceiptScreen";

import OrderScreenKasir from "./templates/kasirScreens/orderscreens";
import CustomDrawerContentKasir from "./templates/kasirScreens/CustomDrawerContentK";

import CustomDrawerContentInventory from "./templates/inventarisScreens/CustomDrawerContentI";
import CatalogueScreenInventory from "./templates/inventarisScreens/CatalogueScreenInventory";

import KasirAttendanceScreen from "./templates/kasirScreens/AttendanceScreen";
import InventoryAttendanceScreen from "./templates/inventarisScreens/AttendanceScreen";

// Create Navigators
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

/**
 * Drawer Navigator for Kasir
 */
const KasirDrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContentKasir {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <Drawer.Screen name="KasirOrders" component={OrderScreenKasir} />
    <Drawer.Screen name="KasirAttendance" component={KasirAttendanceScreen} />
  </Drawer.Navigator>
);

/**
 * Drawer Navigator for Inventory
 */
const InventoryDrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContentInventory {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <Drawer.Screen
      name="InventoryCatalogue"
      component={CatalogueScreenInventory}
    />
    <Drawer.Screen name="InventoryAttendance" component={InventoryAttendanceScreen} />
  </Drawer.Navigator>
);

/**
 * Main App Stack Navigator
 */
export default function App() {
  return (
    <ProductProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{ headerShown: false }}
        >
          {/* Authentication Screens */}
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Verification" component={VerificationScreen} />

          {/* Main App Screens */}
          <Stack.Screen name="Home" component={HomeScreens} />
          <Stack.Screen name="Setting" component={SettingScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen
            name="EmployeeAttendance"
            component={EmployeeAttendanceScreen}
          />
          <Stack.Screen name="EmployeeDetail" component={EmployeeDetailScreen} />
          <Stack.Screen name="AddCashier" component={AddCashierScreen} />
          <Stack.Screen name="AddInventory" component={AddInventoryScreen} />
          <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />          
          <Stack.Screen
            name="FinancialReport"
            component={FinancialReportScreen}
          />
          <Stack.Screen name="Order" component={OrderScreen} />
          <Stack.Screen name="Catalogue" component={CatalogueScreen} />
          <Stack.Screen name="CatalogueEdit" component={CatalogueEdit} />
          <Stack.Screen name="CatalogueAdd" component={CatalogueAdd} />
          <Stack.Screen
            name="TransactionHistory"
            component={TransactionHistory}
          />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="Receipt" component={ReceiptScreen} />

          {/* Drawer Navigators */}
          <Stack.Screen name="Kasir" component={KasirDrawerNavigator} />
          <Stack.Screen name="Inventory" component={InventoryDrawerNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProductProvider>
  );
}
