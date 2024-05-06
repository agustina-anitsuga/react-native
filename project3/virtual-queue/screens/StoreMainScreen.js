import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import QueueScreen from './QueueScreen';
import EmptyQueueScreen from './EmptyQueueScreen';


class StoreMainScreen extends React.Component {

	static propTypes = {
	    id: PropTypes.string,
	}

	constructor( props ){
		super(props);
		console.log('StoreMainScreen.constructor');
		console.log(props);
	}

	render() {
		if( !this.props.id ) {
			return ( <EmptyQueueScreen navigation={this.props.navigation} /> );
		} else {
			return ( <QueueScreen navigation={this.props.navigation} /> );
		}
	}
};

const mapStateToProps = state => ({
  	id: state.store.id,
})

export default connect(mapStateToProps)(StoreMainScreen)
