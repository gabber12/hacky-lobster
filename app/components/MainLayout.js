import React, { Component } from 'react';
import {
AppRegistry,
StyleSheet,
Text,
Navigator,
View,
DrawerLayoutAndroid ,StatusBar,ToolbarAndroid,Picker,ListView,TouchableNativeFeedback,RefreshControl
} from 'react-native';
import Story from "./story"
import CommentLayout from "./CommentLayout"
const Item = Picker.Item;
const _list_item_buffer = 10;
export default class MainLayout extends Component {
 state = {
  selected1: 'key1',
  selected2: 'key1',
  selected3: 'key1',
  color: 'red',
  mode: Picker.MODE_DROPDOWN,
};

constructor() {
  super();
  this._data = [];
  this.state = {
      refreshing:true,
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
  };
}
 getPostData() {
     fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
       .then((response) => response.json())
       .then((responseJson) => {
           let _startIndex = this._data.length;
         let endIndex = _startIndex + _list_item_buffer;
         this._data = this._data.concat(responseJson.map((id) => {return {id:id, type:"dsa"}}).slice(_startIndex, endIndex));
         console.log(this._data)
         this.setState({refreshing:false,dataSource:this.state.dataSource.cloneWithRows(this._data)});

       });
 }
componentDidMount() {
  this.getPostData()
}
_onRefresh() {
    this._data = [];
    this.setState({refreshing:true})
    this.getPostData()

}

render() {

  var navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>Programming News</Text>
      </View>
    );
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        renderNavigationView={() => navigationView} style={{flex:1}}>
        <ToolbarAndroid
          style={{height: 50, backgroundColor: '#FFF'}}
          titleColor={'#000000'}
          actions={[{title: 'Settings', show: 'always'}]}
          onActionSelected={this.onActionSelected} >
          <Text style={{fontSize:20}}>Hacker News</Text>
        </ToolbarAndroid>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <Story type={rowData.type} id={rowData.id} goToComment={this.goToComment.bind(this)}/>
          }
          refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
        onEndReachedThreshold={50}
        onEndReached={this.getPostData.bind(this)}/>
        </DrawerLayoutAndroid>
    );

  }
  goToComment(id, data) {
    console.log(id);
    this.props.navigator.push({
      id:'CommentLayout',
      data:data
    })
  }

  onActionSelected(position) {
    if (position === 0) { // index of 'Settings'
      showSettings();
    }
  }
  onValueChange = (key: string, value: string) => {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  };
}
// <Picker
//   style={styles.picker}
//   selectedValue={this.state.selected1}
//   onValueChange={this.onValueChange.bind(this, 'selected1')}>
//   <Item label="hello" value="key0" />
//   <Item label="world" value="key1" />
// </Picker>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
