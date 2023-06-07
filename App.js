import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import ManageExpense from "./screens/ManageExpense";
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";

const Stacks = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="AllExpenses" component={AllExpenses} />
      <BottomTabs.Screen name="RecentExpenses" component={RecentExpenses} />
    </BottomTabs.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stacks.Navigator>
          <Stacks.Screen name="ExpensesOverview" component={ExpensesOverview} />
          <Stacks.Screen name="ManageExpense" component={ManageExpense} />
        </Stacks.Navigator>
      </NavigationContainer>
    </>
  );
}
