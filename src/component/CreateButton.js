import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors, fontSize, padder} from '../utils/constants';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function CreateButton({onPress = () => {}}) {
  const insets = useSafeAreaInsets();
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.buttonContainer(insets)}
      onPress={onPress}>
      <View style={styles.center}>
        <View style={styles.iconContainer}>
          <MaterialIcon
            name="add-circle"
            size={fontSize.iconXL}
            color={colors.secondary}
          />
        </View>
        <View style={styles.blueShape} />
        <View style={styles.textContainer}>
          <Text style={styles.iconText}>New Contact</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: insets => ({
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: insets.bottom,
  }),
  blueShape: {
    position: 'absolute',
    width: 110,
    height: 35,
    backgroundColor: colors.primary,
    zIndex: -1,
    bottom: 5,
    borderRadius: 10,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: colors.accentB,
    height: fontSize.iconXL + 10,
    width: fontSize.iconXL + 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: fontSize.iconXL + 10 / 2,
    marginBottom: padder.s,
  },
  iconText: {
    color: colors.secondary,
    fontWeight: '700',
  },
  textContainer: {
    width: 100,
    backgroundColor: colors.accentB,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
    borderRadius: 10,
  },
});
