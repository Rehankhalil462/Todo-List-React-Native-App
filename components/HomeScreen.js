export const HomeScreen = ({}) => {
  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.colors.appContainer,
    alignItems: "center",
    justifyContent: "center",
  },
});
