import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import PomodoroTimer from './PomodoroTimer.js';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.identity}>
          <Image source={require('./assets/tomato.png')} style={styles.logo}/>
          <Text style={styles.title}>Pomodoro Timer</Text>
      </View> 
      <PomodoroTimer workInterval={10} restInterval={3}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  identity: {
    flexDirection: 'row',
  },
  logo: {
    width: 50, 
    height: 50,
  },
  title: {
    fontSize: 32,
    justifyContent: 'flex-start',
    padding: 10,
  },
});
