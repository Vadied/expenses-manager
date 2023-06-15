import { View, Text, TextInput, StyleSheet } from "react-native";
import { colors } from "../../constants/styles";

const Input = ({ label, options, style = {}, error, errorMessage }) => {
  const { multiline } = options;

  const inputStyle = multiline
    ? [styles.input, styles.multiline]
    : styles.input;
  return (
    <View style={[styles.container, style]}>
      <Text style={error ? [styles.label, styles.errorLabel] : styles.label}>
        {label}
      </Text>
      <TextInput
        style={error ? [inputStyle, styles.errorInput] : inputStyle}
        {...options}
      />
      {error && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: { fontSize: 12, color: colors.primary100, marginBottom: 4 },
  input: {
    backgroundColor: colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: colors.primary700,
  },
  multiline: { minHeight: 100, textAlignVertical: "top" },
  error: {
    fontSize: 12,
    textAlign: "center",
    color: colors.error500,
    margin: 8,
  },
  errorLabel: { color: colors.error500 },
  errorInput: { backgroundColor: colors.error50 },
});
