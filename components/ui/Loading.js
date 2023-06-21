import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { colors } from "../../constants/styles";

const Loading = ({ message }) => (
  <View style={styles.container}>
    <Text style={styles.message}>{message}</Text>
    <ActivityIndicator size="large" color="white" />
  </View>
);

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: colors.primary700,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
  },
});
