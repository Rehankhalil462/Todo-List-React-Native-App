import React from "react";
import { View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";

export const AddToDoButton = ({ setModalVisible, modalVisible }) => {
  const { colors, sizes } = useTheme();
  return (
    <View style={{ position: "absolute", bottom: 0 }}>
      <IconButton
        style={{ marginBottom: 15, backgroundColor: colors.tertiary }}
        icon="plus"
        color={colors.white}
        size={sizes.addTodoIconSize}
        onPress={() => setModalVisible(!modalVisible)}
      />
    </View>
  );
};
