import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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

class MonthCalendar extends Component {
  render() {
    return (
      <View style={styles.container}>
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
            todayTextColor: "#00adf5",
            dayTextColor: "#2d4150",
            textDisabledColor: "#d9e1e8",
            dotColor: "#00adf5",
            selectedDotColor: "p",
            arrowColor: "orange",
            monthTextColor: "blue",
            textDayFontFamily: "monospace",
            textMonthFontFamily: "monospace",
            textDayHeaderFontFamily: "monospace",
            textMonthFontWeight: "bold",
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16
          }}
        />
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 100,
            height: 100,
            backgroundColor: "#fff",
            borderRadius: 50
          }}
        >
          <Icon name={"md-add"} size={30} color="#01a699" />
        </TouchableOpacity>
      </View>
    );
  }
}
export default MonthCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center"
  },
  text: {
    color: "white"
  }
});
