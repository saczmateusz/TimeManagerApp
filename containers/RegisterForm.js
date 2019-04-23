import React, { Component } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import { setUser } from "../reducers/actions/user";
import { setToken } from "../reducers/actions/token";

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
    if (this.state.passwd === this.state.passrt) {
      this.setState({ loading: true, error: null });
      axios
        .post("/auth/register", {
          username: this.state.username,
          email: this.state.email,
          password: this.state.passwd
        })
        .then(response => {
          this.props.setUser(response.data.user);
          this.props.setToken(response.data.token);
          this.setState({ error: null, loading: false });

          this.props.navigation.navigate("Month");
        })
        .catch(error => {
          this.setState({ error, loading: false });
        });

      this.setState({
        username: "",
        email: "",
        passwd: "",
        passrt: ""
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
            paddingTop: 20,
            flexDirection: "column"
          }}
        >
          <Button
            color="#ff8833"
            title={this.state.loading ? "Wysyłanie..." : "Zarejestruj się"}
            onPress={() => this.registerSubmit()}
          />
        </View>
        <View style={{ alignItems: "center", padding: 10 }}>
          <Text style={{ color: "white" }}>
            {this.state.error ? "Rejestracja nie powiodła się" : ""}
          </Text>

          <Text style={{ color: "white" }}>
            {JSON.stringify(this.props.user)}
          </Text>

          <Text style={{ color: "white" }}>
            {JSON.stringify(this.props.token)}
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
