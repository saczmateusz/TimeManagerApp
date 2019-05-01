import React, { Component } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { addTask } from "../reducers/actions/task";
import axios from "axios";
import DateTimeButton from "../components/DateTimeButton";

class AddEventForm extends Component {
  state = {
    loading: false,
    error: null,
    start_date: "",
    end_date: "",
    body: "",
    priority: ""
  };

  handleStartDate = date => {
    this.setState({ start_date: date });
  };

  handleEndDate = date => {
    this.setState({ end_date: date });
  };

  addEventSubmit = () => {
    this.setState({ loading: true, error: null });
    axios
      .post(
        "/api/tasks",
        {
          start_date: this.state.start_date,
          end_date: this.state.end_date,
          body: this.state.body,
          priority: this.state.priority
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(response => {
        this.props.addTask(response.data);
        this.setState({
          error: null,
          loading: false
        });

        this.props.navigation.navigate("Month");
      })
      .catch(error => {
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
        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
          <DateTimeButton
            onSelectDate={this.handleStartDate}
            name="rozpoczęcia"
          />
        </View>
        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
          <DateTimeButton
            onSelectDate={this.handleEndDate}
            name="zakończenia"
          />
        </View>
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
  task: state.task
});

const mapActionsToProps = {
  addTask
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AddEventForm);
