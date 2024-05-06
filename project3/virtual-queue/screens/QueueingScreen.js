import React from 'react';
import { StyleSheet, Text, Button, View, Image, ScrollView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons'; 

import { reset } from '../redux/actions';
import { connect } from 'react-redux';

import {styles} from './StyleSheet';
import Timer from './Timer'
import VirtualQueue from './VirtualQueue'


export class StartQueueingScreen extends React.Component {

	constructor( props ){
		super(props);
	}

	joinQueue = () => {
		this.props.navigation.navigate('JoinQueue');
	}

	render() {
	  return (
	  	<View style={styles.emptyContainer}>
	  		<Text style={styles.infoMessage}>Join a Virtual Queue</Text>
	  		<Button style={styles.button} title='Scan a QR Code' onPress={ this.joinQueue }/>
		</View>
	  );
	}
};

class QueueingScreen extends React.Component {

	constructor( props ){
		super(props);
		this.state = {
			subscription: {
				placeInQueue: 6,
				totalCustomerInQueue: 9,
			},
			contact: {
				name: 'Demo Customer 1',
				phone: '541150121626',
			},
			alerts: {
				makePhoneVibrate: true,
				numberMinutesBeforeTurn: 5,
			},
		}
	}

	reset = () => { 
		console.log('reset');
		this.props.reset( this.props.subscription.id );
	}

	refresh = () => { 
		console.log('refresh');
		//this.props.refreshQueue( this.props.subscription.id );
	}

	updateStats = () => {

	}

	updateContactOptions = () => {
		this.props.navigation.navigate('UpdateContactOptions');
	}

	requestLeaveQueueConfirmation = () => {
	    Alert.alert(
	      "Leaving Queue",
	      "Are you sure you want to leave the queue?",
	      [
	        {
	          text: "Stay",
	          onPress: () => { return false },
	          style: "cancel"
	        },
	        { text: "Leave", 
	          onPress: () => { return true },
	        }
	      ],
	      { cancelable: false }
	    );
	}

	leaveQueue = () => {
		if( this.requestLeaveQueueConfirmation() ){
			// remove queue subscription
			console.log('Leave queue');
		} 
	}

	render() {
	  return (
	  	<ScrollView style={styles.container}>
			<View style={styles.dataGroup}>
				<View style={styles.row}>
					<Text style={styles.text50}>Your place in the queue:</Text>
					<Text style={styles.text50}>{this.state.subscription.placeInQueue}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.text50}>Total customers in queue:</Text>
					<Text style={styles.text50}>{this.state.subscription.totalCustomerInQueue}</Text>
				</View>
				<View style={styles.timer}>
					<Timer label='Estimated wait time left' count={10*60} onZeroCount={this.updateStats}/> 
				</View>
				<VirtualQueue
					placeInQueue={this.state.subscription.placeInQueue} 
					totalCustomersInQueue={this.state.subscription.totalCustomerInQueue}/>
			</View>
			<View style={styles.dataGroup}>
				<View style={styles.row}>
					<Text style={styles.text50}>Make phone vibrate</Text>
					<Text style={styles.text50}>5 minutes before my turn</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.text50}>Contact me by Name </Text>
					<Text style={styles.text50}>Demo Customer 1</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.text50}>Contact me by Phone</Text>
					<Text style={styles.text50}>541150121626</Text>
				</View>
				<View style={styles.timer}>
					<Button title='Update Contact Options' onPress={this.updateContactOptions} />
				</View>
			</View>
			<View style={styles.dataGroup}>
				<View style={styles.row}>
					<Text style={styles.text}>Feeling impatient?</Text>
				</View>
				<View style={styles.buttonRow}>
					<Button style={styles.button} title='Refresh' onPress={ this.refresh } />
				</View>

				<View style={styles.buttonRow}>
					<Button style={styles.button} title='Reset' onPress={ this.reset } />
				</View>
			</View>
			<View style={styles.dataGroup}>
				<View style={styles.row}>
					<Text style={styles.text}>Need to leave?</Text>
				</View>
				<View style={styles.timer}>
					<Button title='Leave the queue' onPress={this.leaveQueue} />
				</View>
			</View>
		</ScrollView>
	  );
	}
};

export class YourTurnScreen extends React.Component {

	constructor( props ){
		super(props);
	}

	restart = () => {
		// reset subscription to queue
		this.props.navigation.navigate('CustomerMain');
	}

	render() {
	  return (
	  	<View style={styles.emptyContainer}>
	  		<View>
	  			<Text style={styles.infoMessage}>It is your turn!</Text>
	  		</View>
	  		<View>	
	  			<FontAwesome5 name="store" size={60} color="gray" />
	  		</View>
	  		<View>
	  			<Text style={styles.infoMessage}>Happy shopping</Text>
	  		</View>
	  		<View style={styles.buttonRow}>
	  			<Button style={styles.button} title='Press to queue again' onPress={ this.restart }/>
	  		</View>
		</View>
	  );
	}
};

function mapModelToQueueProps( subscription ){
	console.log( subscription );
	return subscription;
}

const mapStateToProps = state => ({
  subscription: mapModelToQueueProps( state.subscription )
});

export default connect(mapStateToProps,{reset})(QueueingScreen);


