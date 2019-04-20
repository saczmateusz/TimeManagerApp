import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import './config/axios';
import { Provider } from "react-redux";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import store from "./store";

import LoginForm from "./containers/LoginForm";
import RegisterForm from "./containers/RegisterForm";
import MonthView from "./views/MonthView";

export default class App extends Component{
  render() {
    return (
      <Provider store={store}>
          <AppContainer />
      </Provider>
    );
  }
}
class LoginScreen extends Component {
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
          <LoginForm />
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

class MonthScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <MonthView />
        </View>
        <View style={styles.container}>
          <Button
            title="wróc do logowania"
            onPress={() => this.props.navigation.navigate("Login")}
          />
        </View>
      </View>
    );
  }
}

class RegisterScreen extends Component {
  /*componentDidMount() {
    if(store.getState().user.email) {
      this.props.navigation.navigate("Month")
    }
  }*/
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
              <Icon
                name="md-arrow-back"
                size={30}
                style={{ color: "white" }}
              />
            </View>
          </TouchableOpacity>
          <View style={{ flex: 5, alignItems: "center" }}>
            <Text style={styles.header}>Rejestracja</Text>
          </View>
        </View>
        <View style={{ flex: 8, backgroundColor: "#2a2a2a" }}>
          <RegisterForm navigation={this.props.navigation}/>
        </View>
      </View>
    );
  }
}

const AppSwitchNavigator = createSwitchNavigator({
  Login: { screen: LoginScreen },
  Month: { screen: MonthScreen },
  Register: { screen: RegisterScreen }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

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
  }
});
