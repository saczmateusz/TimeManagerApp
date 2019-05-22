import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
//import { Styledds } from "../assets/Styles.js";

class TaskList extends Component {
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

  render() {
    return (
      <View style={styles.container}>
        {this.createDay()}
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Day")}>
          <View style={{ ...styles.button }}>
            <Text style={{ ...styles.buttonText }}>Wróć do kalendarza</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
export default TaskList;

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
    fontSize: 15
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
