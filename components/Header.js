import React from "react";
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Alert,
  ToastAndroid,
} from "react-native";
import { IconButton, useTheme } from "react-native-paper";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const Header = ({
  todos,
  setTodos,
  isClicked,
  setIsClicked,
  isTodosListHistoryStatusActivated,
  setIsTodosListHistoryStatusActivated,
}) => {
  const { colors, sizes, fontWeights } = useTheme();

  const NBText = "( NOTE : Click 'No' To Revert Your Decision From 'Yes' )";

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.LONG, ToastAndroid.CENTER);
  };
  const deleteAllTodosHandler = () => {
    if (todos.length !== 0) {
      Alert.alert(
        "Confirmation",
        "Are You Sure You Want To Delete All Todos List?",
        [
          {
            text: "NO",
            onPress: null,
            style: "cancel",
          },
          {
            text: "YES",
            onPress: () => {
              if (isTodosListHistoryStatusActivated === "true") {
                setIsClicked("false");
                saveLastTodosList();
                setTodos([]);
                showToast("Todos Are Deleted Successfully !");
              } else {
                setTodos([]);

                showToast("Todos Are Deleted Successfully !");
              }
            },
          },
        ]
      );
    } else {
      Alert.alert(
        null,

        "Nothing Is In The Todos List To Delete !"
      );
    }
  };

  const restoreTodosHandler = () => {
    if (todos.length === 0) {
      Alert.alert(
        "Confirmation",
        "Are You Sure You Want To Restore Last Deleted List Of Todos?",
        [
          {
            text: "NO",
            onPress: null,
            style: "cancel",
          },
          {
            text: "YES",
            onPress: () => {
              loadlastTodosList();
              setIsClicked("true");
            },
          },
        ]
      );
    }

    if (todos.length !== 0) {
      Alert.alert(
        "Confirmation",
        `Are You Sure You Want To Restore Last Deleted List Of Todos?
        
( Note : Pressing 'Yes' Will Merge Your 'Recent Todos' With Last 'Deleted Todos' )`,
        [
          {
            text: "NO",
            onPress: null,
            style: "cancel",
          },
          {
            text: "YES",
            onPress: () => {
              loadlastTodosList();
              setIsClicked("true");
            },
          },
        ]
      );
    }
  };

  const settingsHandler = () => {
    Alert.alert(
      "Confirmation",
      `If You Want To Save Last Deleted 'Todos List' Data, Then Click 'YES'. Otherwise Click 'NO'.But it will just save list of those todos that will be deleted by trash icon in the 'Top Right Corner'.

${NBText.toUpperCase()}`,
      [
        {
          text: "NO",
          onPress: () => {
            showToast("Last Todos Deletion Saver Is Turned OFF ");

            setIsTodosListHistoryStatusActivated("false");
          },
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => {
            showToast("Last Todos Deletion Saver Is Turned On ");
            setIsTodosListHistoryStatusActivated("true");
          },
        },
      ]
    );
  };

  const saveLastTodosList = async () => {
    try {
      await AsyncStorage.setItem("lastTodosList", JSON.stringify(todos));
    } catch (err) {
      console.log(err);
    }
  };
  const loadlastTodosList = async () => {
    try {
      const lasttodosListHistory = await AsyncStorage.getItem("lastTodosList");
      if (JSON.parse(lasttodosListHistory).length !== 0 && todos.length !== 0) {
        const lastData = JSON.parse(lasttodosListHistory);
        const MergedData = [...todos, ...lastData];
        setTodos(MergedData);
        showToast("Last Deleted Todos Are Merged With Recent Todos");
      } else {
        setTodos(JSON.parse(lasttodosListHistory));
        showToast("Todos Data Is Restored From Last Deletion !");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View
      style={{
        flex: 0.13,
        marginTop: StatusBar.currentHeight ? StatusBar.currentHeight : null,

        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        width: "100%",
        backgroundColor: colors.primary,
      }}
    >
      <Text
        style={{
          color: colors.headerText,
          fontSize: sizes.headerText,
          fontWeight: fontWeights.bold,
          fontStyle: fontWeights.italic,
          letterSpacing: 2,
        }}
      >
        Todos
      </Text>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginBottom: 2,
            marginTop: 3,
          }}
        >
          <IconButton
            icon="cog-outline"
            size={sizes.headerIcon}
            color={colors.primary}
            style={{
              marginVertical: 0,
              marginLeft: 0,
              marginRight: 8,
              width: null,
              height: null,
              backgroundColor: colors.secondary,
            }}
            onPress={settingsHandler}
          />
          <IconButton
            icon="delete-restore"
            size={sizes.headerIcon}
            color={colors.primary}
            disabled={isClicked === "true" ? true : false}
            style={{
              marginVertical: 0,
              marginLeft: 0,
              marginRight: 8,
              width: null,
              height: null,
              backgroundColor: colors.secondary,
            }}
            onPress={restoreTodosHandler}
          />

          <IconButton
            icon="delete-forever-outline"
            size={sizes.headerIcon}
            color={colors.primary}
            style={{
              margin: 0,
              width: null,
              height: null,
              backgroundColor: colors.secondary,
            }}
            onPress={deleteAllTodosHandler}
          />
        </View>
        <Text
          style={{
            color: colors.fadeText,
            fontSize: sizes.lastTodoStatusText,
            marginBottom: 1,
          }}
        >
          Last Deleted Todos Saver :
          {isTodosListHistoryStatusActivated === "true" ? " ON" : " OFF"}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headercontainer: {},
});
