import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import AddButton from "./AddButton";

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
  state = {
    glob: 0,
    dotArray: [ // TODO: widoczność na tle
      { color: "#ff8080" },
      { color: "#ffff80" },
      { color: "#0080ff" },
      { color: "#80ff80" },
      { color: "#ff8040" },
      { color: "#80ffff" },
      { color: "#ff80c0" },
      { color: "#00ff80" },
      { color: "#0080c0" },
      { color: "#ff80ff" },
      { color: "#8080ff" },
      { color: "#00ffff" }
    ]
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
      group[object.start_date.substring(0, 10)] =
        group[object.start_date.substring(0, 10)] || [];
      group[object.start_date.substring(0, 10)].push(object);
      return group;
    }, {});
  };

  fun = len => {
    var tab = [];
    for (var i = 0; i < len; ++i) {
      tab.push(
        this.state.dotArray[this.state.glob++ % this.state.dotArray.length]
      );
    }
    return tab;
  };

  createList = days => {
    for (var key in days) {
      if (days.hasOwnProperty(key)) {
        const len = days[key].length;
        days[key] = {
          dots: this.fun(len < 6 ? len : 5)
        };
      }
    }
  };

  render() {
    const dotList = this.groupByDate(
      this.sortByKey(store.getState().user.tasks, "start_date")
    );
    this.createList(dotList);
    return (
      <View style={styles.container}>
        <View style={{ flex: 6, alignItems: "stretch" }}>
          <Calendar
            firstDay={1}
            style={{
              height: 300
            }}
            theme={{
              backgroundColor: "#f5f5f6",
              calendarBackground: "#f5f5f6",
              textSectionTitleColor: "grey",//dni tygodnia
              selectedDayBackgroundColor: "#00adf5",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#ff8833",//dzisiaj
              dayTextColor: "#565554",// dni
              textDisabledColor: "#b6c1cd", // dni spoza miesiąca
              dotColor: "#00adf5",
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
            markedDates={dotList}
            // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
            markingType="multi-dot"
          />
        </View>
        <AddButton navigation={this.props.navigation} />
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
