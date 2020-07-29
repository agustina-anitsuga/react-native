import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import Timer from './Timer.js';
import TimeInput from './TimeInput.js';
import vibrate from './utils/vibrate.js';

const PomodoroConfig = props => (
      <View style={styles.config}>
        <View style={styles.configPanel}>
          <View style={styles.configPanelRow}>
            <Text style={styles.configPanelText} >Work Interval:</Text>
            <TimeInput timeInSeconds={props.workInterval} onChange={ timeInSeconds => props.workIntervalChanged(timeInSeconds) } />
          </View>
          <View style={styles.configPanelRow}>
            <Text style={styles.configPanelText}>Rest Interval:</Text>
            <TimeInput timeInSeconds={props.restInterval} onChange={ timeInSeconds => props.restIntervalChanged(timeInSeconds) } />
          </View>  
        </View>  
      </View>
);

PomodoroConfig.propTypes = {
    workInterval: PropTypes.number,
    restInterval: PropTypes.number,
    workIntervalChanged: PropTypes.func,
    restIntervalChanged: PropTypes.func,
};

class PomodoroTimer extends React.Component {

  constructor( props ) {
    super( props )
    this.state = {
      working: true,
      workInterval: props.workInterval,
      restInterval: props.restInterval,
    }
  }

  setWorkInterval = ( interval ) => {
      this.setState(prevState => ({
          workInterval: interval
      }))   
  }

  setRestInterval = ( interval ) => {
      this.setState(prevState => ({
          restInterval: interval
      }));   
  }

  updateWorkingState = () => {
      vibrate();
      this.setState(prevState => ({
          working: !prevState.working
      }))
  }

  timerLabel = () => {
      return (this.state.working)? 'Working' : 'Resting' ; 
  }

  timerKey = () => {
      return this.timerLabel() + ((this.state.working)? this.state.workInterval : this.state.restInterval) ; 
  }

  timerCount = () => {
      return (this.state.working)? this.state.workInterval : this.state.restInterval ;    
  }

  render() {
      return (
          <KeyboardAvoidingView behavior='padding'>
              <Timer key={this.timerKey()} label={this.timerLabel()} count={this.timerCount()} onZeroCount={this.updateWorkingState}/> 
              <PomodoroConfig workInterval={this.state.workInterval} 
                              restInterval={this.state.restInterval} 
                              workIntervalChanged={ workInterval => this.setWorkInterval(workInterval) }
                              restIntervalChanged={ restInterval => this.setRestInterval(restInterval) } 
                              />
          </KeyboardAvoidingView>  
        )  
  }
}

const styles = StyleSheet.create({
  config: {
    alignSelf: 'center',
    margin: 20, 
  },
  configPanel: {
    margin: 5,
  },    
  configPanelRow: {
    flexDirection: 'row',
    justifyContent: "space-around",
    margin: 5,
  },    
  configPanelText: {
    fontSize: 12,
    fontWeight: 'bold',
    margin: 5,
  },
});

export default PomodoroTimer;

