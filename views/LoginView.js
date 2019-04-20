import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import LoginForm from "../containers/LoginForm";

class LoginView extends Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View style={styles.banner}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => navigate("App")}>
            <View
              style={{
                height: 50,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Ionicons
                name="md-arrow-round-back"
                size={30}
                style={{ color: "white" }}
              />
            </View>
          </TouchableOpacity>
          <View style={{ flex: 5, alignItems: "center" }}>
            <Text style={styles.header}>Logowanie</Text>
          </View>
        </View>
        <View style={{ flex: 8, backgroundColor: "#2a2a2a" }}>
          <LoginForm />
        </View>
      </View>
    );
  }
}
export default LoginView;

const styles = StyleSheet.create({
  banner: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 20,
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
