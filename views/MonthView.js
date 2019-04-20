import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import MonthCalendar from "../components/MonthCalendar";

class MonthView extends Component {
  render() {
    return <MonthCalendar />;
  }
}
export default MonthView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
