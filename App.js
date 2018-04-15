/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Router from "./config/Router";
import { createStore } from "redux";

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
  }
  render() {
    const store = createStore(reducers);
    return (
      <Root>
        <Provider store={store}>
          <Router />
        </Provider>
      </Root>
    );
  }
}

