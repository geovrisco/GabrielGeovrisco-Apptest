import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../utils/constants';
const {width, height} = Dimensions.get('screen');

export default function TabButton({
  onPress = () => {},
  title = 'Delete',
  icon = 'delete',
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.tabButton}>
        <MaterialIcon name={icon} size={30} color={colors.secondary} />
        <Text style={styles.Text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    width: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    color: colors.secondary,
  },
});
