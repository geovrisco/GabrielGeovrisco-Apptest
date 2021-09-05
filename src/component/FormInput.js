import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {colors, fontSize, padder} from '../utils/constants';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
export default function FormInput({
  value,
  placeholder = 'FirstName',
  iconName = 'person-add',
  onChangeText = () => {},
}) {
  return (
    <View style={styles.container}>
      <MaterialIcon name={iconName} size={fontSize.iconM} color={colors.dark} />
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.textInput}
        value={value}
      />
      <MaterialIcon
        name="check-circle"
        size={fontSize.iconM}
        color={value.length ? colors.primary : colors.secondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: colors.secondary,
    alignItems: 'center',
    padding: padder.xl,
    marginVertical: padder.xm,
    borderRadius: 10,
    paddingHorizontal: padder.l,
  },
  textInput: {
    width: '70%',
    color: colors.dark,
    fontWeight: 'bold',
    fontSize: fontSize.xm,
    marginHorizontal: '2%',
    padding: 0,
  },
});
