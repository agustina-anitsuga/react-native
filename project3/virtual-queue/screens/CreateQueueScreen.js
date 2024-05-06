import React from 'react';
import { StyleSheet, Button, View, TextInput, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types'

import { styles } from './StyleSheet' ;

import { connect } from 'react-redux'
import { createQueue } from '../redux/actions';



class CreateQueueScreen extends React.Component {

	static propTypes = {
	    id: PropTypes.string,
	    owner: PropTypes.string,
	}

	constructor( props ){
		super(props);
		this.state = { storeName: props.owner || '' };
	}

	post = () => {
		if( this.validate() ) {
			const ret = this.props.createQueue( { storeName: this.state.storeName } );
			this.props.navigation.navigate('StoreMain');
		}
	}

	validate = () => {
		const storeName = this.state.storeName;
		return storeName && !(storeName==='') ;
	}

	updateStoreName( storeName ){
		this.setState({storeName});
	}

	render() {
		return (
				<KeyboardAvoidingView style={styles.emptyContainer}>
					<View style={styles.row}>
						<TextInput style={styles.textInput} 
				      			value={this.state.storeName} 
				      			placeholder={'Name of your store'} 
				      			onChangeText={ (storeName) => this.updateStoreName(storeName) } />
			      	</View>
			      	<View style={styles.row}>
			      		<Button style={styles.button} title='Create' onPress={ () => this.post() }/>
			      	</View>
				</KeyboardAvoidingView>
		);
	}
};

const mapStateToProps = state => ({
  id: state.store.key,
  owner: state.store.owner,
})

export default connect(mapStateToProps, {createQueue})(CreateQueueScreen)
