import React, {useRef} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BaseContainer from '../component/BaseContainer';
import Header from '../component/Header';
import {colors, fontSize, padder, routes, URL} from '../utils/constants';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TabButton from '../component/TabButton';
import UseAxios from '../hooks/UseAxios';
import axios from 'axios';
const {width, height} = Dimensions.get('screen');
export default function DetailScreen({navigation, route}) {
  const {detailData} = route.params;
  const {apiRequest} = UseAxios(`${URL.contact}/${detailData.id}`, 'DELETE');
  const handleDelete = async () => {
    try {
      let response = await axios.delete(`${URL.contact}/${detailData.id}`);
    } catch (error) {
      alert('Something happen on our side');
    } finally {
      navigation.goBack();
    }
  };
  const goBack = () => {
    navigation.goBack();
  };
  const handleEdit = () => {
    navigation.navigate(routes.create, {edit: true, ...detailData});
  };

  const promptDelete = () => {
    Alert.alert(
      'Confirm Action',
      `Do you want to delete ${detailData.firstName} from contacts ?`,
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Yes',
          onPress: () => handleDelete(),
        },
      ],
    );
  };

  let imageSource = detailData.photo;
  if (!detailData.photo.includes('https')) {
    imageSource = detailData.photo.replace('http', 'https');
  }
  const inset = useSafeAreaInsets();

  return (
    <BaseContainer backgroundColor={colors.secondary} barStyle="dark-content">
      <Header detail={true} icon="chevron-left" title={''} onPress={goBack} />
      <ImageBackground
        imageStyle={styles.bgContainer}
        style={styles.bgStyles}
        source={{uri: 'https://picsum.photos/400/250?blur=5'}}>
        <Text style={styles.name}>
          {detailData.firstName} {detailData.lastName} ({detailData.age})
        </Text>
        <View style={styles.avatar}>
          {imageSource == 'N/A' ? (
            <MaterialIcon name="person" color={colors.primary} size={90} />
          ) : (
            <Image style={styles.avatarImg} source={{uri: imageSource}} />
          )}
        </View>
      </ImageBackground>
      <View style={styles.separator} />
      <View style={styles.body}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <MaterialIcon name="local-phone" size={50} color={colors.dark} />
          <Text style={styles.callTExt}>No Call Logs Yet!</Text>
        </View>
        <View
          style={[
            styles.tabBar,
            {paddingBottom: inset.bottom ? inset.bottom - 20 : 0, bottom: 0},
          ]}>
          <TabButton onPress={promptDelete} />
          <TabButton title="edit" icon="edit" onPress={handleEdit} />
        </View>
      </View>
    </BaseContainer>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: colors.secondary,
    borderRadius: 75,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: -30,
  },
  avatarImg: {width: 110, height: 110, borderRadius: 110 / 2},
  bgContainer: {},
  bgStyles: {
    width: width,
    height: height * 0.35,
    alignItems: 'center',
    marginTop: Platform.OS == 'android' ? -height * 0.1 : -height * 0.15,
  },
  name: {
    fontSize: fontSize.xl,
    zIndex: 10,
    position: 'absolute',
    bottom: 100,
    fontWeight: 'bold',
    color: colors.secondary,
    letterSpacing: 1,
  },
  callTExt: {
    fontSize: fontSize.xm,
    fontWeight: '500',
    color: colors.dark,
  },
  body: {
    width: width,
    zIndex: -1,
    paddingVertical: 10,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.lightShade,
  },
  separator: {
    height: (height * 0.5) / 100,
    width,
    backgroundColor: colors.secondary,
    zIndex: -1,
  },
  tabBar: {
    position: 'absolute',
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-evenly',
    backgroundColor: colors.primary,
    height: (height * 10) / 100,
    alignItems: 'center',
  },
});
