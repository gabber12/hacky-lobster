
import React, { Component } from 'react';
import {

 Text,
 View,
TouchableNativeFeedback
} from 'react-native';
import HNStory from "./hn_story"
import { NativeModules } from 'react-native';
const browser = NativeModules.chrome_custom_tab;
export default class Story extends Component {
  _onPressButton() {
    browser.open(this.props.link)
  }
  render() {
    let storyView;
    storyView = <HNStory data={this.props.data}/>
    return (
      <TouchableNativeFeedback
        onPress={this._onPressButton.bind(this)}
        background={TouchableNativeFeedback.SelectableBackground()}>
      <View style={{padding:10}}>
    {storyView}
    </View>
    </TouchableNativeFeedback>
  )
  }
}
