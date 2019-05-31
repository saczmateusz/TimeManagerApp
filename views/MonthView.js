import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MonthCalendar from "../components/MonthCalendar";
import Navbar from "../components/Navbar";

class MonthView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.banner}>
          <View style={{ flex: 5, alignItems: "center" }}>
            <Text style={styles.header}>Terminarz</Text>
          </View>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => this.props.navigation.navigate("User")}
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
        <View
          style={{
            flex: 7
          }}
        >
          <MonthCalendar navigation={this.props.navigation} />
        </View>
        <Navbar navigation={this.props.navigation} current={"Month"} />
      </View>
    );
  }
}
export default MonthView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f5f5f6"
  },
  banner: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ff9800"
  },
  header: {
    color: "white",
    fontSize: 25,
    paddingLeft: 55
  }
});
