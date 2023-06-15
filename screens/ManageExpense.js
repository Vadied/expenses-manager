import { useLayoutEffect, useMemo } from "react";
import { View, StyleSheet } from "react-native";

import useExpenses from "../store/expenseContenxt";
import { colors } from "../constants/styles";
import { getFormattedDate } from "../util/date";

import IconButton from "../components/ui/IconButton";
import ExpenseForm from "../components/manage/ExpenseForm";
import Loading from "../components/ui/Loading";

const ManageExpense = ({ route, navigation }) => {
  const { expenses, loading, add, deleteData, update } = useExpenses();
  const { expenseId } = route.params || {};

  const expense = useMemo(() => {
    const oldExp =
      (expenseId && expenses.find((e) => e.id === expenseId)) || {};

    return {
      amount: {
        value: oldExp.amount || 0,
        isValid: true,
      },
      date: {
        value: getFormattedDate(oldExp.date || new Date()),
        isValid: true,
      },
      description: {
        value: oldExp.description || "",
        isValid: true,
      },
    };
  }, [expenseId, expenses]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: !!expenseId ? "Edit Expense" : "Add Expenses",
    });
  }, [navigation, expenseId]);

  const handleDelete = () => {
    deleteData(expenseId);
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleSubmit = async (newExpense) => {
    if (!!expenseId) await update(id, { ...newExpense });
    else await add(newExpense);

    navigation.goBack();
  };

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <ExpenseForm
        expense={expense}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        submitLabel={!!expenseId ? "Update" : "Add"}
      />

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
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: colors.primary200,
    alignItems: "center",
  },
});
