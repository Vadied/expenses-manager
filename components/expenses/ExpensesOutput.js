import { View, Text, StyleSheet } from "react-native";

import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

import { colors } from "../../constants/styles";

const ExpensesOutput = ({ expenses, period, fallbackText = "" }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} period={period} />
      {!!expenses.length && <ExpensesList expenses={expenses} />}
      {!expenses.length && <Text style={styles.text}>{fallbackText}</Text>}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.primary700,
  },
  text: { color: "white", fontSize: 16, textAlign: "center", marginTop: 32 },
});
