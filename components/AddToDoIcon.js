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
        alignItems:"center",
        justifyContent:"center",
        paddingBottom: Math.max(insets.bottom, 15),
        paddingRight: 15,
      }}
    >
      <IconButton
        style={{ backgroundColor: colors.tertiary }}
        icon="plus"
        color={colors.white}
        size={sizes.addTodoIconSize}
        onPress={() => setModalVisible(!modalVisible)}
      />
    </View>
  );
};
