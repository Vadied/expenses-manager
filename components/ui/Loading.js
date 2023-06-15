import { View, ActivityIndicator, StyleSheet } from "react-native";
import { colors } from "../../constants/styles";

const Loading = () => (
  <View style={styles.container}>
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
});
