import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height - 120; //full height

export default class Navbar extends Component {
  render() {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#FF4500" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 999,
    backgroundColor: "rgba(255,255,255,0.3)",
    width,
    height
  }
});
