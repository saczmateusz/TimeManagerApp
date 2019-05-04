import React, { Component } from "react";
import SplashScreen from "react-native-splash-screen";
import { Provider } from "react-redux";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { setCustomText, setCustomTextInput } from "react-native-global-props";
import store from "./store";
import "./config/axios";

import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import AddTaskView from "./views/AddTaskView";
import MonthView from "./views/MonthView";
import WeekView from "./views/WeekView";
import DayView from "./views/DayView";

export default class App extends Component {
  constructor() {
    super();

    const customTextProps = {
      style: {
        fontFamily: "Roboto-Light"
      }
    };

    setCustomText(customTextProps);
  }

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
      this.props.navigation.navigate("Day");
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

class WeekScreen extends Component {
  render() {
    return <WeekView navigation={this.props.navigation} />;
  }
}

class DayScreen extends Component {
  render() {
    var day = this.props.navigation.getParam("day", 0);
    return <DayView navigation={this.props.navigation} day={day} />;
  }
}

const AppSwitchNavigator = createSwitchNavigator({
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
  AddTask: { screen: AddTaskScreen },
  Month: { screen: MonthScreen },
  Week: { screen: WeekScreen },
  Day: { screen: DayScreen }
});

const AppContainer = createAppContainer(AppSwitchNavigator);
