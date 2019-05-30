import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";
import Swiper from "react-native-swiper";
import AddButton from "./AddButton";
import moment from "moment"

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

  getColor(prio) {

    const color = ["grey", "yellow", "orange", "red"][prio - 1]

    return {
      borderBottomWidth: 3,
      borderColor: color
    }
  }

  createList = days => {
    var views = [];
    for (var key in days) {
      if (days.hasOwnProperty(key)) {
        views.push(
          <View key={key} style={styles.dayTile}>
            <View style={{ paddingLeft: 8, paddingVertical: 15 }}>
              <Text style={styles.dayHeader}>
              { moment(key).format('D MMMM Y') }
              </Text>
            </View>
            <ScrollView>{this.createDay(days[key])}</ScrollView>
          </View>
        );
      }
    }
    return views;
  };

  createDay = tasks => {
    return tasks.sort((a, b) => a.start_date > b.start_date).map(task => {
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Task", {
              task: task
            });
          }}
        >
          <View key={task.id} style={{...styles.taskTile, ...this.getColor(task.priority)}}>
            <Text style={styles.taskText}>{task.body}</Text>
          </View>
        </TouchableOpacity>
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
          {Object.keys(grouped).length ? this.createList(grouped) : (
            <View style={{flex: 1, alignItems: "center", paddingTop: 20}}>
              <Text>Nie masz żadnych zadań.</Text>
            </View>
          )}
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
    color: "#555",
    fontSize: 20,
    alignItems: "flex-start"
  },
  taskTile: {
    backgroundColor: "#fff",
    flex: 1,
    margin: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 2,
    elevation: 1
  },
  taskText: {
    color: "#333",
    fontSize: 19
  },
  taskText2: {
    color: "#888",
    fontSize: 10
  }
});
