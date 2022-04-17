import React from "react";
import { Text, StyleSheet, FlatList, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import * as Animatable from "react-native-animatable";

export const ListItems = ({
  todos,
  deleteTodo,
  markComplete,
  markIncomplete,
  handleTriggerEdit,
}) => {
  const { colors, sizes } = useTheme();

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={todos}
      style={styles.FlatListContainer}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <Animatable.View
          key={index}
          animation="fadeInRightBig"
          delay={index * 250}
        >
          <View
            style={[
              styles.listItemContainer,
              { backgroundColor: colors.primary },
            ]}
          >
            <View style={styles.statusandtextanddeleteandupdatecontainer}>
              <View style={styles.statusandtextContainer}>
                {item.isCompleted && (
                  <IconButton
                    icon="check"
                    size={sizes.listItemIcons}
                    color={colors.white}
                    onPress={() => markIncomplete(item.key)}
                    style={{
                      margin: 0,
                      width: null,
                      height: null,

                      backgroundColor: colors.secondary,
                    }}
                  />
                )}
                {item.isCompleted === false && (
                  <IconButton
                    icon="checkbox-blank-circle-outline"
                    size={sizes.listItemIcons}
                    color={colors.tertiary}
                    onPress={() => markComplete(item.key)}
                    style={{
                      margin: 0,
                      width: null,
                      height: null,
                    }}
                  />
                )}

                <Text
                  style={[
                    styles.todoText,
                    {
                      textDecorationLine: item.isCompleted
                        ? "line-through"
                        : null,
                      textDecorationStyle: item.isCompleted ? "solid" : null,
                      color: colors.listItemText,
                      fontSize: sizes.todosText,
                    },
                  ]}
                >
                  {item.title}
                </Text>
              </View>
              <View>
                <IconButton
                  icon="square-edit-outline"
                  size={sizes.listItemIcons}
                  color={colors.secondary}
                  style={{
                    marginBottom: 5,
                    marginHorizontal: 0,
                    marginTop: 0,
                    width: null,
                    height: null,
                  }}
                  onPress={() => handleTriggerEdit(item)}
                />
                <IconButton
                  icon="delete"
                  size={sizes.listItemIcons}
                  color={colors.secondary}
                  style={{ margin: 0, width: null, height: null }}
                  onPress={() => {
                    deleteTodo(item.key);
                  }}
                />
              </View>
            </View>
            <View style={{ alignItems: "flex-start", marginTop: 5 }}>
              <Text
                style={{
                  color: colors.secondary,
                  fontFamily: "RobotoSlab_400Regular",
                  letterSpacing: 1,
                  fontSize: sizes.listItemDate,
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
    flex: 0.82,
    width: "100%",
  },
  listItemContainer: {
    marginHorizontal: 25,
    marginVertical: 7,
    padding: 20,
    borderRadius: 10,
  },
  statusandtextanddeleteandupdatecontainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statusandtextContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  todoText: {
    letterSpacing: 2,
    marginLeft: 7,
    paddingRight: 15,
    flex: 1,
    fontFamily: "RobotoSlab_400Regular",
  },
});
