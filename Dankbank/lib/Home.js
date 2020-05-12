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
//import firebase from 'react-native-firebase'
import auth from '@react-native-firebase/auth';
//import VideoPlayer from 'react-native-video-player';
    
export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      data: []
    }
  }
  //link to website http://35.212.253.243/
   componentDidMount = () => {
        auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Home' : 'SignUp')
    })
      fetch('http://35.212.253.243/json/' , {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         //console.log(responseJson);
         this.setState({
          isLoading: false,
            data: responseJson
         })
      })
      .catch((error) => {
         console.error(error);
      });
   } 
   
  render() {
    return (
        <FlatList
        data={this.state.data} 
        renderItem={({item})=> 
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/\.(jpe?g|png|gif|bmp)/i.test(item.url) &&
        <Image style = {{height: 400, width: 390}} resizeMode='contain' source={{uri: item.url}} />
        }
        </View>
       }
        keyExtractor={(item, index) => index.toString() }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {

  }
});