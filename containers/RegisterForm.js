import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import { setUser } from "../reducers/actions/user";
import { setToken } from "../reducers/actions/token";
import LoadingScreen from "../components/LoadingScreen";
import moment from "moment";

class RegisterForm extends Component {
  state = {
    loading: false,
    error: null,
    username: "",
    email: "",
    passwd: "",
    passrt: ""
  };

  registerSubmit = () => {
    if (this.state.username && this.state.email && this.state.passwd) {
      if (this.state.passwd === this.state.passrt) {
        this.setState({ loading: true, error: null });
        axios
          .post("/auth/register", {
            username: this.state.username,
            email: this.state.email,
            password: this.state.passwd
          })
          .then(response => {
            response.data.user.tasks = [];
            this.props.setUser(response.data.user);
            this.props.setToken(response.data.token);
            this.setState({ ...this.state, error: null, loading: false });

            axios.defaults.headers.common["Authorization"] = `Bearer ${
              response.data.token
            }`;

            AsyncStorage.setItem(
              "USER",
              JSON.stringify({
                username: this.state.username,
                password: this.state.passwd
              })
            );

            this.props.navigation.navigate("Day", {
              day: moment().format("YYYY-MM-DD")
            });
          })
          .catch(error => {
            this.setState({ error, loading: false });

            this.setState({
              passwd: "",
              passrt: ""
            });
          });
      } else alert("Hasła różne");
    } else alert("Uzupełnij wszystkie pola");
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? <LoadingScreen /> : null}

        <TextInput
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
          placeholder="Nazwa użytkownika"
          placeholderTextColor="#565554"
          style={styles.form}
        />
        <TextInput
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          placeholder="E-mail"
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
        <TextInput
          onChangeText={passrt => this.setState({ passrt })}
          value={this.state.passrt}
          placeholder="Powtórz hasło"
          placeholderTextColor="#565554"
          secureTextEntry
          style={styles.form}
        />
        <View
          style={{
            paddingHorizontal: 10,
            paddingTop: 20
            // flexDirection: "column"
          }}
        >
          <TouchableOpacity onPress={() => this.registerSubmit()}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>
                {this.state.loading ? "Wysyłanie..." : "Zarejestruj się"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", paddingHorizontal: 10 }}>
          <Text style={{ color: "black" }}>
            {this.state.error ? "Rejestracja nie powiodła się" : ""}
          </Text>
        </View>
      </View>
    );
  }
}

/*const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingTop: 20,
    alignItems: "stretch"
  },
  form: {
    borderWidth: 1,
    borderColor: "orange",
    backgroundColor: "orange",
    height: 50,
    padding: 5,
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    fontFamily: "Roboto-Light"
  }
});*/

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
    elevation: 1,
    marginHorizontal: 10
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
  setToken
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(RegisterForm);
