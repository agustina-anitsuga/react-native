import React from 'react';
import { StyleSheet, Text, Button, View, Image, ScrollView, PropTypes} from 'react-native';

import { connect } from 'react-redux';

import { StartQueueingScreen, YourTurnScreen } from './QueueingScreen';
import QueueingScreen from './QueueingScreen';

class CustomerMainScreen extends React.Component {

	constructor( props ){
		super(props);
	}

	shouldDisplayStartQueueingScreen = () => {
		return !this.props.storeName;
	}

	shouldDisplayYourTurnScreen = () => {
		return this.props.placeInQueue === 0 ;
	}

	render() {
		if( this.shouldDisplayStartQueueingScreen() ) {
			return ( <StartQueueingScreen navigation={this.props.navigation} /> );
		} 
		if ( this.shouldDisplayYourTurnScreen() ) {
			return ( <YourTurnScreen navigation={this.props.navigation} /> );
		} else {
			return ( <QueueingScreen navigation={this.props.navigation} /> );
		}
	}

};

function storeName(state){
	return state.subscription.storeName;
}

const mapStateToProps = state => ({
  storeName: state.subscription.storeName,
  placeInQueue: state.subscription.placeInQueue,
});

export default connect(mapStateToProps)(CustomerMainScreen);