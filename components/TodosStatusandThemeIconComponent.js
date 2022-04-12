import { View, Text, Switch } from "react-native";

export const TodosStatusandThemeIconComponent = ({
  isEnabled,
  setIsEnabled,
  todos,
}) => {
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
        <Text style={{ color: "#6986d4", fontSize: 20 }}>No Todos Today !</Text>
      ) : (
        <Text style={{ color: "#6986d4", fontSize: 20 }}>Your Tasks</Text>
      )}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ color: "#6986d4", fontSize: 14 }}>Light Theme</Text>
        <Switch
          value={isEnabled}
          onValueChange={() => setIsEnabled(!isEnabled)}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>
    </View>
  );
};
