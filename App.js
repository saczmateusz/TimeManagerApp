import React, { Component } from "react";
import "./config/axios";
import { Provider } from "react-redux";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import store from "./store";

import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import MonthCalendar from "./components/MonthCalendar";

export default class App extends Component {
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
    return <LoginView navigation={this.props.navigation} />;
  }
}

class MonthScreen extends Component {
  render() {
    return <MonthCalendar navigation={this.props.navigation} />;
  }
}

class RegisterScreen extends Component {
  /*componentDidMount() {
    if(store.getState().user.email) {
      this.props.navigation.navigate("Month")
    }
  }*/
  render() {
    return <RegisterView navigation={this.props.navigation} />;
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
