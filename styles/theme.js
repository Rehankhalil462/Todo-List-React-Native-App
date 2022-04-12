import { DefaultTheme } from "react-native-paper";

export const darkTheme = {
  ...DefaultTheme,

  colors: {
    appContainer: "#3450a1",
    primary: "#041955",
    secondary: "#94b4fc",
    tertiary: "#ce08aa",
    white: "#fff",
    headerText: "#fff",
    fadeText: "#6986d4",
    listItemText: "#94b4fc",

    notification: null,
    onSurface: null,
    surface: null,
    error: null,
    text: "#3450a1",
    placeholder: "#3450a1",
    background: "#fff",
  },
  sizes: {
    headerText: 50,
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

export const lightTheme = {
  ...DefaultTheme,

  colors: {
    appContainer: "#f4f6fd",
    primary: "#fff",
    secondary: "#adbaeb",
    tertiary: "#a056c5",
    white: "#fff",
    headerText: "#020417",
    listItemText: "#373b5e",

    fadeText: "#6986d4",
    notification: null,
    onSurface: null,
    surface: null,
    error: null,
    text: "#313e65",
    placeholder: "#3450a1",
    background: "#f4f6fd",
  },
  sizes: {
    headerText: 50,
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
