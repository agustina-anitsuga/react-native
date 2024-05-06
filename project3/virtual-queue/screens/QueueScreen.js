import React from 'react';
import { StyleSheet, Text, Button, View, ScrollView, Linking } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { connect } from 'react-redux'
import { reset, refreshQueue, nextCustomer } from '../redux/actions';

import { styles } from './StyleSheet'


class QueueScreen extends React.Component {

	constructor( props ){
		super(props);
	}

	contactCurrentCustomer = () => {
		const phone = this.props.currentCustomer.phone;
		const url = `http://api.whatsapp.com/send?phone=${phone}` ;
		Linking.openURL( url );
	}

	nextCustomer = () => {
		this.props.nextCustomer( this.props.queue.id );
	}

	reset = () => { 
		this.props.reset( this.props.queue.id );
	}

	refresh = () => { 
		this.props.refreshQueue( this.props.queue.id );
	}

	render() {
		console.log('QueueScreen.render')
		let currentCustomer = this.props.currentCustomer;
		let queue = this.props.queue;
		console.log(currentCustomer);
		return (
				<ScrollView style={styles.container}>
					{ currentCustomer && 
					<View style={styles.dataGroup}>
						<View style={styles.row}>
							<Text style={styles.text50}>Current Customer: </Text>
							<Text style={styles.text50}>{currentCustomer.name}</Text>
						</View>
						<View style={styles.row}>
							<Text style={styles.text50}>Arrival Time: </Text>
							<Text style={styles.text50}>{currentCustomer.arrivalTime}</Text>
						</View>
						<View style={styles.row}>
							<Text style={styles.text50}>Wait Time: </Text>
							<Text style={styles.text50}>{currentCustomer.waitTime} minutes</Text>
						</View>
						{ currentCustomer.phone &&  
						<View style={styles.buttonRow}>
							<Button style={styles.button} title='Contact Customer' onPress={ this.contactCurrentCustomer } />
						</View>
						}	
					</View>
					}
					<View style={styles.dataGroup}>
						<View style={styles.row}>
							<Text style={styles.text50}>Average Service Time: </Text> 
							<Text style={styles.text50}>{queue.avgServiceTime} minutes</Text>  
						</View>
						<View style={styles.row}>
							<Text style={styles.text50}>Average Wait Time: </Text> 
							<Text style={styles.text50}>{queue.avgWaitTime} minutes</Text> 
						</View>
						<View style={styles.row}>
							<Text style={styles.text50}>Customers waiting: </Text> 
							<Text style={styles.text50}>{queue.customerCount}</Text> 
						</View>
						{ (queue.customerCount > 0) &&
						<View style={styles.buttonRow}>
							<Button style={styles.button} title='Next Customer' onPress={ this.nextCustomer } />
						</View>
						}	
					</View>
					<View style={styles.dataGroup}>
						<View style={styles.buttonRow}>
							<Text style={styles.text}>Let your customers get in line by scanning the below QR Code</Text>
							<View style={styles.qrCode}>
								<QRCode
								   value={ queue.qrData }
								   color={'black'}
								   backgroundColor={'transparent'}
								   size={200}
								   //logo={require('../../../embed_logo_file_path')} // or logo={{uri: base64logo}}
								   logoMargin={2}
								   logoSize={20}
								   logoBorderRadius={10}
								   logoBackgroundColor={'transparent'}/>
							</View>
						</View>
					</View>
					<View style={styles.dataGroup}>
						<View style={styles.buttonRow}>
							<Button style={styles.button} title='Refresh' onPress={ this.refresh } />
						</View>

						<View style={styles.buttonRow}>
							<Button style={styles.button} title='Reset' onPress={ this.reset } />
						</View>
					</View>
				</ScrollView>
		);
	}
};

function qrData( queueId, queueOwner ){
	return `${queueId}-${queueOwner}` ;
}

function mapModelToQueueProps( store ){
	return {
  		id: store.id,
  		owner: store.owner,
  		avgServiceTime: store.avgServiceTime,
	    avgWaitTime: store.avgWaitTime,
	    customerCount: store.customers ? store.customers.length : 0,
	    qrData: qrData( store.id, store.owner ),
  	}
}

function mapModelToCurrentCustomerProps( currentCustomer ){
	console.log('mapModelToCurrentCustomerProps');
	console.log(currentCustomer);
	return currentCustomer.name ? {
		name: currentCustomer.name,
		phone: currentCustomer.phone,
		arrivalTime: String(currentCustomer.arrivalTime),
		waitTime: currentCustomer.waitTime,
		} : undefined;
}

const mapStateToProps = state => ({
  queue: mapModelToQueueProps( state.store ),
  currentCustomer: mapModelToCurrentCustomerProps( state.currentCustomer ),
});

export default connect(mapStateToProps,{reset,refreshQueue,nextCustomer})(QueueScreen);

