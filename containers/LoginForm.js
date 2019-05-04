import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import { setUser } from "../reducers/actions/user";
import { setToken } from "../reducers/actions/token";

class LoginForm extends Component {
  state = {
    loading: false,
    error: null,
    username: "",
    passwd: ""
  };

  loginSubmit = () => {
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

          this.props.navigation.navigate("Day");
        })
        .catch(error => {
          this.setState({ error, loading: false });
        });

      this.setState({
        username: "",
        passwd: ""
      });
    } else alert("Uzupełnij wszystkie pola");
  };

  render() {
    return (
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
            paddingHorizontal: 10,
            paddingTop: 20
          }}
        >
          <TouchableOpacity onPress={() => this.loginSubmit()}>
            <View
              style={{
                height: 35,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ff8833",
                borderRadius: 2
              }}
            >
              <Text style={{ color: "white", fontSize: 18 }}>
                {this.state.loading ? "Wysyłanie..." : "Zaloguj"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <Text
            style={{ color: "white", textAlign: "center", marginVertical: 10 }}
          >
            LUB
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Register")}
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
              <Text style={{ color: "white", fontSize: 18 }}>
                Zarejestruj się
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", paddingHorizontal: 10 }}>
          <Text style={{ color: "white" }}>
            {this.state.error ? "Logowanie nie powiodło się" : ""}
          </Text>

          <Text style={{ color: "white" }}>
            {this.props.user.email ? "Zalogowano jako " : ""}
            {JSON.stringify(this.props.user.username)}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
)(LoginForm);
