import React, { Component } from "react";
import SplashScreen from "react-native-splash-screen";
import { Provider } from "react-redux";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import store from "./store";
import "./config/axios";

import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import AddTaskView from "./views/AddTaskView";
import MonthView from "./views/MonthView";

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

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

class RegisterScreen extends Component {
  componentDidMount() {
    if (store.getState().user.email) {
      this.props.navigation.navigate("Month");
    }
  }
  render() {
    return <RegisterView navigation={this.props.navigation} />;
  }
}

class AddTaskScreen extends Component {
  render() {
    return <AddTaskView navigation={this.props.navigation} />;
  }
}

class MonthScreen extends Component {
  render() {
    return <MonthView navigation={this.props.navigation} />;
  }
}

const AppSwitchNavigator = createSwitchNavigator({
  Login: { screen: LoginScreen },
  Month: { screen: MonthScreen },
  Register: { screen: RegisterScreen },
  AddTask: { screen: AddTaskScreen }
});

const AppContainer = createAppContainer(AppSwitchNavigator);
