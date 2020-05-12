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

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true,
      search: '',
      data: [] };
      this.homeData = [];
  }
  updateSearch = search => {
    this.setState({ search });
  };
   componentDidMount = () => {
      fetch('http://35.212.253.243/json/' , {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
         this.setState({
          isLoading: false,
            data: responseJson
         })
      })
      .catch((error) => {
         console.error(error);
      });
   }

  SearchFilterFunction(text) {
    const newData = this.state.data.filter(function(item) {
      const srch=text.toLowerCase();
      return item.text.match(srch);
    });

    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search: text,
    });
  } 

  render() {

    return (
    <View>
      <SearchBar  
        placeholder="Search Memes"
        onChangeText={text => this.SearchFilterFunction(text)}
        value={this.state.search}
      />
      <FlatList
        data={this.state.dataSource}
        ItemSeparatorComponent={this.ListViewItemSeparator}
        //Item Separator View
        renderItem={({ item }) => (
          // Single Comes here which will be repeatative for the FlatListItems
        <Image style = {{height: 400, width: 390}} resizeMode='contain' source={{uri: item.url}} />
        )}
        keyExtractor={(item, index) => index.toString() }
      />
      </View>
    );
  }
}