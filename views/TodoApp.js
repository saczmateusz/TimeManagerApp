import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import AddTodo from "../containers/AddTodo";

class TodoApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Kryha Szura znowu czwura{"\n"}</Text>
        </View>
        <AddTodo />
      </View>
    );
  }
}
export default TodoApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#222222",
    paddingTop: 40
  },
  header: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 20
  }
});
