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
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import { Content, Card, CardItem, Body, Left} from 'native-base';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default class Favorites extends React.Component {

constructor() {
    super()
    this.state = {
      data: []
    } 
}

 RemoveFavorite(fav_url) {

firestore().collection(auth().currentUser.uid).where('url', '==',fav_url).get()
.then(querySnapshot => {
    console.log('Total users: ', querySnapshot.size);
    if(querySnapshot.size >= 1)
      {
        querySnapshot.forEach(documentSnapshot => {
      var a = documentSnapshot.data().url;
      documentSnapshot.ref.delete();
     // b.push(a);
      console.log('User ID: ', a);
      });
      }
    else
      {}
  });

//firestore().collection(auth().currentUser.uid).where('url', '==',fav_url).delete();
 }

    componentDidMount = () => {
    let mounted = true;
  	 const uid = auth().currentUser.uid;
  //	 console.log(uid);
var a;
var b = [];
 firestore().collection(uid)
 .onSnapshot((querySnapshot) => {
 	const urls = []; 
 	querySnapshot.forEach((doc) => {
 		urls.push({
        url: doc.data().url
 		});
 	});
 	this.setState({
 		data: urls
 	});
 	//console.log('yerr:', this.state.data)
 });
 /*
   .get()
   .then(querySnapshot => {
   // console.log('Total users: ', querySnapshot.size);

    querySnapshot.forEach(documentSnapshot => {
    	a = documentSnapshot.data().url;
    	b.push(a);
      console.log('User ID: ', a);
               this.setState({
            data: b
         })
         console.log('here:',this.state.data);
    });
  });
*/


    }



  render() {
    return ( 
        <FlatList
        data={this.state.data} 
        renderItem={({item})=> 
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image style = {{height: 400, width: 390}} resizeMode='contain' source={{uri: item.url}} />
        <Icon size={40} name={'ios-heart'} onPress={this.RemoveFavorite.bind(this, item.url)} />
        </View>
       }
        keyExtractor={(item, index) => index.toString() }
      />
    );
  }

}