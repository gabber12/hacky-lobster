import React, {Component,PropTypes} from 'react';
import {StyleSheet, Text, View, TouchableNativeFeedback,Button} from 'react-native';
import {NativeModules} from 'react-native';
const browser = NativeModules.chrome_custom_tab;
export default class Story extends Component {
  constructor() {
    super()
    this.state = {loading:true, data:{}}
  }
  onPressButton() {
    browser.open(this.state.data.url);
  }
  componentDidMount() {
    console.log(this.props)
    console.log('https://hacker-news.firebaseio.com/v0/item/'+this.props.id+'.json')
    fetch('https://hacker-news.firebaseio.com/v0/item/'+this.props.id+'.json')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({data:responseJson})
    });
  }
  onPressComments() {
    this.props.goToComment(this.props.id, this.state.data)
  }
  render() {
    // let storyView;
    // storyView = <HNStory data={this.props.data}/>
    return (
      <TouchableNativeFeedback
      onPress={this.onPressButton.bind(this)}
      background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={styles.story}>
        <Text style={{flex: 2}}>{this.state.data.score}</Text>
          <View style={{flex: 20}}>
          <Text style={{flex: 2}}>{this.state.data.title}</Text>
          <Text style={{flex: 1}}>{this.state.data.url}</Text>
        </View>
        <View style={{flex: 3}}><Button onPress={this.onPressComments.bind(this)}
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"/></View>
      </View>
    </TouchableNativeFeedback>);
  }
}
const styles = StyleSheet.create({story: {
  padding: 15,
  borderWidth: 1,
  borderColor: '#d6d7da',
  flex: 1,
  flexDirection: 'row',
}});

// Story.propTypes = {
//   id: PropTypes.integer.isRequired,
//   type: PropTypes.string.isRequired,
// }
