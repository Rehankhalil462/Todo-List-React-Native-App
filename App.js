import React, { useState, useEffect, useRef } from "react";
import { HomeScreen } from "./components/HomeScreen";
import { darkTheme, lightTheme } from "./styles/theme";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  RobotoSlab_400Regular,
  useFonts as useRobotSlab,
  RobotoSlab_700Bold,
} from "@expo-google-fonts/roboto-slab";

export default function App() {
  const [robotoSlabLoaded] = useRobotSlab({
    RobotoSlab_400Regular,
    RobotoSlab_700Bold,
  });

  const [isEnabled, setIsEnabled] = useState(false);

  const saveThemeOption = async () => {
    try {
      await AsyncStorage.setItem(
        "lighttheme",
        JSON.stringify(isEnabled.toString())
      );
    } catch (err) {
      console.log(err);
    }
  };

  const loadThemeOption = async () => {
    try {
      const boolstring = await AsyncStorage.getItem("lighttheme");
      if (boolstring) {
        const bool = JSON.parse(boolstring.toLowerCase()) === "true";
        setIsEnabled(bool);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
      if (didMount.current) func();
      else didMount.current = true;
    }, deps);
  };
  useDidMountEffect(() => {
    saveThemeOption();
    // react please run me if 'isEnabled' change, but not on initial render
  }, [isEnabled]);

  useEffect(() => {
    loadThemeOption();
  }, []);

  if (!robotoSlabLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <PaperProvider theme={isEnabled ? lightTheme : darkTheme}>
        <HomeScreen setIsEnabled={setIsEnabled} isEnabled={isEnabled} />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
