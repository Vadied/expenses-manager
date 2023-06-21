import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../../constants/styles";

const FlatButton = ({ children, onPress, style }) => {
  return (
    <View style={style}>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={onPress}
      >
        <View>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default FlatButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
    color: colors.primary100,
  },
});
