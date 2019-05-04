import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    mColor: "white",
    wColor: "grey",
    dColor: "white",
    aColor: "grey"
  };

  componentDidMount() {
    switch (this.props.current) {
      case "Month":
        this.setState({ mColor: "orange" });
        break;
      case "Week":
        this.setState({ wColor: "orange" });
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
          disabled={true}
          style={{ flex: 1 }}
          onPress={() => this.props.navigation.navigate("Week")}
        >
          <View style={styles.iconView}>
            <Icon
              name="calendar-week"
              size={30}
              style={{ color: this.state.wColor }}
            />
            <Text
              style={{
                color: this.state.wColor,
                fontSize: 10,
                fontFamily: "Roboto-Bold"
              }}
            >
              Tydzień
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => this.props.navigation.navigate("Day")}
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
    backgroundColor: "#3a3a3a"
  },
  iconView: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
});
