import React, { Component } from "react";
import { BackHandler, Alert, AsyncStorage } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { Provider } from "react-redux";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { setCustomText } from "react-native-global-props";
import store from "./store";
import "./config/axios";
import "./config/moment";

import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import AddTaskView from "./views/AddTaskView";
import MonthView from "./views/MonthView";
import ArchiveView from "./views/ArchiveView";
import DayView from "./views/DayView";
import TaskView from "./views/TaskView";
import UserView from "./views/UserView";
import PassView from "./views/PassView";

export default class App extends Component {
  constructor() {
    super();

    const customTextProps = {
      style: {
        fontFamily: "RobotoMono-Regular"
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
        <AppContainer
          onNavigationStateChange={(prevState, currentState, action) => {
            /* Ale spaghetti XDDD */

            if (
              ["Day", "Month", "Archive"].includes(
                prevState.routes[prevState.index].routeName
              ) &&
              ["Day", "Month", "Archive"].includes(
                currentState.routes[currentState.index].routeName
              )
            )
              return;

            if (
              store.getState().history.length &&
              store.getState().history.slice(-1)[0].name ==
                prevState.routes[prevState.index].routeName
            )
              return;

            if (action.params && action.params.ignorePush) {
              if (action.params.pop)
                store.dispatch({
                  type: "POP_FROM_HISTORY"
                });

              return;
            }

            store.dispatch({
              type: "PUSH_TO_HISTORY",
              payload: {
                name: prevState.routes[prevState.index].routeName,
                params: prevState.routes[prevState.index].params
              }
            });
          }}
        />
      </Provider>
    );
  }
}

class LoginScreen extends Component {
  constructor() {
    super();

    this.handleBackPress = this.handleBackPress.bind(this);
    this.exitPrompt = this.exitPrompt.bind(this);
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  handleBackPress() {
    const loggedIn = store.getState().user.email;
    const lastRoute = store.getState().history.pop();

    if (!lastRoute) {
      this.exitPrompt();
      return true;
    }

    if (["Login", "Register"].includes(lastRoute.name)) {
      if (loggedIn) {
        this.handleBackPress();
        return true;
      } else {
        this.props.navigation.navigate(lastRoute.name, {
          ...lastRoute.params,
          ignorePush: true
        });
      }
    } else {
      if (loggedIn) {
        this.props.navigation.navigate(lastRoute.name, {
          ...lastRoute.params,
          ignorePush: true
        });
      } else {
        this.handleBackPress();
        return true;
      }
    }

    return true;
  }
  exitPrompt() {
    Alert.alert(
      "",
      "Czy na pewno chcesz wyjść z aplikacji?",
      [
        { text: "Tak", onPress: () => BackHandler.exitApp() },
        { text: "Nie", onPress: () => {} }
      ],
      { cancelable: false }
    );
  }
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

class ArchiveScreen extends Component {
  render() {
    return <ArchiveView navigation={this.props.navigation} />;
  }
}

class DayScreen extends Component {
  render() {
    var day = this.props.navigation.getParam("day", 0);
    return <DayView navigation={this.props.navigation} day={day} />;
  }
}

class TaskScreen extends Component {
  render() {
    var task = this.props.navigation.getParam("task", {});
    return <TaskView navigation={this.props.navigation} task={task} />;
  }
}

class UserScreen extends Component {
  render() {
    return <UserView navigation={this.props.navigation} />;
  }
}

class PassScreen extends Component {
  render() {
    return <PassView navigation={this.props.navigation} />;
  }
}

const AppSwitchNavigator = createSwitchNavigator({
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
  AddTask: { screen: AddTaskScreen },
  Month: { screen: MonthScreen },
  Day: { screen: DayScreen },
  Task: { screen: TaskScreen },
  User: { screen: UserScreen },
  Archive: { screen: ArchiveScreen },
  PassRec: { screen: PassScreen }
});

const AppContainer = createAppContainer(AppSwitchNavigator);
