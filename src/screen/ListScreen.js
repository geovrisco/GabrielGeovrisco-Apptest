import React, {useEffect} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import {colors, routes, URL} from '../utils/constants';
import BaseContainer from '../component/BaseContainer';
import {useDispatch, useSelector} from 'react-redux';
import {setContact} from '../store/actions';
import UseAxios from '../hooks/UseAxios';
import {dummyList} from '../utils/dummyLists';

const {width, height} = Dimensions.get('screen');

export default function ListScreen({navigation, route}) {
  const dispatch = useDispatch();
  const contactLists = useSelector(selector => selector.data);
  const {apiRequest, data: contacts} = UseAxios(URL.contact, 'GET');
  const getContact = async () => {
    const response = await apiRequest();
    const data = response.data.data;
    dispatch(setContact(data));
  };

  useEffect(() => {
    getContact();
  }, []);

  return (
    <BaseContainer>
      <Text>ListScreen</Text>
      <FlatList
        style={{flex: 1}}
        data={dummyList}
        keyExtractor={contact => contact.id}
        renderItem={({item, index}) => {
          return (
            <View style={styles.Container}>
              <Text>{item.firstName}</Text>
            </View>
          );
        }}
      />

      <Text>end</Text>
    </BaseContainer>
  );
}

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    width: width * 0.9,
    height: 100,
  },
});
