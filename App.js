import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Alert,
  Modal,
  BackHandler,
  ToastAndroid,
  Switch,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Header } from "./components/Header";
import { ListItems } from "./components/ListItems";
import { IconButton, TextInput, useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { darkTheme, lightTheme } from "./styles/theme";
import { Provider as PaperProvider } from "react-native-paper";
import { AddToDoButton } from "./components/AddToDoIcon";
import { ModalView } from "./components/ModalView";
import { TodosStatusandThemeIconComponent } from "./components/TodosStatusandThemeIconComponent";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [isClicked, setIsClicked] = useState("true");
  const [
    isTodosListHistoryStatusActivated,
    setIsTodosListHistoryStatusActivated,
  ] = useState("false");

  const [isEnabled, setIsEnabled] = useState(false);
  const [first, setfirst] = useState(second);

  const [modalVisible, setModalVisible] = useState(false);
  const [txt, setTxt] = useState("");
  const [todoToBeEdited, setTodoToBeEdited] = useState(null);

  const addTodo = (todo) => {
    const updatedTodos = [...todos, todo];
    setTodos(updatedTodos);
    setModalVisible(!modalVisible);
    setTxt("");
  };

  const deleteTodo = (key) => {
    const filteredTodos = todos.filter((item) => item.key !== key);
    setTodos(filteredTodos);
  };

  const handleTriggerEdit = (todo) => {
    setTodoToBeEdited(todo);
    setModalVisible(!modalVisible);
    setTxt(todo.title);
  };

  const handleEditTodo = (editedTodo) => {
    const updatedTodos = todos.map((el) =>
      el.key === editedTodo.key ? editedTodo : el
    );
    setTodos(updatedTodos);
    setTodoToBeEdited(null);
    setTxt("");
    setModalVisible(!modalVisible);
  };

  const markComplete = (key) => {
    const filteredTodos = todos.map((el) =>
      el.key === key ? { ...el, isCompleted: true } : el
    );
    setTodos(filteredTodos);
  };

  const markIncomplete = (key) => {
    const filteredTodos = todos.map((el) =>
      el.key === key ? { ...el, isCompleted: false } : el
    );
    setTodos(filteredTodos);
  };

  const closeAppAction = () => {
    Alert.alert("Hold on !", "Are you sure you want to close this app?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "YES",
        onPress: () => BackHandler.exitApp(),
      },
    ]);
    return true;
  };

  const saveTodosList = async () => {
    try {
      await AsyncStorage.setItem(
        "isTodosListHistoryStatusActivated",
        isTodosListHistoryStatusActivated
      );

      await AsyncStorage.setItem("isClicked", isClicked);
      const jsonList = await JSON.stringify(todos);

      await AsyncStorage.setItem("todosList", jsonList);
    } catch (err) {
      console.log(err);
    }
  };
  const loadTodosList = async () => {
    try {
      const lastIsTodosListHistoryStatusActivated = await AsyncStorage.getItem(
        "isTodosListHistoryStatusActivated"
      );
      if (lastIsTodosListHistoryStatusActivated !== null) {
        setIsTodosListHistoryStatusActivated(
          lastIsTodosListHistoryStatusActivated
        );
      }
      const lastisClickedStatus = await AsyncStorage.getItem("isClicked");
      if (lastisClickedStatus !== null) {
        setIsClicked(lastisClickedStatus);
      }
      const todosListHistory = await AsyncStorage.getItem("todosList");

      if (todosListHistory && JSON.parse(todosListHistory).length !== 0) {
        setTodos(JSON.parse(todosListHistory));
        ToastAndroid.show(
          "Last Data Is Restored",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
      }
      if (JSON.parse(todosListHistory).length === 0) {
        setIsClicked(lastisClickedStatus);
        setIsTodosListHistoryStatusActivated(
          lastIsTodosListHistoryStatusActivated
        );
        ToastAndroid.show("Welcome !", ToastAndroid.LONG, ToastAndroid.CENTER);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", closeAppAction);

    loadTodosList();
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", closeAppAction);
  }, []);

  const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
      if (didMount.current) func();
      else didMount.current = true;
    }, deps);
  };

  useDidMountEffect(() => {
    saveTodosList();
    // react please run me if 'todos or istodosstatusactivated' change, but not on initial render
  }, [todos, isTodosListHistoryStatusActivated]);

  return (
    <PaperProvider theme={isEnabled ? lightTheme : darkTheme}>
      <SafeAreaView style={styles.container}>
        {modalVisible ? (
          <ModalView
            txt={txt}
            setTxt={setTxt}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            addTodo={addTodo}
            handleEditTodo={handleEditTodo}
            setTodoToBeEdited={setTodoToBeEdited}
            todoToBeEdited={todoToBeEdited}
          />
        ) : (
          <>
            <Header
              setTodos={setTodos}
              todos={todos}
              isClicked={isClicked}
              setIsClicked={setIsClicked}
              isTodosListHistoryStatusActivated={
                isTodosListHistoryStatusActivated
              }
              setIsTodosListHistoryStatusActivated={
                setIsTodosListHistoryStatusActivated
              }
            />

            <TodosStatusandThemeIconComponent
              isEnabled={isEnabled}
              setIsEnabled={setIsEnabled}
              todos={todos}
            />

            <ListItems
              todos={todos}
              deleteTodo={deleteTodo}
              markComplete={markComplete}
              markIncomplete={markIncomplete}
              handleTriggerEdit={handleTriggerEdit}
            />
            <AddToDoButton
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          </>
        )}
        <StatusBar style="light" />
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.colors.appContainer,
    alignItems: "center",
    justifyContent: "center",
  },
});
