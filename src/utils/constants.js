import React from 'react';
import {Dimensions, Animated} from 'react-native';

const {height, width} = Dimensions.get('screen');

export const routes = {
  list: 'listScreen',
  detail: 'detailScreen',
  create: 'createScreen',
};

export const fontSize = {
  small: 12,
  medium: 14,
  large: 16,
};

export const colors = {
  shade: '#a2a3a2',
  primary: '#00a4de',
  secondary: '#fefffe',
  accentA: '#f78c2c',
  accentB: '#8fbf01',
  dark: '#4e4e4e',
};

export const padder = {
  vertical: {
    v1: (height * 1) / 100,
    v2: (height * 3) / 100,
    v3: (height * 5) / 100,
  },
  horizontal: {
    h1: (width * 1) / 100,
    h2: (width * 3) / 100,
    h3: (width * 5) / 100,
  },
};

const baseUrl = `https://simple-contact-crud.herokuapp.com`;
export const URL = {
  contact: `${baseUrl}/contact`,
};

export const verticalSlide = ({current, next, inverted, layouts: {screen}}) => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
      : 0,
  );

  return {
    cardStyle: {
      transform: [
        {
          translateY: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [height, 0, -height],
              extrapolate: 'clamp',
            }),
            inverted,
          ),
        },
      ],
    },
  };
};

export const horizontalSlide = ({
  current,
  next,
  inverted,
  layouts: {screen},
}) => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
      : 0,
  );

  return {
    cardStyle: {
      transform: [
        {
          translateX: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [width, 0, -width],
              extrapolate: 'clamp',
            }),
            inverted,
          ),
        },
      ],
    },
  };
};
