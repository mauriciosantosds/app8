const INITIAL_STATE = {
  nome: 'Mauricio',
  email: 'teste@teste.com',
  senha: '1233',
};
export default (state = INITIAL_STATE, action) => {
  if (action.type == 'modifica_email') {
    return {...state, email: action.payload};
  }
  console.log(action);
  if (action.type == 'modifica_senha') {
    return {...state, senha: action.payload};
  }
  if (action.type == 'modifica_nome') {
    return {...state, nome: action.payload};
  }
  return state;
};
