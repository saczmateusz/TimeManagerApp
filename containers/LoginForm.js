import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import { setUser } from "../reducers/actions/user";
import { setToken, unsetUser } from "../reducers/actions/token";
import LoadingScreen from "../components/LoadingScreen";

class LoginForm extends Component {
  componentDidMount() {
    this.setState({ shownUser: this.props.user.username });

    this.checkSavedUser();
  }

  state = {
    loading: false,
    error: null,
    username: "",
    passwd: "",
    shownUser: ""
  };

  loginSubmit() {
    if (this.state.username && this.state.passwd) {
      this.setState({ loading: true, error: null });
      axios
        .post("/auth/login", {
          username: this.state.username,
          password: this.state.passwd
        })
        .then(response => {
          this.props.setUser(response.data.user);
          this.props.setToken(response.data.token);
          this.setState({ error: null, loading: false });

          axios.defaults.headers.common["Authorization"] = `Bearer ${
            response.data.token
          }`;

          AsyncStorage.setItem("USER", JSON.stringify({
            username: this.state.username,
            password: this.state.passwd
          }))

          this.props.navigation.navigate("Day");
        })
        .catch(error => {
          this.setState({
            passwd: ""
          });

          this.setState({ error, loading: false });
        });
    } else alert("Uzupełnij wszystkie pola");
  };

  async checkSavedUser() {
    let user = await AsyncStorage.getItem("USER")
    user = JSON.parse(user)
    if(!user) return

    this.setState({
      username: user.username,
      passwd: user.password
    }, this.loginSubmit)
  }

  render() {
    return (
      <View>
        {this.state.loading ? <LoadingScreen/> : null}

        {this.state.shownUser ? (
          <View  style={{
            paddingHorizontal: 20,
            paddingTop: 20
          }}>
            <Text
              style={{
                color: "black",
                textAlign: "center",
                marginVertical: 10
              }}
            >
              {"Zalogowano jako " + this.state.shownUser}
            </Text>
            <TouchableOpacity
              
              onPress={() => this.props.navigation.navigate("Day")}
            >
              <View style={{ ...styles.button }}>
                <Text style={{ ...styles.buttonText }}>
                  Wróć do kalendarza
                </Text>
              </View>
            </TouchableOpacity>       
              <Text
                style={{
                  color: "black",
                  textAlign: "center",
                  marginVertical: 10
                }}
              >
                LUB
              </Text>
              <TouchableOpacity
               onPress={() => {
                AsyncStorage.removeItem("USER")
                this.props.unsetUser;
                store.getState().token = "";
                this.setState({ shownUser: "" });
              }}
              >
                <View style={{ ...styles.button, backgroundColor: "#ececec" }}>
                  <Text style={{ ...styles.buttonText, color: "#333" }}>
                    Wyloguj się
                  </Text>
                </View>
              </TouchableOpacity>
            
          </View>
        ) : (
          <View style={styles.container}>
            <TextInput
              onChangeText={username => this.setState({ username })}
              value={this.state.username}
              placeholder="Nazwa użytkownika"
              placeholderTextColor="#565554"
              style={styles.form}
            />
            <TextInput
              onChangeText={passwd => this.setState({ passwd })}
              value={this.state.passwd}
              placeholder="Hasło"
              placeholderTextColor="#565554"
              secureTextEntry
              style={styles.form}
            />

            <View
              style={{
                paddingHorizontal: 20,
                paddingTop: 20
              }}
            >
              <TouchableOpacity onPress={() => this.loginSubmit()}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>
                    {this.state.loading ? "Wysyłanie..." : "Zaloguj"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 20 }}>
              <Text
                style={{
                  color: "black",
                  textAlign: "center",
                  marginVertical: 10
                }}
              >
                LUB
              </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Register")}
              >
                <View style={{ ...styles.button, backgroundColor: "#ececec" }}>
                  <Text style={{ ...styles.buttonText, color: "#333" }}>
                    Zarejestruj się
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center", paddingHorizontal: 10 }}>
              <Text style={{ color: "black" }}>
                {this.state.error ? "Logowanie nie powiodło się" : ""}
              </Text>

              <Text style={{ color: "black" }}>
                {this.state.shownUser
                  ? this.state.shownUser === "0"
                    ? "Wylogowano"
                    : "Zalogowano jako " + this.state.shownUser
                  : ""}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}
/*
<View style={{ paddingHorizontal: 10 }}>
<Text
  style={{ color: "white", textAlign: "center", marginVertical: 10 }}
>
  LUB
</Text>
<TouchableOpacity
  onPress={() => {
    store.getState().user = {};
    store.getState().token = "";
    this.setState({ shownUser: "0" });
  }}
>
  <View
    style={{
      height: 35,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ff8833",
      borderRadius: 2
    }}
  >
    <Text style={{ color: "white", fontSize: 18 }}>Wyloguj się</Text>
  </View>
</TouchableOpacity>
</View>
*/
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingTop: 20,
    alignItems: "stretch"
  },
  form: {
    borderBottomWidth: 2,
    borderColor: "#e4e4e4",
    backgroundColor: "#e8e8e8",
    height: 50,
    padding: 15,
    margin: 20,
    marginVertical: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  button: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff8833",
    borderRadius: 4,
    elevation: 1
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    textTransform: "uppercase"
  }
});

const mapStateToProps = state => ({
  user: state.user,
  token: state.token
});

const mapActionsToProps = {
  setUser,
  unsetUser,
  setToken
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LoginForm);
