import React from "react";

import { Modal, View, StyleSheet, Alert } from "react-native";
import { TextInput, IconButton, useTheme } from "react-native-paper";
import * as Animatable from "react-native-animatable";

export const ModalView = ({
  modalVisible,
  txt,
  setTxt,
  setModalVisible,
  setTodoToBeEdited,
  addTodo,
  handleEditTodo,
  todoToBeEdited,
}) => {
  const { colors, sizes } = useTheme();
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View 
          style={styles.backdrop}
          onStartShouldSetResponder={() => true}
          onResponderRelease={() => {
            setModalVisible(false);
            setTxt("");
            setTodoToBeEdited(null);
          }}
        />
        <Animatable.View
          animation="slideInUp"
          duration={300}
          style={[
            styles.modalView,
            { 
              backgroundColor: colors.cardBackground || colors.primary,
              borderRadius: sizes.borderRadius || 20,
            },
          ]}
        >
          <TextInput
            style={{ 
              marginBottom: 24,
              backgroundColor: colors.appContainer + "30",
            }}
            placeholder={todoToBeEdited ? "Edit your task..." : "What needs to be done?"}
            placeholderTextColor={colors.placeholder}
            mode="outlined"
            autoCapitalize="words"
            value={txt}
            onChangeText={(txt) => setTxt(txt)}
            outlineColor={colors.secondary}
            activeOutlineColor={colors.tertiary}
            textColor={colors.listItemText}
          />
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              gap: 12,
            }}
          >
            <IconButton
              icon="close"
              iconColor={colors.danger || "#f87171"}
              size={sizes.addTodoIconSize - 16}
              style={{ 
                backgroundColor: (colors.danger || "#f87171") + "15",
                borderRadius: 12,
                flex: 1,
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
                setTxt("");
                setTodoToBeEdited(null);
              }}
            />

            <IconButton
              icon="check"
              iconColor={colors.white}
              size={sizes.addTodoIconSize - 16}
              style={{
                backgroundColor: colors.tertiary,
                borderRadius: 12,
                flex: 1,
                shadowColor: colors.tertiary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 6,
              }}
              onPress={() => {
                if (txt.trim() === "") {
                  Alert.alert("Empty Task", "Please write something!");
                } else if (!todoToBeEdited) {
                  const date = new Date().toLocaleString();
                  addTodo({
                    title: txt.trim(),
                    date: date,
                    isCompleted: false,
                    key: Date.now(),
                  });
                } else {
                  handleEditTodo({
                    title: txt.trim(),
                    date: todoToBeEdited.date,
                    key: todoToBeEdited.key,
                    isCompleted: todoToBeEdited.isCompleted,
                  });
                }
              }}
            />
          </View>
        </Animatable.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    padding: 28,
    width: "90%",
    maxWidth: 400,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
});
