import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class WeekCalendar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>WeekCalendar</Text>
      </View>
    );
  }
}
export default WeekCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
