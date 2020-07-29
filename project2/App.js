import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Image } from '@react-navigation/native';
import { DefaultTheme } from '@react-navigation/native';
import SearchScreen from './screens/SearchScreen';
import SearchResultsScreen from './screens/SearchResultsScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';

const Stack = createStackNavigator();

export default class App extends React.Component {

  render() {
    return (
      <NavigationContainer theme={theme} headerMode='float'>
        <Stack.Navigator
          initialRouteName="Search">
          <Stack.Screen name="Search" 
                component={SearchScreen} 
                options={{ title: 'Open Movie DB' }}/>
          <Stack.Screen name="SearchResults" 
                component={SearchResultsScreen} 
                options={ ({ route }) => ({ title: `Search Results: ${route.params.title}` })}/>
          <Stack.Screen name="MovieDetails" 
                component={MovieDetailsScreen} 
                options={ ({ route }) => ({ title: route.params.movieTitle })}/>
        </Stack.Navigator>
      </NavigationContainer>  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const theme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};