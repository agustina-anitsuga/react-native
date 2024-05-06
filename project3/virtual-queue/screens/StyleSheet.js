import React from 'react';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  emptyContainer: {
  	flex: 1,
  	alignItems: 'center',
  	justifyContent: 'center',
  },
  container: {
  	flex: 1,
  },
  button:{
    alignSelf: 'center',
    padding: 10,
    margin: 10,    
  },
  buttonRow:{
  	padding: 5,
  	marginLeft: 5,
  },
  infoMessage: {
  	padding: 5,
  },
  text: {
    width: '100%',
  },
  text50: {
  	width: '50%',
  },
  text50VA: {
    width: '50%',
    padding: 10,
  },
  checkbox: {
    borderWidth: 1,
    padding: 10,
    borderColor: 'gray',
    borderRadius: 5,
  },  
  textInput: {
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    width: '90%',
  },  
  textInput50: {
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    width: '50%',
  },  
  textInput100: {
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    width: '100%',
  },    
  row: {
  	padding: 5,
  	marginLeft: 5,
  	marginRight: 5,
	  flexDirection: 'row',
	  alignItems: 'stretch',
	  alignContent: 'center',
  },
  dataGroup: {
  	borderWidth: 1,
  	borderColor: 'gray',
  	borderRadius: 5,
  	marginTop: 5,
  	marginRight: 10,
  	marginLeft: 10,
  	padding: 5,
  },
  qrCode: {
  	alignItems: 'center',
  	padding: 5,
  },
  timer: {
    padding: 5,
    marginLeft: 5,
    marginRight: 10,
    marginTop: 10,
    alignContent: 'center',
  },
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
  queue: {
    padding: 5,
    marginLeft: 5,
    marginRight: 10,
    marginTop: 10,
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'center', 
  },
});