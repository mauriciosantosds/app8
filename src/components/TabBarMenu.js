import React from 'react';
import {View, Text, StatusBar, Image, TouchableHighlight} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {TabBar} from 'react-native-tab-view';
import {connect} from 'react-redux';
import {habilitaInclusaoContato} from '../actions/AppActions';
import {auth} from '../config/Firebase';

const TabBarMenu = props => (
  <View style={{backgroundColor: '#115E54', elevation: 4, marginBottom: 6}}>
    <StatusBar backgroundColor="#114D44" />
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={{height: 50, justifyContent: 'center'}}>
        <Text style={{color: '#fff', fontSize: 20, marginLeft: 20}}>
          WhatsApp Clone
        </Text>
      </View>
      <View style={{flexDirection: 'row', marginRight: 20}}>
        <View
          style={{width: 50, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableHighlight
            onPress={() => {
              Actions.adicionarContato();
              props.habilitaInclusaoContato();
            }}
            underlayColor="#114D44">
            <Image source={require('../imgs/adicionar_contato.png')} />
          </TouchableHighlight>
        </View>
        <View style={{justifyContent: 'center'}}>
          <TouchableHighlight
            onPress={() => {
              auth.signOut().then(() => {
                Actions.formLogin();
              });
            }}>
            <Text style={{fontSize: 20, color: '#fff'}}>Sair</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>

    <TabBar {...props} style={{backgroundColor: '#115E54', elevation: 0}} />
  </View>
);

export default connect(null, {habilitaInclusaoContato})(TabBarMenu);
