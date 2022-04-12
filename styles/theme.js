import { DefaultTheme } from "react-native-paper";

export const lightTheme = {
  ...DefaultTheme,

  colors: {
    appContainer: "#3450a1",
    primary: "#041955",
    secondary: "#183588",
    tertiary: "#ce08aa",
    iconsBackground: "#94b4fc",
    white: "#fff",
    fadeText: "#6986d4",
    text: "#3450a1",
    placeholder: "#3450a1",
    background: "#fff",
    notification: null,
    onSurface: null,
    surface: null,
    error: null,
  },
  sizes: {
    headerText: 80,
    addTodoIcon: 45,
    todosStatus: 20,
    todosText: 20,
    listItemIcons: 30,
    listItemDate: 15,
    headerIcon: 50,
    lastTodoStatusText: 12,
  },
  fontWeights: {
    regular: "400",
    medium: "500",
    bold: "700",
    italic: "italic",
  },
};

export const darkTheme = {
  ...DefaultTheme,

  colors: {
    appContainer: "#3450a1",
    primary: "#041955",
    secondary: "#183588",
    tertiary: "#ce08aa",
    iconsBackground: "#94b4fc",
    white: "#fff",
    fadeText: "#6986d4",
    text: "#3450a1",
    placeholder: "#3450a1",
    background: "#fff",
    notification: null,
    onSurface: null,
    surface: null,
    error: null,
  },
  sizes: {
    headerText: 40,
    addTodoIconSize: 45,
    todosStatus: 20,
    todosText: 20,
    listItemIcons: 30,
    listItemDate: 15,
    headerIcon: 50,
    lastTodoStatusText: 12,
  },
  fontWeights: {
    regular: "400",
    medium: "500",
    bold: "700",
    italic: "italic",
  },
};
