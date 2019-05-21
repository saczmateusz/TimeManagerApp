import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Swiper from "react-native-swiper";
import AddButton from "./AddButton";

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

  findIndexOfDate = obj => {
    var index = 0;
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (key === this.props.day) {
          return index;
        }
      }
      ++index;
    }
  };

  render() {
    const grouped = this.groupByDate(
      this.sortByKey(store.getState().user.tasks, "start_date")
    );

    var index = this.props.day;
    if (this.props.day) {
      index = this.findIndexOfDate(grouped);
    }

    return (
      <View style={styles.container}>
        <Swiper
          index={index}
          loop={false}
          showsPagination={false}
          style={styles.swiper}
        >
          {this.createList(grouped)}
        </Swiper>
        <AddButton navigation={this.props.navigation} />
      </View>
    );
  }
}
export default DayCalendar;

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
  }
});
