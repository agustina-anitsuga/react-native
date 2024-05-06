import React from 'react';
import { StyleSheet, Text, Button, View, Image, ScrollView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons'; 

import {styles} from './StyleSheet';

const TYPE_SELF = 'SELF';
const TYPE_OTHER = 'OTHER';
const TYPE_MANY = 'MANY';

const COLOR_OTHERS = 'gray';
const COLOR_SELF = 'tomato';

const SIZE_PERSON_ICON = 40;
const SIZE_PEOPLE_ICON = 45;

const MAX_TO_DRAW_IN_FRONT = 7;
const MAX_TO_DRAW_IN_QUEUE = 8;


class VirtualQueueItem extends React.Component {

	constructor( props ){
		super(props);
	}

	render(){
		switch( this.props.type ){
		case TYPE_SELF: 
			return (<Ionicons name='md-person' size={SIZE_PERSON_ICON} color={COLOR_SELF}/> );
		case TYPE_OTHER:
			return (<Ionicons name='md-person' size={SIZE_PERSON_ICON} color={COLOR_OTHERS}/> );
		default:
			return (<Ionicons name='md-people' size={SIZE_PEOPLE_ICON} color={COLOR_OTHERS}/>);
		}
	}
}

export default class VirtualQueue extends React.Component {

	constructor( props ){
		super( props );
		let queue = [];
		let count = 0;
		let compressedFront = false;

		if ( props.placeInQueue > MAX_TO_DRAW_IN_FRONT ){
			queue.push( { type: TYPE_MANY, key: ++count } );
			compressedFront = true;
		} else {
			for( let i = 1; i< props.placeInQueue; i++ ){
				queue.push( { type: TYPE_OTHER, key: ++count } );	
			}
		}

		queue.push( { type: TYPE_SELF, key: ++count } );

		if ( !compressedFront ){
			if ( props.totalCustomersInQueue > MAX_TO_DRAW_IN_QUEUE ){
				queue.push( { type: TYPE_MANY, key: ++count } );
			} else {
				for( let i = props.placeInQueue; i< props.totalCustomersInQueue; i++ ){
					queue.push( { type: TYPE_OTHER, key: ++count } );	
				}
			}		
		} else {
			if ( props.totalCustomersInQueue === (props.placeInQueue+1) ){
				queue.push( { type: TYPE_OTHER, key: ++count } );	
			} else {
				queue.push( { type: TYPE_MANY, key: ++count } );	
			}
			
		}
		
		this.state = {queue};
	}

	render() {
		return (
			<View style={styles.queue}>
					<FontAwesome5 name='store' size={SIZE_PERSON_ICON} color={COLOR_OTHERS} />
					<Ionicons name='ios-arrow-round-back' size={SIZE_PERSON_ICON} color={COLOR_OTHERS} style={ { marginLeft:5,marginRight:5 } } />
					{ 
						this.state.queue.map( (item) => <VirtualQueueItem type={item.type} key={item.key}/> )
					}
			</View>
		);
	}
}
