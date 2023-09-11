import React from 'react';
import FormCadastro from './components/FormCadastro';
import Routes from './Routes';
import reducers from './reducers';

import {Provider} from 'react-redux';
import {createStore} from 'redux';

export default props => (
  <Provider store={createStore(reducers)}>
    <Routes />
  </Provider>
);
