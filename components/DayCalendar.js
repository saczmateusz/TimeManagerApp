import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Swiper from "react-native-swiper";

class DayCalendar extends Component {
  sortByKey = (array, key) => {
    return array.sort(function(a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  };

  groupByDate = data => {
    return data.reduce(function(group, object) {
      group[object.start_date.substring(0, 10)] =
        group[object.start_date.substring(0, 10)] || [];
      group[object.start_date.substring(0, 10)].push(object);
      return group;
    }, {});
  };

  createList = days => {
    var views = [];
    for (var key in days) {
      if (days.hasOwnProperty(key)) {
        views.push(
          <View key={key} style={styles.dayTile}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.dayHeader}>{key}</Text>
            </View>
            <ScrollView>{this.createDay(days[key])}</ScrollView>
          </View>
        );
      }
    }
    return views;
  };

  createDay = tasks => {
    return tasks.map(task => {
      return (
        <View key={task.id} style={styles.taskTile}>
          <Text style={styles.taskText}>Nazwa: {task.body}</Text>
          <Text style={styles.taskText}>
            Początek: {task.start_date.substring(11, 16)}
          </Text>
          <Text style={styles.taskText}>
            Koniec: {task.end_date.substring(11, 16)}
          </Text>
          <Text style={styles.taskText}>Priorytet: {task.priority}</Text>
        </View>
      );
    });
  };

  render() {
    const tasks = this.createList(
      this.groupByDate(
        this.sortByKey(store.getState().user.tasks, "start_date")
      )
    );
    return (
      <View style={styles.container}>
        <Swiper loop={false} showsPagination={false} style={styles.swiper}>
          {tasks}
        </Swiper>
        <View style={styles.addTaskView}>
          <TouchableOpacity
            style={styles.addTaskTouch}
            onPress={() => this.props.navigation.navigate("AddTask")}
          >
            <Icon name={"md-add"} size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default DayCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 10
  },
  scroll: {
    flexDirection: "column"
  },
  dayTile: {
    backgroundColor: "orange",
    borderRadius: 3,
    margin: 5,
    flex: 1
  },
  dayHeader: {
    color: "white",
    fontSize: 20,
    fontFamily: "Roboto-Bold"
  },
  taskTile: {
    backgroundColor: "#555555",
    flex: 1,
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3
  },
  taskText: {
    color: "white",
    fontSize: 15
  },
  addTaskView: {
    position: "absolute",
    right: 5,
    bottom: 5
  },
  addTaskTouch: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "#ff8833",
    borderRadius: 50
  }
});
