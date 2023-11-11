import {
  MODIFICA_ADICIONA_CONTATO_EMAIL,
  ADICIONA_CONTATO_ERRO,
  ADICIONA_CONTATO_SUCESSO,
  LISTA_CONTATO_USUARIO,
} from './types';
import b64 from 'base-64';
import {ref, child, get, set, push, onValue} from 'firebase/database';
import {db, auth} from '../config/Firebase';
import _ from 'lodash';

export const modificaAdicionaContatoEmail = texto => {
  console.log('chegamos aqui', texto);
  return {
    type: MODIFICA_ADICIONA_CONTATO_EMAIL,
    payload: texto,
  };
};

export const adicionaContato = email => {
  console.log(email);
  let emailB64 = b64.encode(email);
  return dispatch => {
    console.log(email);
    console.log(emailB64);
    get(child(ref(db), `contatos/${emailB64}`))
      .then(snapshot => {
        console.log(snapshot.val());
        if (snapshot.val()) {
          console.log('usuario existe');
          const dadosUsuario = _.values(snapshot.val());
          console.log(dadosUsuario);
          const {currentUser} = auth;
          let emailUsuarioB64 = b64.encode(currentUser.email);
          push(ref(db, `/usuario_contatos/${emailUsuarioB64}`), {
            email: email,
            nome: dadosUsuario[0],
          })
            .then(() => {
              adicionaContatoSucesso(dispatch);
            })
            .catch(error => {
              console.error(error);
              adicionaContatoErro(error.message, dispatch);
            });
        } else {
          console.log('usuario não existe');
          dispatch({
            type: ADICIONA_CONTATO_ERRO,
            payload: 'E-mail informado não corresponde a um usuário válido.',
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
};

const adicionaContatoErro = (erro, dispatch) =>
  dispatch({
    type: ADICIONA_CONTATO_ERRO,
    payload: erro,
  });

const adicionaContatoSucesso = dispatch =>
  dispatch({
    type: ADICIONA_CONTATO_SUCESSO,
    payload: true,
  });

export const habilitaInclusaoContato = () => ({
  type: ADICIONA_CONTATO_SUCESSO,
  payload: false,
});

export const contatosUsuarioFetch = () => {
  const {currentUser} = auth;
  return dispatch => {
    console.log(currentUser.email);
    let emailUsuarioB64 = b64.encode(currentUser.email);
    onValue(
      child(ref(db), `/usuario_contatos/${emailUsuarioB64}`),
      snapshot => {
        const data = snapshot.val();
        console.log(data);
        dispatch({type: LISTA_CONTATO_USUARIO, payload: data});
      },
    );
  };
};
