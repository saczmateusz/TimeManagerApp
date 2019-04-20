import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

export default class App extends Component{
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
              <Icon
                name="md-arrow-back"
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
          
          <View style={{ paddingHorizontal: 10, flexDirection: "column" }}>
            <Text style={{ color: "white", textAlign: "center", marginBottom: 10 }}>LUB</Text>
            <Button
              title="Zarejestruj się"
              color="#ff8833"
              onPress={() => this.props.navigation.navigate("Register")}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2a2a2a"
  },
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
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
