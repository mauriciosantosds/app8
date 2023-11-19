import {LISTA_CONVERSAS_USUARIOS} from '../actions/types';
const INITIAL_STATE = {};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LISTA_CONVERSAS_USUARIOS:
      return action.payload;
    default:
      return state;
  }
};
