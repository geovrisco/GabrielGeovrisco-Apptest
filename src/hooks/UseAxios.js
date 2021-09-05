import React, {useState} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import axios from 'axios';

export default function UseAxios(url, method = 'GET') {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const apiRequest = async body => {
    try {
      setLoading(true);
      let response;
      if (method == 'POST') {
        response = await axios.post(url, body);
      } else {
        response = await axios({
          url,
          method,
        });
      }
      if (response.status == 400 || response.status == 500) {
        throw {code: response.status, message: 'Network Error', data: response};
      }
      setData(response.data);
      return response;
    } catch (error) {
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
