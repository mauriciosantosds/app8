import {MODIFICA_ADICIONA_CONTATO_EMAIL, ADICIONA_CONTATO_ERRO} from './types';
import b64 from 'base-64';
import {ref, child, get, set, push} from 'firebase/database';
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
              console.log('Sucesso');
            })
            .catch(error => {
              console.error(error);
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
