import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

class TimeInput extends React.Component {

  constructor( props ){
      super( props )

      const minutes = this.minutes(props.timeInSeconds);
      const seconds = this.seconds(props.timeInSeconds);
      
      this.state = {
        timeInSeconds: props.timeInSeconds,
        minutes: minutes,
        seconds: seconds,
        onChange: props.onChange,
      }
  }

  minutes = (timeInSeconds) => {
      return this.format(Math.trunc(timeInSeconds / 60))
  }

  seconds = (timeInSeconds) => {
      return this.format(timeInSeconds % 60);
  }

  format = (number) => {
      return parseInt(number).toString().padStart(2,'0')
  }

  isSecondsValid = (text) => {
      return ( +text >= 0 ) && ( +text <60 )
  }

  isMinutesValid = (text) => {
      return ( +text >= 0 )
  }

  componentDidUpdate(prevProps, prevState){
      if( prevState.timeInSeconds!=this.state.timeInSeconds){
          this.state.onChange(this.state.timeInSeconds);
      }
  }

  updatedMinutes = (text) => {
      if( this.isMinutesValid(text) ){
          const time = (parseInt(text)*60) + parseInt(this.state.seconds);
          this.setState(prevState => ({
              minutes: this.format(text),
              timeInSeconds: time
          }));  
      }
  }

  updatedSeconds = (text) => {
      if( this.isSecondsValid(text) ){
          const time = (parseInt(this.state.minutes)*60) + parseInt(text);
          this.setState(prevState => ({
              seconds: this.format(text),
              timeInSeconds: time
          }))
      }
  }

  render() {
    return (
            <View style={styles.timeInputView}>
                  <Text style={styles.timeInputText}>Mins</Text>
                  <TextInput style={styles.timeInput} value={this.state.minutes} onChangeText={text => this.updatedMinutes(text)} keyboardType="numeric"/>
                  <Text style={styles.timeInputText}>Secs</Text>
                  <TextInput style={styles.timeInput} value={this.state.seconds} onChangeText={text => this.updatedSeconds(text)} keyboardType="numeric"/>
            </View>
    );
  }

} 

const styles = StyleSheet.create({
  timeInputView: {
    flexDirection: 'row',
    justifyContent: "space-around",
    margin: 3,
  },    
  timeInput: {
    borderWidth: 1,
    margin: 1,
    width: 50,
  },      
  timeInputText: {
    fontSize: 12,
    margin: 1,
  },
});

export default TimeInput;

