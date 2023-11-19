import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {
  modificaMensagem,
  enviarMensagem,
  conversaUsuarioFetch,
} from '../actions/AppActions';
import _ from 'lodash';

class Conversa extends Component {
  state = {
    fonteDeDados: [],
  };

  componentDidMount() {
    console.log('componentDidMount:', this.props.contatoEmail);
    this.props.conversaUsuarioFetch(this.props.contatoEmail);
  }

  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedState', props.conversa, 'stete:', state);
    if (props.conversa.length > 0) {
      return {
        fonteDeDados: props.conversa,
      };
    }
    // Return null to indicate no change to state.
    return null;
  }
  _enviarMensagem() {
    const {mensagem, contatoNome, contatoEmail} = this.props;
    this.props.enviarMensagem(mensagem, contatoNome, contatoEmail);
  }

  renderRow(texto) {
    if (texto.item.tipo === 'e') {
      return (
        <View
          style={{
            alignItems: 'flex-end',
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 40,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: '#000',
              padding: 10,
              backgroundColor: '#dbf5d4',
              elevation: 1,
            }}>
            {texto.item.mensagem}
          </Text>
        </View>
      );
    }
    return (
      <View
        style={{
          alignItems: 'flex-start',
          marginTop: 5,
          marginBottom: 5,
          marginRight: 40,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: '#000',
            padding: 10,
            backgroundColor: '#f7f7f7',
            elevation: 1,
          }}>
          {texto.item.mensagem}
        </Text>
      </View>
    );
  }

  render() {
    console.log('render:', this.props.contatoEmail);
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#eee4dc',
          padding: 10,
        }}>
        <View style={{flex: 1, paddingBottom: 20}}>
          <FlatList
            data={this.state.fonteDeDados}
            renderItem={data => this.renderRow(data)}
          />
        </View>
        <View style={{flexDirection: 'row', height: 60}}>
          <TextInput
            value={this.props.mensagem}
            onChangeText={texto => this.props.modificaMensagem(texto)}
            style={{flex: 4, backgroundColor: '#fff', fontSize: 18}}
          />
          <TouchableHighlight
            onPress={this._enviarMensagem.bind(this)}
            underlayColor="#fff">
            <Image source={require('../imgs/enviar_mensagem.png')} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  const conversa = _.map(state.ListaConversaReducer, (val, uid) => {
    return {...val, uid};
  });
  console.log(conversa);
  return {
    conversa,
    mensagem: state.AppReducer.mensagem,
  };
};
export default connect(mapStateToProps, {
  modificaMensagem,
  enviarMensagem,
  conversaUsuarioFetch,
})(Conversa);
