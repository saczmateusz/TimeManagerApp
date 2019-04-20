import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import DayCalendar from "../components/DayCalendar";

class DayView extends Component {
  render() {
    return <DayCalendar />;
  }
}
export default DayView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
