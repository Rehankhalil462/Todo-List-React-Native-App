import React from "react";
import { View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const AddToDoButton = ({ setModalVisible, modalVisible }) => {
  const { colors, sizes } = useTheme();
  const insets = useSafeAreaInsets();
  
  return (
    <View 
      style={{ 
        bottom: 0, 
        position: "absolute",
        right: 0,
        left: 0,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: Math.max(insets.bottom, 20),
        paddingTop: 12,
      }}
    >
      <IconButton
        icon="plus"
        iconColor={colors.white}
        size={sizes.addTodoIconSize}
        style={{ 
          backgroundColor: colors.tertiary,
          borderRadius: sizes.addTodoIconSize / 2,
          shadowColor: colors.tertiary,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.4,
          shadowRadius: 12,
          elevation: 8,
        }}
        onPress={() => setModalVisible(!modalVisible)}
      />
    </View>
  );
};
