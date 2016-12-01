/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
 AppRegistry,
 StyleSheet,
 Navigator,
 Text,
 View,
DrawerLayoutAndroid ,StatusBar,ToolbarAndroid,Picker,ListView,TouchableNativeFeedback
} from 'react-native';
import MainLayout from './app/components/MainLayout'
import CommentLayout from "./app/components/CommentLayout"



export default class App extends Component {
  render() {
      return (
        <Navigator
         initialRoute={{id: 'MainLayout', name: 'Index'}}
         renderScene={this.renderScene.bind(this)}
         configureScene={(route) => {
           if (route.sceneConfig) {
             return route.sceneConfig;
           }
           return Navigator.SceneConfigs.FloatFromRight;
         }} />
      );
    }
    renderScene(route, navigator) {
     var routeId = route.id;
     if (routeId === 'MainLayout') {
       return (
         <MainLayout
           navigator={navigator} />
       );
     }

     if (routeId === 'CommentLayout') {
       return (
         <CommentLayout
           data = {route.data}
           navigator={navigator} />
       );
     }
   }
}

AppRegistry.registerComponent('App', () => App);
