import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Swiper from "react-native-swiper";

class DayCalendar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 6 }}>
          <Text style={{ color: "white" }}>Tymczasowy widok dnia</Text>
        </View>
        <View
          style={{
            flex: 1,
            marginLeft: 285,
            marginBottom: 20
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 60,
              height: 60,
              backgroundColor: "orange",
              borderRadius: 50
            }}
            onPress={() => this.props.navigation.navigate("AddTask")}
          >
            <Icon name={"md-add"} size={30} color="white" />
          </TouchableOpacity>
        </View>
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
