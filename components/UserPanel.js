import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { CheckBox } from "react-native-elements";

class UserPanel extends Component {
  state = {
    shownUser: store.getState().user.username,
    email: store.getState().user.email,
    checked: false
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: "center", flex: 2 }}>
          <View style={styles.avatarView}>
            <View style={styles.avatar}>
              <Icon name={"md-person"} size={90} color="white" />
            </View>
          </View>
        </View>
        <View style={styles.dayTile}>
          <View>
            <Text
              style={{
                color: "#666",
                fontSize: 16,
                marginVertical: 10
              }}
            >
              {"Nazwa użytkownika: " + this.state.shownUser}
            </Text>
            <Text
              style={{
                color: "#666",
                fontSize: 16,
                marginVertical: 10
              }}
            >
              {"Adres e-mail: " + this.state.email}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.removeItem("USER");
              store.getState().user = {};
              store.getState().token = "";
              this.setState({ shownUser: "" });
              this.props.navigation.navigate("Login");
            }}
          >
            <View style={{ ...styles.button, backgroundColor: "#ececec" }}>
              <Text style={{ ...styles.buttonText, color: "#333" }}>
                Wyloguj się
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    backgroundColor: "#f5f5f6",
    paddingHorizontal: 10
  },
  scroll: {
    flexDirection: "column"
  },
  avatarView: {
    paddingTop: 30
  },
  avatar: {
    alignItems: "center",
    justifyContent: "center",
    width: 110,
    height: 110,
    backgroundColor: "#ddd",
    borderRadius: 90
  },
  dayTile: {
    backgroundColor: "#fff",
    flex: 3,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginVertical: 20,
    marginHorizontal: 10,
    borderRadius: 2,
    elevation: 1
  },
  dayHeader: {
    color: "#333",
    fontSize: 20,
    fontFamily: "Roboto-Bold"
  },
  button: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff8833",
    borderRadius: 4,
    marginHorizontal: 10,
    elevation: 1
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    textTransform: "uppercase"
  },
  deleteTaskView: {
    position: "absolute",
    right: 30,
    bottom: 35
  },
  deleteTaskTouch: {
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    zIndex: 999,
    elevation: 2
  },
  taskText2: {
    color: "#888",
    fontSize: 10
  },
  taskText: {
    color: "#333",
    fontSize: 19,
    paddingBottom: 20
  },
  taskText3: {
    color: "#333",
    fontSize: 19
  },
  taskText4: {
    color: "#777",
    fontSize: 15,
    paddingBottom: 20
  }
});

export default UserPanel;

/*

            <CheckBox
              title="Wyświetlaj zarchiwizowane zadania"
              checked={this.state.checked}
              checkedColor="orange"
              uncheckedColor="grey"
              onPress={() => {
                this.setState({ checked: !this.state.checked });
              }}
              containerStyle={{
                paddingHorizontal: 5,
                borderColor: "#fff",
                backgroundColor: "#fff"
              }}
              textStyle={{ fontWeight: "normal" }}
            />

*/