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
  componentDidMount() {
    if (store.getState().task.body) {
      store.getState().user.tasks.push(store.getState().task);
      store.getState().task = {};
    }
  }

  render() {
    const vacation = {
      key: "vacation",
      color: "red",
      selectedDotColor: "blue"
    };
    const massage = { key: "massage", color: "blue", selectedDotColor: "blue" };
    const workout = { key: "workout", color: "green" };
    return (
      <View style={styles.container}>
        <View style={{ flex: 6, alignItems: "stretch" }}>
          <Calendar
            firstDay={1}
            style={{
              height: 350
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
                dots: [vacation, massage, workout],
                selected: true,
                selectedColor: "red"
              },
              "2019-05-26": { dots: [massage, workout], disabled: true }
            }}
            markingType={"multi-dot"}
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
    paddingTop: 50,
    backgroundColor: "#2a2a2a"
  },
  text: {
    color: "white"
  }
});
