import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class MonthCalendar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          MonthCalendar - widok nie jest ukończony
        </Text>
      </View>
    );
  }
}
export default MonthCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2a2a2a"
  },
  text: {
    color: "white"
  }
});
