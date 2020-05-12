/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Image
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import { Content, Card, CardItem, Body, Left} from 'native-base';


import Loading from './Loading'
import Profile from './Profile'
import Favorites from './Favorites'
import Search from './Search'
import Home from './Home'
import SignUp from './SignUp'
import Login from './Login'
import Captionz from './Captionz'

const HomeStack = createSwitchNavigator({
  Home: Home, 
  Login: {
      screen: Login,
      navigationOptions: {
    //To hide the ActionBar/NavigationBar
    header: null,
                },
         },
  SignUp: {
      screen: SignUp,
      navigationOptions: {
    //To hide the ActionBar/NavigationBar
    header: null,
                },
         },
});


const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name='ios-home' />
          </View>
        ),
      }
    },
    Search: {
      screen: Search,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-search'} />
          </View>
        ),
      }
    },
    Favorites: {
      screen: Favorites,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-heart'} />
          </View>
        ),
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-person'} />
          </View>
        ),
      }
    },
    Captionz: {
      screen: Captionz,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-flash'} />
          </View>
        ),
      }
    },
  },
  {
    initialRouteName: 'Home',
    activeColor: '#ffffff',
    inactiveColor: '#5c5c3d',
    barStyle: { backgroundColor: '#990073' },
  }
);

export default createAppContainer(TabNavigator);

