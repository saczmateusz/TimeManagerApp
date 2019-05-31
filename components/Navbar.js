import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    mColor: "#565554",
    dColor: "#565554",
    aColor: "grey"
  };

  componentDidMount() {
    switch (this.props.current) {
      case "Month":
        this.setState({ mColor: "orange" });
        break;
      case "Day":
        this.setState({ dColor: "orange" });
        break;
      case "Archive":
        this.setState({ aColor: "orange" });
        break;
    }
  }

  render() {
    return (
      <View style={styles.navbar}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => this.props.navigation.navigate("Month")}
        >
          <View style={styles.iconView}>
            <Icon
              name="calendar-blank"
              size={30}
              style={{ color: this.state.mColor }}
            />
            <Text
              style={{
                color: this.state.mColor,
                fontSize: 10,
                fontFamily: "Roboto-Bold"
              }}
            >
              Miesiąc
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() =>
            this.props.navigation.navigate("Day", {
              day: moment().format("YYYY-MM-DD")
            })
          }
        >
          <View style={styles.iconView}>
            <Icon
              name="calendar-today"
              size={30}
              style={{ color: this.state.dColor }}
            />
            <Text
              style={{
                color: this.state.dColor,
                fontSize: 10,
                fontFamily: "Roboto-Bold"
              }}
            >
              Dzień
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={true}
          style={{ flex: 1 }}
          onPress={() => this.props.navigation.navigate("Archive")}
        >
          <View style={styles.iconView}>
            <Icon
              name="archive"
              size={30}
              style={{ color: this.state.aColor }}
            />
            <Text
              style={{
                color: this.state.aColor,
                fontSize: 10,
                fontFamily: "Roboto-Bold"
              }}
            >
              Archiwum
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navbar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#e8e8e8"
  },
  iconView: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
});
