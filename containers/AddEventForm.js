import React, { Component } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import { setUser } from "../reducers/actions/user";
import { setToken } from "../reducers/actions/token";
import DateTimeButton from "../components/DateTimeButton";
import moment from "moment";

class AddEventForm extends Component {
  state = {
    loading: false,
    error: null,
    start_date: "",
    end_date: "",
    body: "",
    priority: "",
    data: ""
  };

  addEventSubmit = () => {
    this.setState({ loading: true, error: null });
    axios
      .post("/api/tasks", {
        start_date: this.state.start_date,
        end_date: moment(this.state.end_date, "YYYY-MM-DD HH:mm:ss"),
        body: this.state.body,
        priority: this.state.priority
      })
      .then(response => {
        this.data(response.data);
        this.setState({ error: null, loading: false });

        this.props.navigation.navigate("Month");
      })
      .catch(error => {
        alert("alert");
        this.setState({ error, loading: false });
      });

    this.setState({
      start_date: "",
      end_date: "",
      body: "",
      priority: ""
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <TextInput
          onChangeText={start_date => this.setState({ start_date })}
          value={this.state.start_date}
          placeholder="Data rozpoczęcia"
          placeholderTextColor="#565554"
          style={styles.form}
        /> */}
        <DateTimeButton start_date={this.props.date} />
        <TextInput
          onChangeText={end_date => this.setState({ end_date })}
          value={this.state.end_date}
          placeholder="Data zakończenia"
          placeholderTextColor="#565554"
          style={styles.form}
        />
        <TextInput
          onChangeText={body => this.setState({ body })}
          value={this.state.body}
          placeholder="Nazwa"
          placeholderTextColor="#565554"
          style={styles.form}
        />
        <TextInput
          onChangeText={priority => this.setState({ priority })}
          value={this.state.priority}
          placeholder="Priorytet"
          placeholderTextColor="#565554"
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
            title={this.state.loading ? "Wysyłanie..." : "Dodaj"}
            onPress={() => this.addEventSubmit()}
          />
        </View>

        <View style={{ alignItems: "center", paddingHorizontal: 10 }}>
          <Text style={{ color: "white" }}>
            {this.state.error ? "Dodawanie nie powiodło się" : ""}
          </Text>

          <Text style={{ color: "white" }}>
            {JSON.stringify(this.props.user)}
          </Text>
          <Text style={{ color: "white" }}>{this.state.start_date}</Text>
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
)(AddEventForm);
