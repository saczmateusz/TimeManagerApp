import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import WeekCalendar from "../components/WeekCalendar";

class WeekView extends Component {
  render() {
    return <WeekCalendar />;
  }
}
export default WeekView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
