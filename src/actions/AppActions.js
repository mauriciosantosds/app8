import {
  MODIFICA_ADICIONA_CONTATO_EMAIL,
  ADICIONA_CONTATO_ERRO,
  ADICIONA_CONTATO_SUCESSO,
  LISTA_CONTATO_USUARIO,
  MODIFICA_MENSAGEM,
  LISTA_CONVERSA_USUARIO,
  ENVIA_MENSAGEM_SUCESSO,
  LISTA_CONVERSAS_USUARIOS,
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
    let emailUsuarioB64 = b64.encode(currentUser.email);
    onValue(
      child(ref(db), `/usuario_contatos/${emailUsuarioB64}`),
      snapshot => {
        const data = snapshot.val();
        dispatch({type: LISTA_CONTATO_USUARIO, payload: data});
      },
    );
  };
};

export const modificaMensagem = texto => {
  return {
    type: MODIFICA_MENSAGEM,
    payload: texto,
  };
};

export const enviarMensagem = (mensagem, contatoNome, contatoEmail) => {
  //dados do usuario (email)
  const {currentUser} = auth;
  const usuarioEmail = currentUser.email;
  return dispatch => {
    //conversao para base 64
    const usuarioEmailB64 = b64.encode(usuarioEmail);
    const contatoEmailB64 = b64.encode(contatoEmail);
    console.log('user', usuarioEmail, 'contato', contatoEmail);
    push(ref(db, `/mensagens/${usuarioEmailB64}/${contatoEmailB64}`), {
      mensagem,
      tipo: 'e',
    })
      .then(() => {
        push(ref(db, `/mensagens/${contatoEmailB64}/${usuarioEmailB64}`), {
          mensagem,
          tipo: 'r',
        })
          .then(() => {
            dispatch({
              type: ENVIA_MENSAGEM_SUCESSO,
            });
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      })
      .then(() => {
        //armazenar cabecalho de conversa do usuario autenticado
        set(
          ref(db, `/usuario_conversas/${usuarioEmailB64}/${contatoEmailB64}`),
          {
            nome: contatoNome,
            email: contatoEmail,
          },
        );
      })
      .then(() => {
        get(child(ref(db), `contatos/${usuarioEmailB64}`)).then(snapshot => {
          //armazenar cabecalho de conversa do contato
          const dadosUsuario = snapshot.val();
          console.log('nome usuario', dadosUsuario.nome);
          set(
            ref(db, `/usuario_conversas/${contatoEmailB64}/${usuarioEmailB64}`),
            {
              nome: dadosUsuario.nome,
              email: usuarioEmail,
            },
          );
        });
      });
  };
};

export const conversaUsuarioFetch = contatoEmail => {
  const {currentUser} = auth;
  let usuarioEmailB64 = b64.encode(currentUser.email);
  let contatoEmailB64 = b64.encode(contatoEmail);
  return dispatch => {
    onValue(
      child(ref(db), `/mensagens/${usuarioEmailB64}/${contatoEmailB64}`),
      snapshot => {
        const data = snapshot.val();
        dispatch({type: LISTA_CONVERSA_USUARIO, payload: data});
      },
    );
  };
};

export const conversasUsuarioFetch = () => {
  const {currentUser} = auth;
  return dispatch => {
    let usuarioEmailB64 = b64.encode(currentUser.email);
    console.log(usuarioEmailB64);
    onValue(
      child(ref(db), `/usuario_conversas/${usuarioEmailB64}`),
      snapshot => {
        const data = snapshot.val();
        dispatch({type: LISTA_CONVERSAS_USUARIOS, payload: data});
      },
    );
  };
};
