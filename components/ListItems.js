import React from "react";
import { Text, StyleSheet, FlatList, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import { EmptyState } from "./EmptyState";

export const ListItems = ({
  todos,
  deleteTodo,
  markComplete,
  markIncomplete,
  handleTriggerEdit,
}) => {
  const { colors, sizes } = useTheme();

  if (todos.length === 0) {
    return (
      <View style={styles.FlatListContainer}>
        <EmptyState />
      </View>
    );
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={todos}
      style={styles.FlatListContainer}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <Animatable.View
          key={index}
          animation="fadeInUpBig"
          delay={index * 250}
        >
          <View
            style={[
              styles.listItemContainer,
              { 
                backgroundColor: colors.cardBackground || colors.primary,
                borderRadius: sizes.borderRadius || 16,
                shadowColor: colors.shadowColor || "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: item.isCompleted ? 0.08 : 0.12,
                shadowRadius: 10,
                elevation: 5,
                borderLeftWidth: 4,
                borderLeftColor: item.isCompleted ? (colors.success || "#4ade80") : colors.tertiary,
                opacity: item.isCompleted ? 0.75 : 1,
                transform: [{ scale: item.isCompleted ? 0.98 : 1 }],
              },
            ]}
          >
            <View style={styles.statusandtextanddeleteandupdatecontainer}>
              <View style={styles.statusandtextContainer}>
                {item.isCompleted ? (
                  <IconButton
                    icon="check-circle"
                    size={sizes.listItemIcons}
                    iconColor={colors.white}
                    onPress={() => markIncomplete(item.key)}
                    style={{
                      margin: 0,
                      backgroundColor: colors.success || "#4ade80",
                      borderRadius: 20,
                    }}
                  />
                ) : (
                  <IconButton
                    icon="checkbox-blank-circle-outline"
                    size={sizes.listItemIcons}
                    iconColor={colors.tertiary}
                    onPress={() => markComplete(item.key)}
                    style={{
                      margin: 0,
                      borderWidth: 2,
                      borderColor: colors.tertiary,
                      borderRadius: 20,
                    }}
                  />
                )}

                <Text
                  style={[
                    styles.todoText,
                    {
                      textDecorationLine: item.isCompleted
                        ? "line-through"
                        : "none",
                      textDecorationStyle: item.isCompleted ? "solid" : "none",
                      color: item.isCompleted 
                        ? colors.fadeText 
                        : colors.listItemText,
                      fontSize: sizes.todosText,
                      fontWeight: item.isCompleted ? "400" : "500",
                    },
                  ]}
                >
                  {item.title}
                </Text>
              </View>
              <View style={{ flexDirection: "row", gap: 4 }}>
                <IconButton
                  icon="pencil-outline"
                  size={sizes.listItemIcons - 4}
                  iconColor={colors.secondary}
                  style={{
                    margin: 0,
                    backgroundColor: colors.secondary + "15",
                    borderRadius: 10,
                  }}
                  onPress={() => handleTriggerEdit(item)}
                />
                <IconButton
                  icon="delete-outline"
                  size={sizes.listItemIcons - 4}
                  iconColor={colors.danger || "#f87171"}
                  style={{ 
                    margin: 0,
                    backgroundColor: (colors.danger || "#f87171") + "15",
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    deleteTodo(item.key);
                  }}
                />
              </View>
            </View>
            <View style={{ alignItems: "flex-start", marginTop: 8 }}>
              <Text
                style={{
                  color: colors.fadeText,
                  fontFamily: "RobotoSlab_400Regular",
                  letterSpacing: 0.5,
                  fontSize: sizes.listItemDate,
                  opacity: 0.8,
                }}
              >
                {item.date}
              </Text>
            </View>
          </View>
        </Animatable.View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  FlatListContainer: {
    flex: 0.85,
    width: "100%",
    paddingHorizontal: 20,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  listItemContainer: {
    marginHorizontal: 0,
    marginVertical: 8,
    padding: 18,
  },
  statusandtextanddeleteandupdatecontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  statusandtextContainer: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    marginRight: 12,
  },
  todoText: {
    letterSpacing: 0.3,
    marginLeft: 12,
    paddingRight: 12,
    flex: 1,
    fontFamily: "RobotoSlab_400Regular",
    lineHeight: 22,
  },
});
