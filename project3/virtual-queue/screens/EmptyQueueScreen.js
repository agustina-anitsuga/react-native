import React from 'react';
import { StyleSheet, Text, Button, View, ScrollView, Linking } from 'react-native';

import {styles} from './StyleSheet'


export default class EmptyQueueScreen extends React.Component {

	constructor( props ){
		super(props);
		console.log('EmptyQueueScreen.constructor');
		console.log(props);
	}

	createQueue = () => {
		this.props.navigation.navigate('CreateQueue');
	}

	render() {
	  return (
	  	<View style={styles.emptyContainer}>
	  		<Text style={styles.infoMessage}>Do not have your customers wait in line</Text>
	  		<Button style={styles.button} title='Create a Virtual Queue' onPress={ this.createQueue } />
		</View>
	  );
	}
}