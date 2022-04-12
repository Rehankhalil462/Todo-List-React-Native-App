import { View, Text, Switch } from "react-native";
import { useTheme } from "react-native-paper";

export const TodosStatusandThemeIconComponent = ({
  isEnabled,
  setIsEnabled,
  todos,
}) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 0.05,
        width: "100%",
        paddingHorizontal: 15,
        paddingVertical: 8,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {todos.length === 0 ? (
        <Text style={{ color: colors.fadeText, fontSize: 20 }}>
          No Todos Today !
        </Text>
      ) : (
        <Text style={{ color: colors.fadeText, fontSize: 20 }}>Your Tasks</Text>
      )}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ color: colors.fadeText, fontSize: 14 }}>
          Light Theme
        </Text>
        <Switch
          value={isEnabled}
          onValueChange={() => setIsEnabled(!isEnabled)}
          trackColor={{ false: "#767577", true: "#adbaeb" }}
          thumbColor={isEnabled ? "#a056c5" : "#f4f3f4"}
        />
      </View>
    </View>
  );
};
