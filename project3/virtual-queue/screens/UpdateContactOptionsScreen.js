import React from 'react';
import { StyleSheet, Text, TextInput, Button, View, ScrollView } from 'react-native';
import CheckBox from 'react-native-check-box';
import InputSpinner from "react-native-input-spinner";
import { AntDesign } from '@expo/vector-icons'; 
import * as Device from 'expo-device';

import { styles } from './StyleSheet';


function guessCustomerNameIfNoneAvailable(name){
	let ret = name ;
	if( ret === '' ){
		if( Device.brand === 'Apple' ){
			ret = Device.deviceName;
			if( !(ret==='') ){
				ret = ret.replace('iPhone','');
				ret = ret.replace('iphone','');
				ret = ret.trim();
			}
		}
	} 
	return ret;
}

export default class UpdateContactOptionsScreen extends React.Component {

	constructor( props ){
		super(props);
		this.state = {
		    name: guessCustomerNameIfNoneAvailable(''),
		    phone: '',
		    ischecked: false,
		    alertMinutesBeforeTurn: 5,
		};
	}

	updateName = (name) => {
		this.setState({name});
	}

	updatePhone = (phone) => {
		this.setState({phone});
	}

	updateMakePhoneVibrate = () => {
		this.setState(prevState => ({
          ischecked: !prevState.ischecked
      	}));
	}

	updateAlertMinutesBeforeTurn = (alertMinutesBeforeTurn) => {
		this.setState({alertMinutesBeforeTurn});
	}

	updateContactOptions = () => {
		// do update
		this.props.navigation.navigate('CustomerMain');
	}

	render() {
	  return (
	  	<ScrollView style={styles.container}>
			<View style={styles.dataGroup}>
				<Text style={styles.text}>Contact me</Text>
				<View style={styles.row}>
					<TextInput style={styles.textInput100} 
							placeholder={'Name'} 
							textContentType='name' 
							autoCompleteType='name' 
							value={this.state.name} 
							onChangeText={ (name) => this.updateName(name) }/>
				</View>
				<View style={styles.row}>
					<TextInput style={styles.textInput100} 
							placeholder={'Phone'} 
							keyboardType='phone-pad' 
							textContentType='telephoneNumber' 
							autoCompleteType='tel'
							value={this.state.phone}
							onChangeText={ (phone) => this.updatePhone(phone) }/>
				</View>
			</View>
			<View style={styles.dataGroup}>
				<Text style={styles.text}>Alerts</Text>
				<View style={styles.row}>
					<Text style={styles.text50VA}>Make my phone vibrate</Text>
					<CheckBox style={styles.checkbox} 
							title='Make phone vibrate' 
							key={this.state.ischecked} 
							isChecked={this.state.ischecked} 
							onClick={ () => { this.updateMakePhoneVibrate() } } 
							checkedImage={<AntDesign name="check" size={20} color="black" />}
							unCheckedImage={<AntDesign name="close" size={20} color="black" />}/>
				</View>
				{ this.state.ischecked &&
				<View style={styles.row}>
					<Text style={styles.text50VA}>How many minutes before your turn?</Text>
					<InputSpinner
						type='real'
						max={50}
						min={0.5}
						step={0.5}
						value={this.state.alertMinutesBeforeTurn}
						colorLeft='transparent'
						colorRight='transparent'
						buttonRightImage={<AntDesign name="pluscircleo" size={25} color="gray" />}
						buttonLeftImage={<AntDesign name="minuscircleo" size={25} color="gray" />}
						onChange={(num) => { this.updateAlertMinutesBeforeTurn(num) }}/>
				</View>
				}
			</View>
			<View style={styles.timer}>
				<Button title='Update' onPress={this.updateContactOptions} />
			</View>
		</ScrollView>
	  );
	}
};

