import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
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
              textDayFontFamily: "monospace",
              textMonthFontFamily: "monospace",
              textDayHeaderFontFamily: "monospace",
              textMonthFontWeight: "bold",
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16
            }}
          />
        </View>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <Button
            title="wróc do logowania"
            onPress={() => this.props.navigation.navigate("Login")}
            color="#ff8833"
          />
        </View>
        <View
          style={{
            flex: 1,
            padding: 5,
            marginLeft: 285
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 60,
              height: 60,
              backgroundColor: "orange",
              borderRadius: 50
            }}
          >
            <Icon name={"md-add"} size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default MonthCalendar;

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
