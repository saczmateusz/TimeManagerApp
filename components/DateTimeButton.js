import React, { Component } from "react";
import { Button, View, Text } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";

export default class DateTimeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      date: "",
      datetime: null
    };
  }

  showDateTimePicker = () => {
    if(this.props.disabled) return;
    this.setState({ isVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isVisible: false });
  };

  handleDatePicked = datetime => {
    if(moment(datetime).isBefore(this.props.mindate)) {
      this.hideDateTimePicker();
      this.showDateTimePicker();
      alert(this.props.message)

      return
    }

    this.setState({ datetime: datetime, date: moment(datetime).format("YYYY-MM-DD HH:mm:ss") });
    this.props.onSelectDate(this.state.date);
    this.hideDateTimePicker();
  };

  render() {
    return (
      <>
        <Button
          title={this.state.date ? this.state.date : this.props.name}
          onPress={this.showDateTimePicker}
          color={this.props.disabled ? "#ffb580" : "#ff8833"}
        />
        <DateTimePicker
          isVisible={this.state.isVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          mode={"datetime"}
          datePickerModeAndroid={"spinner"}
          date={moment(this.props.mindate).toDate()}
        />
      </>
    );
  }
}
