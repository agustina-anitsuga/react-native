import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class Timer extends React.Component {

  constructor( props ) {
    super( props )
    this.state = {
      label: props.label,
      duration: props.count,
      count: props.count,
      onZeroCount: props.onZeroCount,
      isStopped: true
    }
  }
  
  componentDidMount() {
    this.reset()
  }
  
  componentWillUnmount() {
    this.pause()
  }
  
  dec = () => {
    if( this.state.count <= 0 ){
      this.zeroCountReached()
    } else {
        this.setState(prevState => ({
          count: prevState.count - 1,
        }))
    }
  }

  zeroCountReached = () => {
    clearInterval(this.interval)
    this.state.onZeroCount()
  }

  reset = () => {
    this.setState(prevState => ({
      count: prevState.duration,
    }))
    if( !this.isStopped ){ 
      this.pause() 
    }
    this.resume()
  }

  pause = () => {
    clearInterval(this.interval)
    this.setState(prevState => ({
      isStopped: true,
    }))
  }

  resume = () => {
    this.interval = setInterval(this.dec, 1000)
    this.setState(prevState => ({
      isStopped: false,
    }))
  }

  minutes = () => {
    return Math.trunc(this.state.count/60)
  }

  seconds = () => {
    return this.state.count%60
  }

  format = (number) => {
    return number.toString().padStart(2,'0')
  }

  shouldDisplayPauseButton = () => {
    return !this.state.isStopped && (this.state.count > 0)
  }

  shouldDisplayResumeButton = () => {
    return this.state.isStopped && (this.state.count > 0)
  }

  render() { 
    return (
        <View>
          <Text style={styles.timerLabel}>{this.state.label}</Text>
          <View>
            <Text style={styles.timerCount}> { this.format(this.minutes()) } : { this.format(this.seconds()) } </Text> 
          </View> 
          <View style={styles.timerButtons}> 
            <Button title="reset" onPress={this.reset} />
            { this.shouldDisplayPauseButton() && <Button title="pause" onPress={this.pause} /> }
            { this.shouldDisplayResumeButton() && <Button title="resume" onPress={this.resume} /> }
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  timerLabel: {
    alignSelf: 'center',
  },
  timerCount: {
    fontSize: 48,
    alignSelf: 'center',
    padding: 10,
  },
  timerButtons: {
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: 'center',
  },
});

export default Timer;
