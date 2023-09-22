import React, {Component} from 'react';
import Routes from './Routes';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
