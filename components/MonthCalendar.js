import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import AddButton from "./AddButton";
import moment from "moment";

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
          dots[date].dots = [...dots[date].dots, { color: "#999" }];
        }
      }
    }
    return dots;
  };

  render() {
    var dots = this.dotList(store.getState().user.tasks);
    return (
      <View style={styles.container}>
        <View style={{ flex: 6, alignItems: "stretch", margin: 10, elevation: 1, backgroundColor: "#fff" }}>
          <Calendar
            firstDay={1}
            style={{
              height: 300
            }}
            theme={{
              backgroundColor: "#f5f5f6",
              calendarBackground: "#fff",
              textSectionTitleColor: "grey", //dni tygodnia
              selectedDayBackgroundColor: "#00adf5",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#ff8833", //dzisiaj
              dayTextColor: "#565554", // dni
              textDisabledColor: "#b6c1cd", // dni spoza miesiąca
              dotColor: "black",
              selectedDotColor: "#ffffff",
              arrowColor: "#ff9800",
              monthTextColor: "#ff9800",
              textDayFontFamily: "Roboto-Light",
              textMonthFontFamily: "Roboto-Light",
              textDayHeaderFontFamily: "Roboto-Light",
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16
            }}
            onDayPress={day => {
              this.props.navigation.navigate("Day", { day: day.dateString });
            }}
            markedDates={dots}
            // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
            markingType="multi-dot"
          />
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
    backgroundColor: "#f5f5f6"
  }
});
