import React from "react";

import { Modal, View, StyleSheet, Alert } from "react-native";
import { TextInput, IconButton, useTheme } from "react-native-paper";

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
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View
          style={[
            styles.modalView,
            { backgroundColor: colors.primary, shadowColor: colors.white },
          ]}
        >
          <TextInput
            style={{ marginBottom: 25 }}
            placeholder="Please write something !"
            mode="outlined"
            autoCapitalize="words"
            value={txt}
            onChangeText={(txt) => setTxt(txt)}
          />
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-evenly",
              flexDirection: "row",
            }}
          >
            <IconButton
              icon="keyboard-backspace"
              color={colors.white}
              size={sizes.addTodoIconSize}
              style={{ backgroundColor: colors.tertiary }}
              onPress={() => {
                setModalVisible(!modalVisible);
                setTxt("");
                setTodoToBeEdited(null);
              }}
            />

            <IconButton
              icon="check"
              color={colors.secondary}
              size={sizes.addTodoIconSize}
              style={{
                backgroundColor: colors.appContainer,
                marginBottom: 15,
              }}
              onPress={() => {
                if (txt === "") {
                  Alert.alert(null, "Please Write Something !");
                } else if (!todoToBeEdited) {
                  const date = new Date().toLocaleString();
                  const formattedDate = `${date.split(" ")[0]}  ${
                    date.split(" ")[2]
                  }-${date.split(" ")[1]}-${date.split(" ")[4]}  ${
                    date.split(" ")[3]
                  }`;
                  addTodo({
                    title: txt,
                    date: formattedDate,
                    isCompleted: false,
                    key: Date.now(),
                  });
                } else {
                  handleEditTodo({
                    title: txt,
                    date: todoToBeEdited.date,
                    key: todoToBeEdited.key,
                    isCompleted: todoToBeEdited.isCompleted,
                  });
                }
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    marginTop: 22,
    flex: 1,
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
