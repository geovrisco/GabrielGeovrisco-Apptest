import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors, fontSize} from '../utils/constants';

export default function Button({
  title = 'Value',
  onPress = () => {},
  outline = false,
  width = 140,
  backgroundColor = colors.accentB,
  outlineColor = colors.secondary,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={
          outline
            ? styles.outlineContainer(width, backgroundColor, outlineColor)
            : styles.container(width, backgroundColor)
        }>
        <Text style={styles.textStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: (width, color) => ({
    width: width,
    backgroundColor: color,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  outlineContainer: (width, color, outlineColor) => ({
    width: width,
    backgroundColor: color,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: outlineColor,
  }),
  textStyle: {
    fontSize: fontSize.m,
    fontWeight: 'bold',
    color: colors.secondary,
  },
});
