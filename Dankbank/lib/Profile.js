import React from 'react'
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native'
import auth from '@react-native-firebase/auth';

export default class Profile extends React.Component {
  componentDidMount() {
    auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Profile' : 'Login')
    })
  }

  render() {
    return (
      <View>
        <Text>ProfileScreen</Text>
        <Button
         title="Sign out"
         onPress={() => auth().signOut()} 
         />
      </View>
    )
  }
}