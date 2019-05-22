import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import RegisterForm from "../containers/RegisterForm";

class RegisterView extends Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View style={styles.banner}>
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
              <Icon name="md-arrow-back" size={30} style={{ color: "white" }} />
            </View>
          </TouchableOpacity>
          <View style={{ flex: 5, alignItems: "center" }}>
            <Text style={styles.header}>Rejestracja</Text>
          </View>
        </View>
        <View style={{ flex: 8, backgroundColor: "#f5f5f6" }}>
          <RegisterForm navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}
export default RegisterView;

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
    fontSize: 25,
    paddingRight: 55
  }
});
