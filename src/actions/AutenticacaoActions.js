import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/Firebase';

export const modificaEmail = texto => {
  console.log(texto);
  return {
    type: 'modifica_email',
    payload: texto,
  };
};

export const modificaSenha = texto => {
  return {
    type: 'modifica_senha',
    payload: texto,
  };
};

export const modificaNome = texto => {
  return {
    type: 'modifica_nome',
    payload: texto,
  };
};

export const cadastraUsuario = ({nome, email, senha}) => {
  return dispatch => {
    createUserWithEmailAndPassword(auth, email, senha)
      .then(user => cadastroUsuarioSucesso(dispatch))
      .catch(erro => cadastroUsuarioErro(erro, dispatch));
  };
};

const cadastroUsuarioSucesso = dispatch => {
  dispatch({
    type: 'sucesso',
  });
};

const cadastroUsuarioErro = (erro, dispatch) => {
  console.log(erro.code);
  dispatch({type: 'cadastro_usuario_erro', payload: erro.code});
};
