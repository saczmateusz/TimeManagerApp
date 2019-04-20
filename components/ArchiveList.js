import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ArchiveList = (todos, toggleTodo) => (
  <View>
    {todos.map(todo => (
      <TouchableOpacity>
        {" "}
        key={todo.id} on Press={() => toggleTodo(todo.id)}
        <Text
          style={{
            fontSize: 24,
            textDecorationLine: todo.completed ? "line-through" : "none"
          }}
        >
          {todo.text}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);
export default ArchiveList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
