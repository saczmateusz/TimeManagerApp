import React, { Component } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
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

        this.props.navigation.navigate("Month");
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });

    this.setState({
      username: "",
      passwd: ""
    });
  };
  userTasks = () => {
    if (this.props.user.email) {
      return this.props.user.tasks.map(task => {
        return (
          <Text style={{ color: "white" }} key={task.id}>
            Notatka {task.id}: {task.body}
          </Text>
        );
      });
    }
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
            paddingTop: 20,
            flexDirection: "column"
          }}
        >
          <Button
            color="#ff8833"
            title={this.state.loading ? "Wysyłanie..." : "Zaloguj"}
            onPress={() => this.loginSubmit()}
          />
        </View>

        <View style={{ alignItems: "center", paddingHorizontal: 10 }}>
          <Text style={{ color: "white" }}>
            {this.state.error ? "Logowanie nie powiodło się" : ""}
          </Text>

          <Text style={{ color: "white" }}>
            {this.props.user.email ? "Zalogowano jako " : ""}
            {JSON.stringify(this.props.user.username)}
          </Text>
          {this.userTasks()}
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <Text
            style={{ color: "white", textAlign: "center", marginBottom: 10 }}
          >
            LUB
          </Text>
          <Button
            title="Zarejestruj się"
            color="#ff8833"
            onPress={() => this.props.navigation.navigate("Register")}
          />
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
    marginRight: 20
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
