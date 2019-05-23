import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import LoginForm from "../containers/LoginForm";

class LoginView extends Component {
  isSignedIn = () => {
    if (store.getState().user.email) {
      this.props.navigation.navigate("Day");
    } else alert("Zaloguj się");
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View style={styles.banner}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={styles.header}>Logowanie</Text>
          </View>
        </View>
        <View style={{ flex: 8, backgroundColor: "#f5f5f6" }}>
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
    backgroundColor: "#ff9800"
  },
  header: {
    color: "white",
    fontSize: 25
  }
});

export default LoginView;
