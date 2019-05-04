import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AddButton from "./AddButton";

class WeekCalendar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <AddButton navigation={this.props.navigation} />
      </View>
    );
  }
}
export default WeekCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 10
  },
  scroll: {
    flexDirection: "column"
  },
  dayTile: {
    backgroundColor: "orange",
    borderRadius: 3,
    margin: 5
  },
  dayHeader: {
    color: "white",
    fontSize: 20,
    fontFamily: "Roboto-Bold"
  },
  taskTile: {
    backgroundColor: "#555555",
    flex: 1,
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3
  },
  taskText: {
    color: "white",
    fontSize: 15
  }
});
