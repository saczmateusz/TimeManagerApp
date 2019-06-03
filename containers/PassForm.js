import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import LoadingScreen from "../components/LoadingScreen";

class PassForm extends Component {
  state = {
    loading: false,
    error: null,
    usermail: ""
  };

  passSubmit() {
    if (this.state.usermail) {
      this.setState({ loading: true });
      alert("Oczekuj na e-mail z linkiem do ustanowienia nowego hasła");
      this.props.navigation.navigate("Login");
      this.setState({ loading: false });
    } else alert("Uzupełnij pola");
  }

  render() {
    return (
      <View>
        {this.state.loading ? <LoadingScreen /> : null}
        <View style={styles.container}>
          <View style={{ paddingHorizontal: 20 }}>
            <Text
              style={{
                color: "black",
                textAlign: "center",
                marginVertical: 10
              }}
            >
              Podaj adres e-mail użyty do rejestracji
            </Text>
            <TextInput
              onChangeText={usermail => this.setState({ usermail })}
              value={this.state.usermail}
              placeholder="Adres e-mail"
              placeholderTextColor="#565554"
              style={styles.form}
            />

            <TouchableOpacity onPress={() => this.passSubmit()}>
              <View style={{ ...styles.button }}>
                <Text style={{ ...styles.buttonText }}>Odzyskaj hasło</Text>
              </View>
            </TouchableOpacity>
          </View>
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
    borderBottomWidth: 2,
    borderColor: "#e4e4e4",
    backgroundColor: "#e8e8e8",
    height: 50,
    padding: 15,
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

export default PassForm;
