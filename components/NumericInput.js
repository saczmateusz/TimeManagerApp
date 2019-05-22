import React, { Component } from "react";

import {
  TextInput
} from "react-native";

export default class NumericInput extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    value: ''
  };

  onChangeHandler(text) {
    let newText = ''
    let numbers = '0123456789'

    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i]
        }
    }
    this.setState({ value: newText })
    this.props.onChangeText(this.state.value)
  }


  render() {
    return (
        <TextInput
            onChangeText={val => this.onChangeHandler(val)}
            value={this.state.value}
            placeholder={this.props.placeholder}
            placeholderTextColor={this.props.placeholderTextColor}
            style={this.props.style}
            keyboardType="numeric"
      />
    );
  }
}
