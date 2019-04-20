import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { connect } from "react-redux";

class AddTodo extends Component {
  state = {
    text: ""
  };

  AddTodo = text => {
    //redux store
    this.props.dispatch({ type: "ADD_TODO", text });
    this.setState({ text: "" });
  };

  render() {
    return (
      <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
        <TextInput
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          placeholder="tu dej notatkę"
          style={{
            borderWidth: 1,
            borderColor: "orange",
            backgroundColor: "orange",
            height: 50,
            flex: 1,
            padding: 5
          }}
        />
        <TouchableOpacity onPress={() => this.AddTodo(this.state.text)}>
          <View
            style={{
              height: 50,
              backgroundColor: "#eaeaea",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Ionicons
              name="md-add"
              size={30}
              style={{ color: "#de9595", padding: 10 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
export default AddTodo;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
