import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../utils/constants';

export default function BaseContainer({
  backgroundColor = colors.primary,
  children,
  barStyle = 'light-content',
}) {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container(backgroundColor, insets)}>
      <>
        <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
        {children}
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: (color, insets) => ({
    flex: 1,
    alignItems: 'center',
    backgroundColor: color,
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
  }),
});
