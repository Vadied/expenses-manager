import { Text, View, StyleSheet } from "react-native";

import { colors } from "../../constants/styles";
import { getFormattedCurrency } from "../../util/currency";

const ExpensesSummary = ({ expenses, period }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{period}</Text>
      <Text style={styles.total}>
        {getFormattedCurrency(
          expenses.reduce((sum, exp) => sum + exp.amount, 0)
        )}
      </Text>
    </View>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alingItems: "center",
  },
  period: {
    fontSize: 12,
    color: colors.primary400,
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary500,
  },
});
