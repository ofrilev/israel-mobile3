import React from "react";
import { Text, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type PlaceContainerProps = {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
};

const PlaceContainer: React.FC<PlaceContainerProps> = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={[styles.shadow, style]}>
      <LinearGradient
        colors={["#66CCFF", "#33AADD"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadow: {
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6, // Android shadow
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#E0F7FF",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.15)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2,
  },
});

export default PlaceContainer;
