import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { connect } from 'react-redux';

import CustomerMainScreen from './CustomerMainScreen';
import JoinQueueScreen from './JoinQueueScreen';
import UpdateContactOptionsScreen from './UpdateContactOptionsScreen';


export const CustomerStack = createStackNavigator();

class CustomerStackScreen extends React.Component {

    constructor( props ){
        super( props );
    }

    getTitle = () => {
        return this.props.storeName ? 'Virtual Queue at ' + this.props.storeName : 'Never Queue Again';
    }

    render() {
      return (
        <CustomerStack.Navigator
          initialRouteName="CustomerMainScreen">
            <CustomerStack.Screen name="CustomerMain" 
                component={CustomerMainScreen} 
                options={{ title: this.getTitle() }}/>   
            <CustomerStack.Screen name="JoinQueue" 
                component={JoinQueueScreen} 
                options={{ title: 'Join a Queue' }}/>            
            <CustomerStack.Screen name="UpdateContactOptions" 
                component={UpdateContactOptionsScreen} 
                options={{ title: 'Update Contact Options' }}/>            
        </CustomerStack.Navigator>
      )
    }
}  

const mapStateToProps = state => ({
  storeName: state.subscription.storeName,
});

export default connect(mapStateToProps)(CustomerStackScreen);