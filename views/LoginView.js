import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import LoginForm from "../containers/LoginForm";

export default class LoginView extends Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View style={styles.banner}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => this.props.navigation.navigate("Month")}
          >
            <View
              style={{
                height: 50,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Icon name="md-arrow-back" size={30} style={{ color: "white" }} />
            </View>
          </TouchableOpacity>
          <View style={{ flex: 5, alignItems: "center" }}>
            <Text style={styles.header}>Logowanie</Text>
          </View>
        </View>
        <View style={{ flex: 8, backgroundColor: "#2a2a2a" }}>
          <LoginForm navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

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
    paddingRight: 55,
    fontFamily: "avenir-heavy"
  }
});
