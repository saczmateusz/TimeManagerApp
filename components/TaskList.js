import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { setUserTasks } from "../reducers/actions/user";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";

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
        <View style={{ alignItems: "center" }}>
          <Text style={styles.dayHeader}>{this.props.task.body}</Text>
        </View>
        <View style={styles.taskTile}>
          <Text style={styles.taskText}>
            Początek: {this.props.task.start_date.substring(11, 16)}
          </Text>
          <Text style={styles.taskText}>
            Koniec: {this.props.task.end_date.substring(11, 16)}
          </Text>
          <Text style={styles.taskText}>
            Priorytet:{" "}
            {
              ["Brak", "Ważne", "Pilne", "Ważne i pilne"][
                this.props.task.priority - 1
              ]
            }
          </Text>
        </View>
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
        axios.get("/api/tasks").then(response => {
          this.setState({ loading: false });
          this.props.setUserTasks(response.data);
          this.props.navigation.navigate("Day", {
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
    backgroundColor: "#f5f5f6",
    borderRadius: 3,
    margin: 5,
    flex: 1
  },
  dayHeader: {
    color: "#333",
    fontSize: 20,
    fontFamily: "Roboto-Bold"
  },
  taskTile: {
    backgroundColor: "#e1e1e1",
    flex: 1,
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3
  },
  taskText: {
    color: "#333",
    fontSize: 15,
    paddingVertical: 10
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
    right: 20,
    bottom: 15
  },
  deleteTaskTouch: {
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    zIndex: 999
  }
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(TaskList);
