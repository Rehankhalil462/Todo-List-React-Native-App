import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import * as Animatable from "react-native-animatable";

export const EmptyState = () => {
  const { colors, sizes } = useTheme();

  return (
    <Animatable.View
      animation="fadeIn"
      duration={800}
      style={styles.container}
    >
      <View style={styles.iconContainer}>
        <Text style={[styles.icon, { color: colors.fadeText }]}>✓</Text>
      </View>
      <Text style={[styles.title, { color: colors.listItemText }]}>
        All caught up!
      </Text>
      <Text style={[styles.subtitle, { color: colors.fadeText }]}>
        Tap the + button to add a new task
      </Text>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(108, 124, 231, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  icon: {
    fontSize: 40,
    fontWeight: "300",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: "RobotoSlab_700Bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "RobotoSlab_400Regular",
    textAlign: "center",
    lineHeight: 20,
  },
});

