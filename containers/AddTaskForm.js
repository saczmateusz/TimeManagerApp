import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { addTask } from "../reducers/actions/task";
import axios from "axios";
import DateTimeButton from "../components/DateTimeButton";

class AddTaskForm extends Component {
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

  addTaskSubmit = () => {
    if (
      this.state.start_date &&
      this.state.end_date &&
      this.state.body &&
      this.state.priority
    ) {
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
          //wiem, ze reducer tutaj jest niepotrzebny i wystarczyloby
          //dodac lokalnego taska recznie do taskow usera
          //ale tak jest smieszniej i wiecej zabawy
          //przy okazji nauczylem sie reduxa
          //bo najpierw to aktualizowanie taskow usera bylo w MonthCalendar, ale przenioslem,
          //bo tu jest bardziej uniwersalne, nie pisze 3 razy tego samego (month, week, day update)
          //XD
          if (store.getState().task.body) {
            store.getState().user.tasks.push(store.getState().task);
            store.getState().task = {};
          }
          this.props.navigation.navigate("Day", {
            day: response.data.start_date.substring(0, 10)
          });
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
    } else alert("Uzupełnij wszystkie pola");
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
          <TouchableOpacity onPress={() => this.addTaskSubmit()}>
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
                {this.state.loading ? "Wysyłanie..." : "Dodaj"}
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
  task: state.task
});

const mapActionsToProps = {
  addTask
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AddTaskForm);
