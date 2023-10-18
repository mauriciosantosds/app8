import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';

export default props => (
  <View style={{flex: 1, justifyContent: 'center'}}>
    <TextInput
      placeholder="E-mail"
      style={{fontSize: 20, height: 45}}
      onChange={() => false}
    />
    <View style={{flex: 1}}>
      <Button title="Adicionar" color="#115E54" onPress={() => false} />
    </View>
  </View>
);
