import React from "react";
import { Text, View, StatusBar, Alert, ToastAndroid } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const insets = useSafeAreaInsets();

  const NBText = "( NOTE : Click 'No' To Revert Your Decision From 'Yes' )";

  const showToast = (message) => {
    ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.CENTER);
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
      if (lasttodosListHistory) {
        const lastData = JSON.parse(lasttodosListHistory);
        if (lastData.length !== 0 && todos.length !== 0) {
          const MergedData = [...todos, ...lastData];
          setTodos(MergedData);
          showToast("Last Deleted Todos Are Merged With Recent Todos");
        } else if (lastData.length !== 0) {
          setTodos(lastData);
          showToast("Todos Data Is Restored From Last Deletion !");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View
      style={{
        flex: 0.10,
        paddingTop: insets.top ,
        paddingBottom: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        width: "100%",
        backgroundColor: colors.primary,
        shadowColor: colors.shadowColor || "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
        borderBottomWidth: 0,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
      }}
    >
      <Text
        style={{
          color: colors.headerText,
          fontSize: sizes.headerText,
          letterSpacing: 0.5,
          fontFamily: "RobotoSlab_700Bold",
          fontWeight: "700",
        }}
      >
        My Tasks
      </Text>
      <View style={{ alignItems: "flex-end" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginBottom: 6,
            gap: 8,
          }}
        >
          <IconButton
            icon="cog-outline"
            size={sizes.headerIcon}
            iconColor={colors.secondary}
            style={{
              margin: 0,
              backgroundColor: colors.secondary + "20",
              borderRadius: 12,
            }}
            onPress={settingsHandler}
          />
          <IconButton
            icon="delete-restore"
            size={sizes.headerIcon}
            iconColor={isClicked === "true" ? colors.fadeText : colors.secondary}
            disabled={isClicked === "true"}
            style={{
              margin: 0,
              backgroundColor: isClicked === "true" ? colors.fadeText + "10" : colors.secondary + "20",
              borderRadius: 12,
              opacity: isClicked === "true" ? 0.5 : 1,
            }}
            onPress={restoreTodosHandler}
          />
          <IconButton
            icon="delete-forever-outline"
            size={sizes.headerIcon}
            iconColor={colors.danger || "#f87171"}
            style={{
              margin: 0,
              backgroundColor: (colors.danger || "#f87171") + "20",
              borderRadius: 12,
            }}
            onPress={deleteAllTodosHandler}
          />
        </View>
        <Text
          style={{
            color: colors.fadeText,
            fontSize: sizes.lastTodoStatusText,
            fontFamily: "RobotoSlab_400Regular",
            marginTop: 2,
          }}
        >
          Auto-save: {isTodosListHistoryStatusActivated === "true" ? "ON" : "OFF"}
        </Text>
      </View>
    </View>
  );
};
