import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import UserPanel from "../components/UserPanel";

class UserView extends Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View style={styles.banner}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={styles.header}>Konto</Text>
          </View>
        </View>
        <View style={{ flex: 8, backgroundColor: "#f5f5f6" }}>
          <UserPanel navigation={this.props.navigation} />
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

export default UserView;
