import React from 'react'
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, FlatList } from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default class Profile extends React.Component {

  constructor() {
    super()
    this.state = {
     // show: true,
     // data: [],
     // favorites: [],
   //   commentfavorites: [],
      messages : []
    }
   // this.AddFavorite = this.AddFavorite.bind(this);
  }

AddMessage(message) {
firestore().collection('Chat').add({
author: auth().currentUser.email,
message: message 
});
}

  componentDidMount() {
   firestore().collection('Chat').onSnapshot((querySnapshot) => {
  const ms = []; 
  querySnapshot.forEach((doc) => {
 //   console.log('comment:',doc.data().comment);
    ms.push({
        message: doc.data().message,
        author: doc.data().author,
    });
  });
  this.setState({
    messages: ms
  });
console.log('current messages:', this.state.messages);
 });
  }

  render() {
    const user_email = auth().currentUser.email;
    console.log("e",user_email);
    return (
      <View>
        <FlatList data={this.state.messages}
        renderItem={({item})=> 
        <View>
        <Text>{item.author}</Text>
        <Text>{item.message}</Text>
        </View>
        }
        keyExtractor={(cmmt, index) => index.toString() }
        />
        <View>
        <TextInput ref={input => { this.textInput = input }} style={styles.textInput}  placeholder="Enter message"
          onChangeText={message => this.setState({ message })}/>
        <Button
        title = "Send"
        onPress={this.AddMessage.bind(this, this.state.message)}
         />
        </View>
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {

  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
});