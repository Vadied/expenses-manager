import { useLayoutEffect, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/ui/IconButton";
import { colors } from "../constants/styles";
import Button from "../components/ui/Button";
import useExpenses from "../store/expenseContenxt";

const ManageExpense = ({ route, navigation }) => {
  const { expenses, addExpense, deleteExpense, updateExpense } = useExpenses();
  const { expenseId } = route.params || {};

  const [expense, setExpense] = useState(
    () => (expenseId && expenses.find((e) => e.id === expenseId)) || null
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: !!expenseId ? "Edit Expense" : "Add Expenses",
    });
  }, [navigation, expenseId]);

  const handleDelete = () => {
    deleteExpense(expenseId);
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleConfirm = () => {
    if (!expense) return navigation.goBack();

    if (!!expenseId) updateExpense(expense);
    else addExpense(expense);

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={handleCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={handleConfirm}>
          {!!expenseId ? "Update" : "Add"}
        </Button>
      </View>
      {!!expenseId && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={colors.error500}
            size={36}
            onPress={handleDelete}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.primary500 },
  buttons: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: { minWidth: 120, marginHorizontal: 8 },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: colors.primary200,
    alignItems: "center",
  },
});
