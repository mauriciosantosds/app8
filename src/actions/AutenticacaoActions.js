import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {ref, set} from 'firebase/database';
import {auth, db} from '../config/Firebase';
import {Actions} from 'react-native-router-flux';
import b64 from 'base-64';
import {
  MODIFICA_EMAIL,
  MODIFICA_SENHA,
  MODIFICA_NOME,
  CADASTRO_USUARIO_SUCESSO,
  CADASTRO_USUARIO_ERRO,
  LOGIN_USUARIO_SUCESSO,
  LOGIN_USUARIO_ERRO,
} from './types';

export const modificaEmail = texto => {
  console.log(texto);
  return {
    type: MODIFICA_EMAIL,
    payload: texto,
  };
};

export const modificaSenha = texto => {
  return {
    type: MODIFICA_SENHA,
    payload: texto,
  };
};

export const modificaNome = texto => {
  return {
    type: MODIFICA_NOME,
    payload: texto,
  };
};

export const cadastraUsuario = ({nome, email, senha}) => {
  return dispatch => {
    createUserWithEmailAndPassword(auth, email, senha)
      .then(user => {
        let emailB64 = b64.encode(email);
        set(ref(db, `contatos/${emailB64}`), {
          nome,
        }).then(value => cadastroUsuarioSucesso(dispatch));
      })
      .catch(erro => cadastroUsuarioErro(erro, dispatch));
  };
};

const cadastroUsuarioSucesso = dispatch => {
  dispatch({
    type: CADASTRO_USUARIO_SUCESSO,
  });
  Actions.boasVindas();
};

const cadastroUsuarioErro = (erro, dispatch) => {
  console.log(erro.code);
  dispatch({type: CADASTRO_USUARIO_ERRO, payload: erro.code});
};

export const autenticarUsuario = ({email, senha}) => {
  return dispatch => {
    signInWithEmailAndPassword(auth, email, senha)
      .then(value => loginUsuarioSucesso(dispatch))
      .catch(erro => loginUsuarioErro(erro, dispatch));
  };
};

const loginUsuarioSucesso = dispatch => {
  dispatch({
    type: LOGIN_USUARIO_SUCESSO,
  });
  Actions.principal();
};

const loginUsuarioErro = (erro, dispatch) => {
  console.log(erro.code);
  dispatch({
    type: LOGIN_USUARIO_ERRO,
    payload: erro.code,
  });
};
