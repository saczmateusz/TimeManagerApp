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
import moment from "moment";

class DayCalendar extends Component {
  findIndexOfDate = obj => {
    var index = 0;
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] === this.props.day) {
          return index;
        }
      }
      ++index;
    }
    return 0;
  };

  getColor(prio) {
    const color = ["grey", "yellow", "orange", "red"][prio - 1];
    return {
      borderBottomWidth: 3,
      borderColor: color
    };
  }

  chooseTileStyle = status => {
    return [
      {
        backgroundColor: "#ebebeb",
        flex: 1,
        margin: 5,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 10,
        borderRadius: 2,
        elevation: 1
      },
      {
        backgroundColor: "#fff",
        flex: 1,
        margin: 5,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 10,
        borderRadius: 2,
        elevation: 1
      },
      {
        backgroundColor: "#ddd",
        flex: 1,
        margin: 5,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 10,
        borderRadius: 2,
        elevation: 1
      }
    ][status - 1];
  };

  chooseTextStyle = status => {
    return [
      {
        color: "#333",
        fontSize: 19
      },
      {
        color: "#333",
        fontSize: 19
      },
      {
        color: "#888",
        fontSize: 19
      }
    ][status - 1];
  };

  isPeriodic = (task, per) => {
    return per ? (
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.taskText4}>
          {"Start: "}
          {moment(task.start_date).format("D MMMM Y, HH:mm")}
        </Text>
        <Text style={styles.taskText4}>
          {"Koniec: "}
          {moment(task.end_date).format("D MMMM Y, HH:mm")}
        </Text>
      </View>
    ) : (
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.taskText4}>
          {moment(task.start_date).format("HH:mm")}
          {" - "}
        </Text>
        <Text style={styles.taskText4}>
          {moment(task.end_date).format("HH:mm")}
        </Text>
      </View>
    );
  };

  sortByKey = (array, key) => {
    return array.sort(function(a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  };

  groupByDate = data => {
    return data.reduce(function(group, object) {
      group[object.key] = group[object.key] || [];
      group[object.key].push(object);
      return group;
    }, {});
  };

  translateTasks = (tasks, cards) => {
    var newTasks = [];
    for (var card in cards) {
      if (cards.hasOwnProperty(card)) {
        tasks.forEach(function(task) {
          var start = moment(task.start_date.substring(0, 10)).format(
            "YYYY-MM-DD"
          );
          var end = moment(task.end_date.substring(0, 10)).format("YYYY-MM-DD");
          if (cards[card] >= start && cards[card] <= end) {
            newTasks = [...newTasks, { key: cards[card], ...task }];
          }
        });
      }
    }
    return newTasks;
  };

  createList = days => {
    var translated = this.translateTasks(
      this.sortByKey(store.getState().user.tasks, "start_date"),
      days
    );
    const grouped = this.groupByDate(translated);
    var views = [];
    for (var key in days) {
      if (days.hasOwnProperty(key)) {
        if (grouped.hasOwnProperty(days[key])) {
          views.push(
            <View key={days[key]} style={styles.dayTile}>
              <View style={{ paddingLeft: 8, paddingVertical: 15 }}>
                <Text style={styles.dayHeader}>
                  {moment(days[key]).format("D MMMM Y")}
                </Text>
              </View>
              <ScrollView>{this.createDay(grouped[days[key]])}</ScrollView>
            </View>
          );
        } else {
          views.push(
            <View key={days[key]} style={styles.dayTile}>
              <View style={{ paddingLeft: 8, paddingVertical: 15 }}>
                <Text style={styles.dayHeader}>
                  {moment(days[key]).format("D MMMM Y")}
                </Text>
              </View>
              <ScrollView>
                <Text>Nie masz zadań na ten dzień</Text>
              </ScrollView>
            </View>
          );
        }
      }
    }
    return views;
  };

  createDay = tasks => {
    return tasks
      .sort((a, b) => a.start_date > b.start_date)
      .map(task => {
        var status = moment(task.start_date).isAfter(moment())
          ? 1
          : moment(task.end_date).isAfter(moment())
          ? 2
          : 3;
        var periodic = task.start_date === task.end_date ? false : true;
        return (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Task", {
                task: task
              });
            }}
          >
            <View
              key={task.date}
              style={{
                ...this.chooseTileStyle(status),
                ...this.getColor(task.priority)
              }}
            >
              <Text style={{ ...this.chooseTextStyle(status) }}>
                {task.body}
              </Text>
              {this.isPeriodic(task, periodic)}
            </View>
          </TouchableOpacity>
        );
      });
  };

  dateList = tasks => {
    var days = [];
    tasks.forEach(function(task) {
      var start = task.start_date.substring(0, 10);
      var end = task.end_date.substring(0, 10);
      for (var m = moment(start); m.diff(end, "days") <= 0; m.add(1, "days")) {
        days = [...days, m.format("YYYY-MM-DD")];
      }
    });
    return days.sort();
  };

  distinctDateCount = tasks => {
    const dates = this.dateList(tasks);
    var dateCount = {};
    var current = null;
    var cnt = 1;
    for (var i = 1; i <= dates.length; ++i) {
      if (dates[i] !== current) {
        dateCount[dates[i - 1]] = { key: dates[i - 1], count: cnt };
        current = dates[i];
        cnt = 1;
      } else {
        cnt++;
      }
    }
    return dateCount;
  };

  dotList = tasks => {
    const dates = this.distinctDateCount(tasks);
    var dots = {};
    for (var date in dates) {
      if (dates.hasOwnProperty(date)) {
        dots[date] = {
          key: date,
          dots: []
        };
        for (var i = 0; i < dates[date].count; ++i) {
          dots[date].dots = [...dots[date].dots, { color: "#aaa" }];
        }
      }
    }

    return dots;
  };

  nonamefunction = dates => {
    var datelist = Object.keys(dates).map(function(key) {
      return key;
    });
    var start = moment(moment(datelist[0]));
    start.subtract(90, "days");
    var end = moment(moment(datelist[datelist.length - 1]));
    end.add(90, "days");
    var days = [];
    for (var m = start; m.diff(end, "days") <= 0; m.add(1, "days")) {
      days = [...days, m.format("YYYY-MM-DD")];
    }
    return { ...days };
  };

  render() {
    var days = this.dotList(store.getState().user.tasks);
    var cards = this.nonamefunction(days);
    var index = this.findIndexOfDate(cards);
    return (
      <View style={styles.container}>
        <Swiper
          index={index}
          loop={false}
          showsPagination={false}
          style={styles.swiper}
        >
          {Object.keys(cards).length ? (
            this.createList(cards)
          ) : (
            <View style={{ flex: 1, alignItems: "center", paddingTop: 20 }}>
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
  taskText4: {
    color: "#888",
    fontSize: 15
  }
});
