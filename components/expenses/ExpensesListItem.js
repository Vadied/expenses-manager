import { Pressable, Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { colors } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { getFormattedCurrency } from "../../util/currency";

const ExpensesListItem = ({ id, description, date, amount }) => {
  const navigation = useNavigation();
  const handlePress = () =>
    navigation.navigate("ManageExpense", { expenseId: id });
  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.container}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{getFormattedCurrency(amount)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpensesListItem;

const styles = StyleSheet.create({
  pressed: { opacity: 0.75 },
  container: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: colors.primary50,
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 6,
    elevation: 3,
    shadowColor: colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
  },
  textBase: { color: colors.primary500 },
  description: { fontSize: 16, marginBottom: 4, fontWeight: "bold" },
  amountContainer: {
    paddingHorizontal: 12,
    paddinVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  amount: { color: colors.primary500, fontWeight: "bold" },
});
