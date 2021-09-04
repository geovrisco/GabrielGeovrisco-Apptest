import React, {useState} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import axios from 'axios';

export default function UseAxios(url, method = 'GET') {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const apiRequest = async body => {
    console.log(url, 'ini URL');
    console.log(method, 'ini method');
    try {
      setLoading(true);
      let response;
      if (method.toUpperCase() === 'POST') {
        response = await axios({
          url,
          method,
          body,
        });
      } else {
        response = await axios({
          url,
          method,
        });
      }
      if (response.status !== 200) {
        throw {code: response.status, message: 'Network Error', data: response};
      }
      console.log(response.data, 'ini datanya');
      setData(response.data);
      return response;
    } catch (error) {
      console.log(error, Platform.OS, 'errorgaes');
      if (error.code) {
        Alert.alert('Ooops!', 'Something Bad Happen on ourside.\nTry again?', [
          {
            text: 'Yes',
            onPress: () => apiRequest(body),
          },
          {
            text: 'Nope',
          },
        ]);
      }
      setError(error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    apiRequest,
    data,
    error,
    loading,
  };
}
