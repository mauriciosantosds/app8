import React, {Component} from 'react';
import Routes from './Routes';
import reducers from './reducers';

import {Provider} from 'react-redux';
import {createStore} from 'redux';

class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
