import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";

class DayCalendar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: "white" }}>Temporary</Text>
      </View>
    );
  }
}
export default DayCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1a1a1a"
  }
});
