import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MonthCalendar from "../components/MonthCalendar";

class MonthView extends Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
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
        <View style={{ flex: 8, backgroundColor: "#2a2a2a" }}>
          <MonthCalendar navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}
export default MonthView;

const styles = StyleSheet.create({
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
    paddingLeft: 55,
    fontFamily: "avenir-heavy"
  }
});
