import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Picker
} from "react-native";
import { connect } from "react-redux";
import { addTask } from "../reducers/actions/task";
import axios from "axios";
import DateTimeButton from "../components/DateTimeButton";
import LoadingScreen from "../components/LoadingScreen";
import moment from "moment";

class AddTaskForm extends Component {
  state = {
    loading: false,
    error: null,
    start_date: this.props.day,
    end_date: this.props.day,
    name: "Wybierz datę zakończenia",
    body: "",
    priority: 1,
    radio_options: [
      { label: "Brak", value: 1 },
      { label: "Ważne", value: 2 },
      { label: "Pilne", value: 3 },
      { label: "Ważne i Pilne", value: 4 }
    ]
  };

  handleStartDate = date => {
    this.setState({ start_date: date, end_date: date, name: date });
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
          //bo najpierw to aktualizowanie taskow usera bylo w
          //MonthCalendar, ale przenioslem,
          //bo tu jest bardziej uniwersalne, nie pisze 3 razy
          //tego samego (month, week, day update)
          //XD
          if (store.getState().task.body) {
            store.getState().user.tasks.push(store.getState().task);
            store.getState().task = {};
          }
          this.props.navigation.navigate("Day", {
            day: response.data.start_date.substring(0, 10),
            ignorePush: true,
            pop: true
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

  getColor(prio) {
    const color = ["grey", "yellow", "orange", "red"][prio - 1];

    return {
      backgroundColor: color
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? <LoadingScreen /> : null}

        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
          <DateTimeButton
            onSelectDate={this.handleStartDate}
            name="Wybierz datę rozpoczęcia"
          />
        </View>
        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
          <DateTimeButton
            onSelectDate={this.handleEndDate}
            name={this.state.name}
          />
        </View>
        <TextInput
          onChangeText={body => this.setState({ body })}
          value={this.state.body}
          placeholder="Treść"
          placeholderTextColor="#565554"
          style={styles.form}
        />
        <View
          style={{
            paddingHorizontal: 20
          }}
        >
          <Text
            style={{
              paddingTop: 10
            }}
          >
            Priorytet
          </Text>
          <View
            style={{
              flexDirection: "row"
            }}
          >
            <Picker
              selectedValue={this.state.priority}
              style={{ height: 80, width: 270, ...styles.form, padding: 0, margin: 0 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ priority: itemValue })
              }
            >
              <Picker.Item label="Brak" value="1" />
              <Picker.Item label="Ważne" value="2" />
              <Picker.Item label="Pilne" value="3" />
              <Picker.Item label="Ważne i pilne" value="4" />
            </Picker>
            <View
              style={{
                ...styles.priocolor,
                ...this.getColor(this.state.priority)
              }}
            />
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 20,
            flexDirection: "column"
          }}
        >
          <TouchableOpacity onPress={() => this.addTaskSubmit()}>
            <View
              style={styles.button}
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
  priocolor: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginTop: 25,
    marginLeft: 17
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
