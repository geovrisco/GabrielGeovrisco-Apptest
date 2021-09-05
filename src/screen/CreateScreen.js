import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import BaseContainer from '../component/BaseContainer';
import {colors, padder, routes, URL} from '../utils/constants';
import Header from '../component/Header';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import UseAxios from '../hooks/UseAxios';
import Button from '../component/Button';
import FormInput from '../component/FormInput';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

const submitSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'first Name is too short!')
    .max(50, 'Too Long!')
    .required('First Name is empty!'),
  lastName: Yup.string()
    .min(3, 'last Name is too short')
    .max(50, 'Too Long!')
    .required('Last Name is empty'),
  age: Yup.number()
    .typeError('age must be a number!')
    .min(1, 'Age is invalid!')
    .required('Age is required')
    .positive('Age must be Positive Value')
    .integer('Age must be rounded value'),
  photo: Yup.string(),
});

export default function CreateScreen({navigation, route}) {
  const goBack = () => {
    navigation.goBack();
  };

  const postData = async values => {
    values.photo = `${URL.randomPic}?random=${Math.random() * 10 + 1}`;
    let body = {
      firstName: values.firstName.toString(),
      lastName: values.lastName.toString(),
      age: Number(values.age),
      photo: values.photo,
    };
    let result = await apiRequest(body);
    if (result.status !== 400 || result.status !== 500) {
      navigation.goBack();
    }
  };

  const editData = async values => {
    try {
      values.photo = `${URL.randomPic}?random=${Math.random() * 10 + 1}`;
      let body = {
        firstName: values.firstName.toString(),
        lastName: values.lastName.toString(),
        age: Number(values.age),
        photo: values.photo,
      };
      let url = `${URL.contact}/${route.params.id}`;
      let response = await axios.put(url, body);
      navigation.navigate(routes.list);
    } catch (error) {
      console.log(error);
    }
  };

  const {apiRequest} = UseAxios(URL.contact, 'POST');

  return (
    <BaseContainer backgroundColor={colors.primary} barStyle="light-content">
      <Header
        onPress={goBack}
        title={route.params.edit ? 'Edit Contact' : 'Create New Contact'}
      />
      <KeyboardAvoidingView
        style={{flex: 1, alignItems: 'center'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View>
          <Formik
            initialValues={{
              firstName: route.params.edit ? route.params.firstName : '',
              lastName: route.params.edit ? route.params.lastName : '',
              age: route.params.edit ? route.params.age.toString() : 0,
            }}
            validationSchema={submitSchema}
            onSubmit={
              route.params.edit
                ? values => editData(values)
                : values => postData(values)
            }>
            {({
              handleChange,
              handleSubmit,
              values,
              resetForm,
              errors,
              touched,
            }) => (
              <View style={styles.formContainer}>
                {errors.lastName || errors.firstName || errors.age ? (
                  <Text style={styles.errorMessage}>
                    {errors.firstName} {errors.lastName} {errors.age}
                  </Text>
                ) : null}
                <FormInput
                  value={values.firstName || ''}
                  placeholder="First Name"
                  onChangeText={handleChange('firstName')}
                  iconName="account-arrow-left"
                />

                <FormInput
                  value={values.lastName || ''}
                  placeholder="Last Name"
                  onChangeText={handleChange('lastName')}
                  iconName="account-arrow-right"
                />

                <FormInput
                  value={values.age || ''}
                  onChangeText={handleChange('age')}
                  placeholder="Age"
                  iconName="account-clock"
                />

                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    marginTop: padder.xm / 2,
                    marginBottom: padder.xm * 2,
                  }}>
                  <Button
                    backgroundColor={colors.primary}
                    outline={true}
                    outlineColor={colors.secondary}
                    title={route.params.edit ? 'Restore Data' : 'Clear Data'}
                    onPress={resetForm}
                  />
                  <Button
                    title={route.params.edit ? 'Edit' : 'Add'}
                    onPress={handleSubmit}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </BaseContainer>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    alignItems: 'center',
    width: '90%',
    borderRadius: 20,
    borderColor: colors.secondary,
    borderWidth: 1,
    marginTop: 50,
    paddingVertical: 10,
  },
  errorMessage: {
    padding: 10,
    backgroundColor: colors.accentA,
    color: colors.secondary,
    fontWeight: 'bold',
    borderRadius: 10,
  },
});
