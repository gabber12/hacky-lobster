import React, { Component } from 'react';
import {
AppRegistry,
StyleSheet,
Text,
Navigator,
View,
DrawerLayoutAndroid ,StatusBar,ToolbarAndroid,Picker,ListView,TouchableNativeFeedback,

} from 'react-native';
import Story from "./story"
const Item = Picker.Item;

export default class CommentLayout extends Component {
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

componentDidMount() {
  // fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     var data = responseJson.map((id) => {return {id:id, type:"dsa"}}).slice(0, 10);
  //     console.log(data)
  //     this.setState({dataSource:this.state.dataSource.cloneWithRows(data)})
  //   });
}
render() {




    return (
      <View>
        <Text style={{flex:3, fontSize:20}}>{this.props.data.title}</Text>
        <Text style={{flex:1}}>{this.props.data.url}</Text>
      </View>
    );

  }
  goToComment(id) {
    console.log(id);
    this.props.navigator.push({
      id:'CommentLayout'
    })
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
