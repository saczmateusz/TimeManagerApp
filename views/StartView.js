import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from "react-native";
import LoadingScreen from './../components/LoadingScreen'
import { connect } from 'react-redux'
import { setUser } from "../reducers/actions/user";
import { setToken, unsetUser } from "../reducers/actions/token";
import axios from 'axios'
import moment from "moment"

class DayView extends Component {
    state = {
        user: null
    }
    componentDidMount() {
        if(this.props.user.username) {
            this.props.navigation.navigate("Day", {
                day: moment().format("YYYY-MM-DD"),
                ignorePush: true
            });
            return
        }

        this.checkSavedUser()
    }
    loginSubmit() {   
      axios
        .post("/auth/login", {
          username: this.state.user.username,
          password: this.state.user.password
        })
        .then(response => {
          this.props.setUser(response.data.user);
          this.props.setToken(response.data.token);

          axios.defaults.headers.common["Authorization"] = `Bearer ${
            response.data.token
          }`;

          this.props.navigation.navigate("Day", {
            day: moment().format("YYYY-MM-DD"),
            ignorePush: true
          });
        })
        .catch(error => {
            this.props.navigation.navigate("Login", { ignorePush: true })
        });
  }

  async checkSavedUser() {
    let user = await AsyncStorage.getItem("USER");
    user = JSON.parse(user);
    if (!user) {
        this.props.navigation.navigate("Login", { ignorePush: true })
        return
    }

    this.setState({user}, this.loginSubmit)
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.banner}>
          <View style={{ flex: 5, alignItems: "center" }}>
          </View>
        </View>
        <View style={{ flex: 7 }}>
        <LoadingScreen />

        </View>
        <View style={styles.navbar}>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f5f5f6"
  },
  banner: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ff9800"
  },
  header: {
    color: "white",
    fontSize: 25
  },
  navbar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#e8e8e8"
  }
});

const mapStateToProps = state => ({
    user: state.user,
    token: state.token
});
  
const mapActionsToProps = {
    setUser,
    unsetUser,
    setToken
};

export default connect(mapStateToProps, mapActionsToProps)(DayView);