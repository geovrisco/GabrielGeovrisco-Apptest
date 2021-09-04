import React, {useEffect} from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {colors, routes, URL} from '../utils/constants';
import BaseContainer from '../component/BaseContainer';

export default function ListScreen({navigation, route}) {
  const insets = useSafeAreaInsets();

  const getContact = async () => {
    console.log(URL.contact);
    try {
      let result = await axios({
        method: 'GET',
        url: URL.contact,
      });
      console.log(result.data, 'ini result', Platform.OS);
    } catch (error) {
      console.log(error, Platform.OS, 'errorgaes');
    }
  };

  useEffect(() => {
    getContact();
  }, []);

  return (
    <BaseContainer>
      <Text>ListScreen</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate(routes.detail)}
        style={{width: 100, height: 100, backgroundColor: 'red'}}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(routes.create)}
        style={{width: 100, height: 100, backgroundColor: 'blue'}}
      />
    </BaseContainer>
  );
}

const styles = StyleSheet.create({});
