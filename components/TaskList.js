import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { setUserTasks } from "../reducers/actions/user";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";
import moment from "moment";

import NotificationManager from '../components/NotificationManager'

class TaskList extends Component {
  constructor() {
    super();
  }

  state = {
    loading: false
  };

  createDay = () => {
    return (
      <View style={styles.dayTile}>
        <Text style={styles.taskText2}>Status</Text>
        <Text style={styles.taskText}>
          {moment(this.props.task.start_date).isAfter(moment())
            ? "Oczekujące"
            : moment(this.props.task.end_date).isAfter(moment())
            ? "W trakcie"
            : "Przeterminowane"}
        </Text>
        <Text style={styles.taskText2}>Treść</Text>
        <Text style={styles.taskText}>{this.props.task.body}</Text>
        <Text style={styles.taskText2}>Priorytet</Text>
        <Text style={styles.taskText}>
          {
            ["Brak", "Ważne", "Pilne", "Ważne i pilne"][
              this.props.task.priority - 1
            ]
          }
        </Text>
        <Text style={styles.taskText2}>Start</Text>
        <Text style={styles.taskText3}>
          {moment(this.props.task.start_date).fromNow()}
        </Text>
        <Text style={styles.taskText4}>
          {moment(this.props.task.start_date).format("D MMMM Y, HH:mm")}
        </Text>
        <Text style={styles.taskText2}>Koniec</Text>
        <Text style={styles.taskText3}>
          {moment(this.props.task.end_date).fromNow()}
        </Text>
        <Text style={styles.taskText4}>
          {moment(this.props.task.end_date).format("D MMMM Y, HH:mm")}
        </Text>
        <Text style={styles.taskText2}>Powiadomienie</Text>
        <Text style={styles.taskText3}>
          { this.props.task.has_notification ? "Tak" : "Nie" }
        </Text>
      </View>
    );
  };

  deleteTaskPrompt = () => {
    Alert.alert(
      "Usuwanie zadania",
      "Czy na pewno chcesz usunąć to zadanie?",
      [
        {
          text: "Tak",
          onPress: () => this.deleteTask()
        },
        { text: "Nie", style: "cancel" }
      ],
      { cancelable: false }
    );
  };

  deleteTask = () => {
    this.setState({ loading: true });
    axios
      .delete("/api/tasks/" + this.props.task.id, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {

        if(this.props.task.has_notification) {
          NotificationManager.cancelNotification(this.props.task.id)
        }

        axios.get("/api/tasks").then(response => {
          this.setState({ loading: false });
          this.props.setUserTasks(response.data);

          this.props.navigation.navigate("Day", {
            day: this.props.task.start_date.substring(0, 10),
            ignorePush: true,
            pop: true
          });

        });
      })
      .catch(error => {
        this.setState({ loading: false });
        alert("Błąd usuwania zadania.");
      });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? <LoadingScreen /> : null}
        {this.createDay()}
        <View style={styles.deleteTaskView}>
          <TouchableOpacity
            style={styles.deleteTaskTouch}
            onPress={() => this.deleteTaskPrompt()}
          >
            <Icon name={"md-trash"} size={30} color="#ff5555" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = null;

const mapActionsToProps = {
  setUserTasks
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "#f5f5f6",
    paddingHorizontal: 10
  },
  scroll: {
    flexDirection: "column"
  },
  dayTile: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginVertical: 20,
    marginHorizontal: 10,
    borderRadius: 2,
    elevation: 1
  },
  dayHeader: {
    color: "#333",
    fontSize: 20,
    fontFamily: "Roboto-Bold"
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
  },
  deleteTaskView: {
    position: "absolute",
    right: 30,
    bottom: 35
  },
  deleteTaskTouch: {
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    zIndex: 999,
    elevation: 2
  },
  taskText2: {
    color: "#888",
    fontSize: 10
  },
  taskText: {
    color: "#333",
    fontSize: 19,
    paddingBottom: 20
  },
  taskText3: {
    color: "#333",
    fontSize: 19
  },
  taskText4: {
    color: "#777",
    fontSize: 15,
    paddingBottom: 20
  }
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(TaskList);
