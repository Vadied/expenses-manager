import { View, Text, StyleSheet, Alert } from "react-native";
import { useState } from "react";

import Input from "./Input";
import Button from "../ui/Button";
import { isDate } from "../../util/date";
import FlatButton from "../ui/FlatButton";

const ExpenseForm = ({ onSubmit, onCancel, expense, submitLabel }) => {
  const [data, setData] = useState(expense);
  const handleChange = (field) => (value) =>
    setData((old) => ({ ...old, [field]: { value, isValid: true } }));

  const validate = () => {
    const amount = +data.amount.value;
    const date = new Date(data.date.value);
    const description = data.description.value;

    const validated = {
      ...data,
      amount: {
        ...data.amount,
        isValid: amount > 0 && !isNaN(amount),
      },
      date: {
        ...data.date,
        isValid: isDate(data.date.value),
      },
    };

    if (Object.values(validated).some(({ isValid }) => !isValid)) {
      Alert.alert("Invalid input", "Plese check your input values");
      setData(validated);
      return null;
    }

    return { amount, date, description };
  };

  const handleSubmit = () => {
    const newExpense = validate();
    if (!newExpense) return;

    onSubmit(newExpense);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.row}>
        <Input
          style={styles.input}
          label="Amount"
          error={!data.amount.isValid}
          errorMessage="Amount must be a number higher than 0"
          options={{
            keyboardType: "decimal-pad",
            onChangeText: handleChange("amount"),
            value: `${data.amount.value}`,
          }}
        />
        <Input
          style={styles.input}
          label="Date"
          error={!data.date.isValid}
          errorMessage="Date must be a valid date YYYY-MM-DD"
          options={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: handleChange("date"),
            value: data.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        options={{
          multiline: true,
          onChangeText: handleChange("description"),
          value: data.description.value,
          // autoCapitalize: "none",
          // autoCorrect: false,
        }}
      />
      <View style={styles.buttons}>
        <FlatButton style={styles.button} onPress={onCancel}>
          Cancel
        </FlatButton>
        <Button style={styles.button} onPress={handleSubmit}>
          {submitLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  container: { marginTop: 40 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  input: { flex: 1 },
  buttons: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: { minWidth: 120, marginHorizontal: 8 },
});
