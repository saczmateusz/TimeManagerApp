import React, { Component } from "react";
import { connect } from 'react-redux';
import Icon from "react-native-vector-icons/Ionicons";
import moment from 'moment'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Navbar from "../components/Navbar";

const archiveTaskCard = task =>
  <TouchableOpacity
  onPress={() => {
    this.props.navigation.navigate("Task", {
      task: task
    });
  }}
  >
  <View
    key={task.date}
    style={{
      backgroundColor: "#fff",
      flex: 1,
      paddingHorizontal: 15,
      paddingVertical: 15,
      marginBottom: 10,
      borderRadius: 2,
      elevation: 1
    }}
  >
    <Text style={{         
      color: "#333",
      fontSize: 19 
    }}>
      {task.body}
    </Text>
    <Text style={{         
      color: "#777",
      fontSize: 12 
    }}>
      {moment(task.end_date).fromNow()}
    </Text>
  </View>
  </TouchableOpacity>

class ArchiveView extends Component {
  constructor() {
    super()

    this.state = {
      tasks: []
    }
  }
  componentDidMount() {
    const now = moment();

    const tempTasks = this.props.tasks.filter(
      task => moment(task.end_date).isBefore(now)
    )

    this.setState({
      tasks: tempTasks
    })
  }
  listTasks() {
    const tasks = this.state.tasks.map(
      task => archiveTaskCard(task)
    )

    return tasks
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.banner}>
          <View style={{ flex: 5, alignItems: "center" }}>
            <Text style={styles.header}>Terminarz</Text>
          </View>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => this.props.navigation.navigate("User")}
          >
            <View
              style={{
                height: 50,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Icon name="md-person" size={30} style={{ color: "white" }} />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 7,
            paddingHorizontal: 23
          }}
        >
          <View style={{ paddingVertical: 20 }}>
            <Text style={styles.dayHeader}>
              Archiwum
            </Text>
          </View>
          <ScrollView>
            {
              this.state.tasks.length ? this.listTasks() : <Text>Nie masz zadań na ten dzień</Text>
            }      
          </ScrollView>

        </View>
        <Navbar navigation={this.props.navigation} current={"Archive"} />
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
    fontSize: 25,
    paddingLeft: 55
  },
  dayHeader: {
    color: "#555",
    fontSize: 20,
    alignItems: "flex-start"
  },
});


const mapStateToProps = state => ({
  tasks: state.user.tasks
})

const mapActionsToProps = {

}

export default connect(mapStateToProps, mapActionsToProps)(ArchiveView);
