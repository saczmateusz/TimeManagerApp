import React, { Component } from "react";
import "./config/axios";
import { Provider } from "react-redux";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import store from "./store";

import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import AddEventView from "./views/AddEventView";
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

class AddEventScreen extends Component {
  render() {
    return <AddEventView navigation={this.props.navigation} />;
  }
}

const AppSwitchNavigator = createSwitchNavigator({
  Login: { screen: LoginScreen },
  Month: { screen: MonthScreen },
  Register: { screen: RegisterScreen },
  AddEvent: { screen: AddEventScreen }
});

const AppContainer = createAppContainer(AppSwitchNavigator);
