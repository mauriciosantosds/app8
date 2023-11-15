import React from 'react';
import {Router, Scene, Stack} from 'react-native-router-flux';

import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import BoasVindas from './components/BoasVindas';
import Principal from './components/Principal';
import AdicionarContato from './components/AdicionarContato';
import Conversa from './components/Conversa';

export default () => (
  <Router
    navigationBarStyle={{backgroundColor: '#115E54'}}
    titleStyle={{color: '#fff'}}>
    <Stack key="root">
      <Scene
        key="formLogin"
        component={FormLogin}
        title="Login"
        hideNavBar={true}
      />
      <Scene key="formCadastro" component={FormCadastro} title="Cadastro" />
      <Scene
        key="boasVindas"
        component={BoasVindas}
        title="Bem-Vindo"
        hideNavBar={true}
      />
      <Scene
        key="principal"
        component={Principal}
        title="Principal"
        hideNavBar={true}
      />
      <Scene
        key="adicionarContato"
        component={AdicionarContato}
        title="Adicionar Contato"
        hideNavBar={false}
        back={true}
      />
      <Scene
        key="conversa"
        component={Conversa}
        title="Conversa"
        hideNavBar={false}
      />
    </Stack>
  </Router>
);
