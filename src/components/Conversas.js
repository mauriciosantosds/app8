import React, {Component} from 'react';
import {View, Text, FlatList, TouchableHighlight} from 'react-native';
import {conversasUsuarioFetch} from '../actions/AppActions';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import _ from 'lodash';
class Conversas extends Component {
  state = {
    fonteDeDados: [],
  };

  componentDidMount() {
    this.props.conversasUsuarioFetch();
  }

  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedState', props.conversas, 'state:', state);
    if (props.conversas.length > 0) {
      return {
        fonteDeDados: props.conversas,
      };
    }
    // Return null to indicate no change to state.
    return null;
  }

  renderRow(data) {
    console.log(data);
    return (
      <TouchableHighlight
        onPress={() => {
          Actions.conversa({
            title: data.item.nome,
            contatoNome: data.item.nome,
            contatoEmail: data.item.email,
          });
        }}>
        <View
          style={{
            flex: 1,
            padding: 20,
            borderBottomWidth: 1,
            borderColor: '#ccc',
          }}>
          <Text style={{fontSize: 25}}>{data.item.nome}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.fonteDeDados}
          renderItem={data => this.renderRow(data)}
        />
      </View>
    );
  }
}
const mapStateToProps = state => {
  const conversas = _.map(state.ListaConversasReducer, (val, uid) => {
    return {...val, uid};
  });
  console.log(conversas);
  return {
    conversas,
  };
};
export default connect(mapStateToProps, {conversasUsuarioFetch})(Conversas);
