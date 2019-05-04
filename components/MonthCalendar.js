import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Icon from "react-native-vector-icons/Ionicons";

LocaleConfig.locales["pl"] = {
  monthNames: [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień"
  ],
  monthNamesShort: [
    "Sty",
    "Lut",
    "Mar",
    "Kwi",
    "Maj",
    "Cze",
    "Lip",
    "Sie",
    "Wrz",
    "Paź",
    "Lis",
    "Gru"
  ],
  dayNames: [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota"
  ],
  dayNamesShort: ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "Sb"]
};

LocaleConfig.defaultLocale = "pl";

export default class MonthCalendar extends Component {
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

  render() {
    const dotArray = [{ color: "blue" }, { color: "red" }, { color: "green" }];
    return (
      <View style={styles.container}>
        <View style={{ flex: 6, alignItems: "stretch" }}>
          <Calendar
            firstDay={1}
            style={{
              height: 300
            }}
            theme={{
              backgroundColor: "#333333",
              calendarBackground: "#333333",
              textSectionTitleColor: "#b6c1cd",
              selectedDayBackgroundColor: "#00adf5",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "orange",
              dayTextColor: "#d9e1e8",
              textDisabledColor: "#555555",
              dotColor: "#00adf5",
              selectedDotColor: "#ffffff",
              arrowColor: "orange",
              monthTextColor: "orange",
              textDayFontFamily: "Roboto-Light",
              textMonthFontFamily: "Roboto-Light",
              textDayHeaderFontFamily: "Roboto-Light",
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16
            }}
            markedDates={{
              "2019-05-25": {
                dots: [
                  dotArray[0],
                  dotArray[2],
                  dotArray[1],
                  dotArray[0],
                  dotArray[2]
                ]
              },
              "2019-05-26": {
                dots: [dotArray[2], dotArray[0]]
              }
            }}
            // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
            markingType="multi-dot"
          />
        </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    backgroundColor: "#2a2a2a"
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
