import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default class AddButton extends Component {
  render() {
    return (
      <View style={styles.addTaskView}>
        <TouchableOpacity
          style={styles.addTaskTouch}
          onPress={() => this.props.navigation.navigate("AddTask")}
        >
          <Icon name={"md-add"} size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addTaskView: {
    position: "absolute",
    right: 10,
    bottom: 10
  },
  addTaskTouch: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    backgroundColor: "#ff8833",
    borderRadius: 50
  }
});
