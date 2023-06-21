import { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";

import useAuth from "./store/authContenxt";
import { colors } from "./constants/styles";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import ManageExpense from "./screens/ManageExpense";
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";

import IconButton from "./components/ui/IconButton";
import Context from "./components/ui/Context";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Stacks = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
  const { logout } = useAuth();
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: colors.primary500 },
        tabBarActiveTintColor: colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => navigation.navigate("ManageExpense")}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" color={color} size={size} />
          ),
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              size={24}
              color={tintColor}
              onPress={logout}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stacks.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary500 },
        headerTintColor: "red",
        contentStyle: { backgroundColor: colors.primary100 },
      }}
    >
      <Stacks.Screen name="Login" component={LoginScreen} />
      <Stacks.Screen name="Signup" component={SignupScreen} />
    </Stacks.Navigator>
  );
};

const AuthenticatedStack = () => {
  const { logout } = useAuth();
  return (
    <Stacks.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: colors.primary100 },
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="exit"
            size={24}
            color={tintColor}
            onPress={logout}
          />
        ),
      }}
    >
      <Stacks.Screen
        name="ExpensesOverview"
        component={ExpensesOverview}
        options={{ headerShown: false }}
      />
      <Stacks.Screen
        name="ManageExpense"
        component={ManageExpense}
        options={{ presentation: "modal" }}
      />
    </Stacks.Navigator>
  );
};

const Navigation = () => {
  const { token } = useAuth();
  return (
    <NavigationContainer>
      {!token && <AuthStack />}
      {token && <AuthenticatedStack />}
    </NavigationContainer>
  );
};

// Doing this to prolong my loading screen on app opening
// Doing in the auth context will show brefly the login screen
const Root = () => {
  const { token, authenticate } = useAuth();

  const getToken = async () => {
    const token = AsyncStorage.getItem("Exp_Token");

    if (token) authenticate(token);

    await SplashScreen.hideAsync();
  };

  useEffect(() => {
    getToken();
  }, [token]);

  return (
    <Context>
      <Navigation />
    </Context>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Root />
    </>
  );
}
