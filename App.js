import React, { useState } from "react";
import { HomeScreen } from "./components/HomeScreen";
import { darkTheme, lightTheme } from "./styles/theme";
import { Provider as PaperProvider } from "react-native-paper";
export default function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <PaperProvider theme={isEnabled ? lightTheme : darkTheme}>
      <HomeScreen setIsEnabled={setIsEnabled} isEnabled={isEnabled} />
    </PaperProvider>
  );
}
