import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  FlatList,
  Button,
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
//import VideoPlayer from 'react-native-video-player';
    
export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      show: true,
      data: [],
      favorites: [],
      commentfavorites: [],
      comments : []
    }
   // this.AddFavorite = this.AddFavorite.bind(this);
  }

  InFavorites(fav_url) {
firestore().collection(auth().currentUser.uid).where('url', '==',fav_url).get()
.then(querySnapshot => {
    console.log('Total users: ', querySnapshot.size);
    if(querySnapshot.size >= 1)
      {console.log("already in favs"); return true;}
    else
      {return false;}
  });
}

GetComments(url) {
  const comments = []; 
  firestore().collection('comments').onSnapshot((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    comments.push(
        doc.data().comment
    );
  });
//console.log('comments:', comments);
return comments;
 });
}

 RemoveFavorite(fav_url) {

firestore().collection(auth().currentUser.uid).where('url', '==',fav_url).get()
.then(querySnapshot => {
    //console.log('Total users: ', querySnapshot.size);
    if(querySnapshot.size >= 1)
      {
        querySnapshot.forEach(documentSnapshot => {
    //  var a = documentSnapshot.data().url;
      documentSnapshot.ref.delete();
     // b.push(a);
    //  console.log('User ID: ', a);
      });
      }
  });

//firestore().collection(auth().currentUser.uid).where('url', '==',fav_url).delete();
 }
  AddFavorite(fav_url) {
    //console.log(fav_url)
    var obj ={};
    obj[fav_url] = fav_url;
    //JSON.stringify(fav_url)
   // console.log(fav_url)
    firestore()
    .collection(auth().currentUser.uid)
    .doc()
    .set({
     url : fav_url,
    });
/*
    querySnapshot.forEach(documentSnapshot => {
      var a = documentSnapshot.data().url;
     // b.push(a);
      console.log('User ID: ', a);
        //       this.setState({
       //     data: b
       //  })
         //console.log('here:',this.state.data);
    });
    
  });
*/
}

AddComment(comment, url) {
var a;
console.log('userz email:',auth().currentUser.email);
firestore().collection('users').where('email', '==',auth().currentUser.email).get()
.then(querySnapshot => {
    console.log('Total users with this email: ', querySnapshot.size);
            querySnapshot.forEach(documentSnapshot => {
            a = documentSnapshot.data().username;
      });
    });
firestore().collection('comments').add({
url: url,
likes: 0,
author: auth().currentUser.email,
comment: comment
});
}

FavoriteComment(it) {
firestore().collection('comments').where('comment', '==',it.comment).get()
.then(querySnapshot => {
  //  console.log('Total users: ', querySnapshot.size);
    if(querySnapshot.size >= 1)
      {
        querySnapshot.forEach(documentSnapshot => {
        //documentSnapshot.ref.delete();
        if(documentSnapshot.data().comment == it.comment)
        {
     //     console.log("about to update likes");
          var x = documentSnapshot.data().likes + 1;
          documentSnapshot.ref.update({
            likes: x
          });
        }
    //    console.log("current likes:",documentSnapshot.data().likes);
      });
      }
  });
}

UnFavoriteComment(it) {
firestore().collection('comments').where('comment', '==',it.comment).get()
.then(querySnapshot => {
  //  console.log('Total users: ', querySnapshot.size);
    if(querySnapshot.size >= 1)
      {
        querySnapshot.forEach(documentSnapshot => {
        //documentSnapshot.ref.delete();
        if(documentSnapshot.data().url == it.url)
        {
     //     console.log("about to update likes");
          var x = documentSnapshot.data().likes - 1;
          documentSnapshot.ref.update({
            likes: x
          });
        }
    //    console.log("current likes:",documentSnapshot.data().likes);
      });
      }
  });
}


  //link to website http://35.212.253.243/
   componentDidMount = () => {
  //      firebase.auth().onAuthStateChanged(user => {
 //     this.props.navigation.navigate(user ? 'Home' : 'SignUp')
//    })
firestore().collection(auth().currentUser.uid).onSnapshot((querySnapshot) => {
  const urls = []; 
  querySnapshot.forEach((doc) => {
    urls.push(
        doc.data().url
    );
  });
  this.setState({
    favorites: urls
  });
//console.log('current favorites:', this.state.favorites)
 });

firestore().collection('comments').onSnapshot((querySnapshot) => {
  const cms = []; 
  querySnapshot.forEach((doc) => {
 //   console.log('comment:',doc.data().comment);
    cms.push({
        comment: doc.data().comment,
        url: doc.data().url,
        author: doc.data().author,
        likes: doc.data().likes
    });
  });
  this.setState({
    comments: cms
  });
//console.log('current comments:', this.state.comments)
 });

  fetch('http://35.212.253.243/captionz/' , {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         //console.log(responseJson);
         this.setState({
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
        <View style={{flexDirection: "row" }}>
        { !this.state.favorites.includes(item.url,0) ?
        <Icon size={40} name={'ios-heart-empty'} onPress={this.AddFavorite.bind(this, item.url)} /> :
        <Icon size={40} name={'ios-heart'} onPress={this.RemoveFavorite.bind(this, item.url)} />
        }
        <Icon size={40} name={'md-text'}  />
        </View>
        <FlatList data={this.state.comments.filter(function(cmmt) {
        if(cmmt.url == item.url)
          {return cmmt;}
        })}
        renderItem={({item})=> 
        <View style={{flexDirection: "row" }}>
        <Text> {item.author}:   {item.comment}   </Text>
        <Icon size={30} name={'ios-heart-empty'} onPress ={this.FavoriteComment.bind(this,item)} />
        <Text>  {item.likes} </Text>
       </View>
      }
        keyExtractor={(cmmt, index) => index.toString() }
        />
        <TextInput ref={input => { this.textInput = input }} style={styles.textInput}  placeholder="Enter comment"
          onChangeText={comment => this.setState({ comment })}/>
        <Button title = "comment" onPress={this.AddComment.bind(this, this.state.comment, item.url)}/>
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

  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
});