import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import WeekCalendar from "../components/WeekCalendar";
import Navbar from "../components/Navbar";

class WeekView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.banner}>
          <View style={{ flex: 5, alignItems: "center" }}>
            <Text style={styles.header}>Terminarz</Text>
          </View>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <View
              style={{
                height: 50,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Icon name="md-person" size={30} style={{ color: "white" }} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 7 }}>
          <WeekCalendar navigation={this.props.navigation} />
        </View>
        <Navbar navigation={this.props.navigation} current={"Week"} />
      </View>
    );
  }
}
export default WeekView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#2a2a2a"
  },
  banner: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1a1a1a"
  },
  header: {
    color: "white",
    fontSize: 20,
  }
});
