import React from 'react';
import { StyleSheet, Text, Button, KeyboardAvoidingView, ScrollView, TextInput, Image, View } from 'react-native';



class SearchScreen extends React.Component {

	constructor( props ) {
		super(props);
		this.state = {
			title: '',
			errorMessage: '',
		}
	}
	
	post() {
		if( this.validateInput() ) {
			this.props.navigation.navigate('SearchResults',{title: this.getTitle()});
		}
	}

	getTitle(){
		return this.state.title.trim();
	}

	validateInput(){
		let ret = true;
		const title = this.getTitle();
		if( title.length < 3 ){
			ret = false;
			this.setState({
				errorMessage: 'Please enter at least 3 characters'
			});
		} else {
			this.setState({
				errorMessage: ''
			});
		}
		return ret;
	}

	updateTitle(title){
		this.setState({title});
	}

	render() {
  		return (
		    <KeyboardAvoidingView style={styles.search}>
		    	<Text style={styles.title}>Movie Title</Text>
				<TextInput style={styles.input} 
			      			value={this.state.title} 
			      			placeholder={'Type a title ...'} 
			      			onChangeText={ (title) => this.updateTitle(title)} />
			    <Text style={styles.error}>{this.state.errorMessage}</Text>
			    <Button style={styles.button} title='Search' onPress={() => this.post()}/>
		    </KeyboardAvoidingView>
		 );
  	}
};

const styles = StyleSheet.create({
  search: {
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
  },
  title:{
    fontSize: 32,
    alignSelf: 'flex-start',
    paddingLeft: '10%',
  },
  input:{
    fontSize: 32,
    alignSelf: 'center',
    borderWidth: 1,
    width: '80%',
  },
  error:{
    fontSize: 12,
    alignSelf: 'center',
    color: 'red',
    margin: 5,
  },
  button:{
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  image: {
    width:80,
    height:80,
  },
  row: {
  	flexDirection: 'row',
  	justifyContent: 'space-between',
  }
});

export default SearchScreen;
