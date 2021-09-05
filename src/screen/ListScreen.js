import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {colors, fontSize, padder, routes, URL} from '../utils/constants';
import BaseContainer from '../component/BaseContainer';
import {useDispatch, useSelector} from 'react-redux';
import {setContact} from '../store/actions';
import UseAxios from '../hooks/UseAxios';
import {dummyList} from '../utils/dummyLists';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ContactCards from '../component/ContactCards';
import CreateButton from '../component/CreateButton';
import {TextInput} from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('screen');

export default function ListScreen({navigation, route}) {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const contactLists = useSelector(selector => selector.data);
  const {apiRequest, loading} = UseAxios(URL.contact, 'GET');

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    if (!search) {
      setFilter(contactLists);
    } else {
      let filtered = contactLists.filter(
        item =>
          item.firstName.toLowerCase().includes(search.toLowerCase()) ||
          item.lastName.toLowerCase().includes(search.toLowerCase()),
      );

      setFilter(filtered);
    }
  }, [search]);

  const renderContacts = ({item, index}) => (
    <ContactCards
      onPress={() => navigateToDetail(item)}
      item={item}
      index={index}
      dataLength={filter.length}
    />
  );

  const navigateToCreate = () => {
    navigation.navigate(routes.create);
  };
  const navigateToDetail = item => {
    navigation.navigate(routes.detail, {detailData: item});
  };

  const getContact = async () => {
    const response = await apiRequest();
    const data = response.data.data;
    dispatch(setContact(data));
    setFilter(data);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getContact();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <BaseContainer backgroundColor={colors.secondary} barStyle="dark-content">
      <View style={styles.searchBar}>
        <Icon name="magnify" size={fontSize.iconM} color={colors.secondary} />
        <TextInput
          style={styles.textInput}
          placeholder="Search"
          onChangeText={text => setSearch(text)}
          placeholderTextColor={colors.secondary}
        />
      </View>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text>Loading</Text>
        </View>
      ) : (
        <FlatList
          style={{flex: 1, width}}
          contentContainerStyle={{alignItems: 'center'}}
          data={filter}
          keyExtractor={contact => contact.id}
          renderItem={renderContacts}
        />
      )}
      <CreateButton onPress={navigateToCreate} />
    </BaseContainer>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    width: width * 0.8,
    color: colors.dark,
    height: (height * 7) / 100,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    backgroundColor: colors.accentB,
    borderRadius: 30,
  },
  textInput: {
    width: width * 0.63,
    padding: 0,

    fontWeight: 'bold',
    color: colors.secondary,
    height: (height * 5) / 100,
    paddingLeft: 10,
    borderRadius: 20,
  },
});
