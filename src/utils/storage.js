'use strict';
import { AsyncStorage } from 'react-native';
import { API_TOKEN } from './../constants/config.js';

export const setUserToken = (token) => {
  return forgetItem(API_TOKEN)
  .then(() => {
    console.log('CREANDO EN DISPOSITIVO.....' + token);
    console.log(token);
    return AsyncStorage.setItem(API_TOKEN, token, (err) => {
      if (err) {
        throw err;
      }
    });
  }, (err) => {
    console.log(err);
  });
};

export const getUserToken = () => AsyncStorage.getItem(API_TOKEN);

export const forgetItem = (key) => {
  console.log('OLVIDANDO ....');
  return AsyncStorage.removeItem(key);
};
