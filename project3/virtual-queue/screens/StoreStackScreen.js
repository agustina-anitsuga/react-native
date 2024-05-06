import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { connect } from 'react-redux'

import StoreMainScreen from './StoreMainScreen'
import QueueScreen from './QueueScreen';
import CreateQueueScreen from './CreateQueueScreen';


export const StoreStack = createStackNavigator();

class StoreStackScreen extends React.Component {

	constructor( props ){
		super(props);
		this.getQueueTitle = this.getQueueTitle.bind(this);
	}

	getQueueTitle(){
		return this.props.owner ? this.props.owner : 'Virtual Queue' ;
	}

    render() {
      return (
        <StoreStack.Navigator
          key={this.props.id}
          initialRouteName="StoreMain">
          <StoreStack.Screen name="StoreMain" 
                component={StoreMainScreen} 
                options={{ title: this.getQueueTitle() }}/>     
          <StoreStack.Screen name="CreateQueue" 
                component={CreateQueueScreen} 
                options={{ title: 'Create a Queue' }}/>                               
        </StoreStack.Navigator>
      )
    }
}  

const mapStateToProps = state => ({
    id: state.store.id,
    owner: state.store.owner,
})

export default connect(mapStateToProps)(StoreStackScreen);
