import React from 'react';
import {createStore} from 'redux';
import contactReducer from './reducers/contactsReducer';

const store = createStore(contactReducer);
export default store;
