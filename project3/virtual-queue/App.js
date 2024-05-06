import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

import { StoreStack } from './screens/StoreStackScreen';
import StoreStackScreen from './screens/StoreStackScreen';
import { CustomerStack } from './screens/CustomerStackScreen';
import CustomerStackScreen from './screens/CustomerStackScreen';


const Tab = createBottomTabNavigator();


export default class App extends React.Component {

  constructor(props) {
      super(props);
  }

  render() {
    return (
       <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
                <Tab.Navigator
                  screenOptions={ ({ route }) => ({
                      tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'Customer') {
                          iconName = 'ios-person'
                        } else if (route.name === 'Store') {
                          iconName = 'ios-pricetags' 
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                      },
                    })}>
                  <Tab.Screen name='Customer' component={CustomerStackScreen}/>
                  <Tab.Screen name='Store' component={StoreStackScreen} />    
                </Tab.Navigator>
            </NavigationContainer>  
        </PersistGate>
      </Provider>
    );
  }

}

/*

              */