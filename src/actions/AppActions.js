import {MODIFICA_ADICIONA_CONTATO_EMAIL} from './types';
import b64 from 'base-64';
import {ref, set, onValue, child, get, getDatabase} from 'firebase/database';
import {auth, db} from '../config/Firebase';

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
  console.log(emailB64);

  const dbRef = ref(getDatabase());
  get(child(dbRef, `contatos/${emailB64}`))
    .then(snapshot => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log('No data available');
      }
    })
    .catch(error => {
      console.error(error);
    });

  return {
    type: '',
  };
};
