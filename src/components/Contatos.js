import React, {Component} from 'react';
import {View, Text, FlatList, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import {contatosUsuarioFetch} from '../actions/AppActions';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';

class Contatos extends Component {
  state = {
    fonteDeDados: [],
  };
  componentDidMount() {
    this.props.contatosUsuarioFetch();
    //this.criaFonteDeDados(this.props.contatos);
  }

  /*componentDidUpdate() {
    console.log('recuperado via props', this.props.contatos);
    console.log('fontededados', this.fonteDeDados);
    this.criaFonteDeDados(this.props.contatos);
    console.log('fontededados', this.fonteDeDados);
  }

  criaFonteDeDados(contatos) {
    this.state = {fonteDeDados: contatos};
  }*/

  static getDerivedStateFromProps(props, state) {
    if (props.contatos.length > 0) {
      return {
        fonteDeDados: props.contatos,
      };
    }
    // Return null to indicate no change to state.
    return null;
  }

  renderRow(contato) {
    return (
      <TouchableHighlight
        onPress={() =>
          Actions.conversa({
            title: contato.item.nome,
            contatoNome: contato.item.nome,
            contatoEmail: contato.item.email,
          })
        }>
        <View
          style={{
            flex: 1,
            padding: 20,
            borderBottomWidth: 1,
            borderColor: '#CCC',
          }}>
          <Text style={{fontSize: 25}}>{contato.item.nome}</Text>
          <Text style={{fontSize: 18}}>{contato.item.email}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <FlatList
        data={this.state.fonteDeDados}
        renderItem={data => this.renderRow(data)}
      />
    );
  }
}

const mapStateToProps = state => {
  const contatos = _.map(state.ListaContatosReducer, (val, uid) => {
    return {...val, uid};
  });
  return {contatos};
};
export default connect(mapStateToProps, {contatosUsuarioFetch})(Contatos);
