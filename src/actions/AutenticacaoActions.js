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
  createUserWithEmailAndPassword(auth, email, senha)
    .then(user => cadastroUsuarioSucesso())
    .catch(erro => cadastroUsuarioErro(erro));
  alert('Chegamos aqui' + nome);
  return {
    type: 'teste',
  };
};

const cadastroUsuarioSucesso = () => {
  console.log('Usuário cadastrado!');
};

const cadastroUsuarioErro = erro => {
  console.log('mensagem', erro);
};
