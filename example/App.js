/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Configurator from './Config';

export default class App extends Component {
  render() {
    return (
      <ScrollView style={styles.scrollBackground}>
        <View style={styles.container}>
          <Text style={styles.welcome}>React Native In-App Browser</Text>
          <Configurator />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollBackground: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  container: {
    flex: 1,
    paddingVertical: 48,
    paddingHorizontal: 32,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
