import React, { Component } from "react";
import { connect } from 'react-redux';
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

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
        //response.data.token
        //response.data.user
        this.setState({ error: null, loading: false })
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });

    this.setState({
      username: "",
      passwd: ""
    });
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
        
        <View style={{ paddingHorizontal: 10, paddingTop: 20, flexDirection: "column" }}>
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
    fontFamily: "avenir-light"
  }
});

export default LoginForm;

