import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { setUserTasks } from "../reducers/actions/user";
import axios from "axios";
import LoadingScreen from './LoadingScreen';

class TaskList extends Component {
  constructor() {
    super();
  }

  state = {
    loading: false
  }

  createDay = () => {
    var priorityName = "";
    switch (this.props.task.priority) {
      case 1:
        priorityName = "Brak";
        break;
      case 2:
        priorityName = "Ważne";
        break;
      case 3:
        priorityName = "Pilne";
        break;
      case 4:
        priorityName = "Ważne i Pilne";
        break;
      default:
        priorityName = "Schrodingera";
    }
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
          <Text style={styles.taskText}>Priorytet: {priorityName}</Text>
        </View>
      </View>
    );
  };

  deleteTaskPrompt = () => {
    Alert.alert(
      'Usuwanie zadania',
      'Czy na pewno chcesz usunać to zadanie?',
      [
        {
          text: 'Tak',
          onPress: () => this.deleteTask()
        },
        {text: 'Nie', style: "cancel"},
      ],
      {cancelable: false},
    );
  }

  deleteTask = () => {      
      this.setState({loading: true}) 
      axios
        .delete(
          "/api/tasks/" + this.props.task.id,
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          
          axios.get("/api/tasks")
            .then(response => {
              this.setState({loading: false})
              this.props.setUserTasks(response.data)
              this.props.navigation.navigate("Day", { ignorePush: true, pop: true })
            })
          
        })
        .catch(error => {
          this.setState({loading: false})
          alert("Błąd usuwania zadania.")
        })
  }
  
  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? <LoadingScreen/> : null}
        {this.createDay()}
        <View style={styles.deleteTaskView}>
          <TouchableOpacity
            style={styles.deleteTaskTouch}
            onPress={() => this.deleteTaskPrompt()}
          >
            <Icon name={"md-subtract"} size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = null

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
    right: 10,
    bottom: 10
  },
  deleteTaskTouch: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    backgroundColor: "#ff3333",
    borderRadius: 50,
    zIndex: 999
  }
});

export default connect(mapStateToProps, mapActionsToProps)(TaskList);
