/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
DrawerLayoutAndroid ,StatusBar,ToolbarAndroid,Picker,ListView,TouchableNativeFeedback
} from 'react-native';
// import * as firebase from 'firebase';
const Item = Picker.Item;
// const firebaseConfig = {
//
//   databaseURL: "https://hacker-news.firebaseio.com",
// };
// const firebaseApp = firebase.initializeApp(firebaseConfig);
import { NativeModules } from 'react-native';
const browser = NativeModules.chrome_custom_tab;
class Post extends Component {
  _onPressButton() {
    browser.open(this.props.link)
  }
  render() {
    return (
      <TouchableNativeFeedback
        onPress={this._onPressButton.bind(this)}
        background={TouchableNativeFeedback.SelectableBackground()}>
      <View style={{padding:10}}>
      <Text>{this.props.title}</Text>
      <Text>{this.props.link}</Text>
    </View>
    </TouchableNativeFeedback>
  )
  }
}
export default class awesomeness extends Component {
   state = {
    selected1: 'key1',
    selected2: 'key1',
    selected3: 'key1',
    color: 'red',
    mode: Picker.MODE_DROPDOWN,
  };
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // this.itemsRef = firebaseApp.database().ref();
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
  }
  // listenForItems(itemsRef) {
  //   itemsRef.on('value', (snap) => {
  //
  //     // get children as an array
  //     var items = [];
  //     snap.forEach((child) => {
  //       items.push(child.val().title);
  //       console.log(child.val().title);
  //     });
  //
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(items)
  //     });
  //
  //   });
  // }
  componentDidMount() {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then((response) => response.json())
      .then((responseJson) => {
        var data = [{'title':'dsads', 'url':'dsads1'}];
        this.setState({dataSource:this.state.dataSource.cloneWithRows(data)})
        responseJson.forEach((id)=>{
          fetch('https://hacker-news.firebaseio.com/v0/item/'+id+'.json').then((response) => response.json()).then((responseJson1) => {
            data.push(responseJson1);
            this.setState({dataSource:this.state.dataSource.cloneWithRows(data)})
          });
        })

      })
  }
  render() {


    var navigationView = (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>Im in the Drawer!</Text>
        </View>
      );
      return (
        <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
                 <ToolbarAndroid
        style={{height: 50, backgroundColor: '#FFF'}}
        titleColor={'#000000'}

        actions={[{title: 'Settings', show: 'always'}]}
        onActionSelected={this.onActionSelected} >
         <Picker
            style={styles.picker}
            selectedValue={this.state.selected1}
            onValueChange={this.onValueChange.bind(this, 'selected1')}>
            <Item label="hello" value="key0" />
            <Item label="world" value="key1" />
          </Picker>
        </ToolbarAndroid>

        <ListView
     dataSource={this.state.dataSource}
     renderRow={(rowData) => <Post title={rowData.title} link={rowData.url}/>}/>
        </DrawerLayoutAndroid>
      );

    }
    changeMode = () => {
    const newMode = this.state.mode === Picker.MODE_DIALOG
        ? Picker.MODE_DROPDOWN
        : Picker.MODE_DIALOG;
    this.setState({mode: newMode});
  };
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

  AppRegistry.registerComponent('awesomeness', () => awesomeness);
