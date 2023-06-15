import { View, Text, StyleSheet } from "react-native";

import { colors } from "../../constants/styles";
import useExpenses from "../../store/expenseContenxt";

import Button from "./Button";

const ErrorOverlay = ({ message }) => {
  const { clearError } = useExpenses();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={clearError}>Okay</Button>
    </View>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: colors.primary700,
  },
  text: { color: "white", textAlign: "center", marginBottom: 8 },
  title: { fontSize: 20, fontWeight: "bold" },
});
