import React, {useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
} from 'react-native';
import {colors, fontSize, padder, routes, URL} from '../utils/constants';
import BaseContainer from '../component/BaseContainer';
import {useDispatch, useSelector} from 'react-redux';
import {setContact} from '../store/actions';
import UseAxios from '../hooks/UseAxios';
import {dummyList} from '../utils/dummyLists';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ContactCards from '../component/ContactCards';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('screen');

export default function ListScreen({navigation, route}) {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const contactLists = useSelector(selector => selector.data);
  const {apiRequest, data: contacts} = UseAxios(URL.contact, 'GET');

  const renderContacts = ({item, index}) => (
    <ContactCards item={item} index={index} dataLength={dummyList.length} />
  );

  const getContact = async () => {
    const response = await apiRequest();
    const data = response.data.data;
    dispatch(setContact(data));
  };

  useEffect(() => {
    getContact();
  }, []);

  return (
    <BaseContainer backgroundColor={colors.secondary} barStyle="dark-content">
      <FlatList
        style={{flex: 1, width}}
        contentContainerStyle={{alignItems: 'center'}}
        data={dummyList}
        keyExtractor={contact => contact.id}
        renderItem={renderContacts}
      />
      <TouchableOpacity>
        <View></View>
      </TouchableOpacity>
    </BaseContainer>
  );
}

const styles = StyleSheet.create({});
