import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class DayCalendar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>DayCalendar</Text>
      </View>
    );
  }
}
export default DayCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
