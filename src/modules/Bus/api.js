import { AsyncStorage } from 'react-native';
import axios from 'axios';
import moment from 'moment';

import utils from '../../utils';

moment.locale('es');

export const getHeaders = async () => {
  const token = await getToken();

  const headers = {
    Accept: 'application/json',
    accessToken: token,
  };
  return headers;
};

export const getMultipartHeaders = async () => {
  const token = await getToken();

  const headers = {
    'Content-Type': 'multipart/form-data',
    accept: 'application/json',
    accessToken: token,
  };
  return headers;
};

export const getListLines = async () => {
  const headers = await getHeaders();

  return axios({
    url: `${utils.Api.apiNew}transport/busemtmad/lines/info/${moment().format(
      'YYYYMMDD',
    )}`,
    method: 'GET',
    headers,
  });
};

export const getDirectionLine = async ({ line }) => {
  const headers = await getHeaders();

  return axios({
    url: `${
      utils.Api.apiNew
    }transport/busemtmad/lines/${line}/info/${moment().format('YYYYMMDD')}`,
    method: 'GET',
    headers,
  });
};

export const getRoutesLine = async ({ line, directionLine }) => {
  const headers = await getHeaders();

  return axios({
    url: `${
      utils.Api.apiNew
    }transport/busemtmad/lines/${line}/stops/${directionLine}/`,
    method: 'GET',
    headers,
  });
};

export const fetchBusStop = async ({ idStop }) => {
  const headers = await getHeaders();

  return axios({
    url: `${utils.Api.apiNew}transport/busemtmad/stops/${idStop}/detail/`,
    method: 'GET',
    headers,
  });
};

export const fetchBusStopTimes = async ({ idStop }) => {
  const headers = await getHeaders();

  return axios({
    url: `${utils.Api.apiNew}transport/busemtmad/stops/${idStop}/arrives/`,
    method: 'POST',
    headers,
    data: {
      cultureInfo: 'ES',
      Text_StopRequired_YN: 'Y',
      Text_EstimationsRequired_YN: 'Y',
      Text_IncidencesRequired_YN: 'Y',
      DateTime_Referenced_Incidencies_YYYYMMDD: moment().format('YYYYMMDD'),
    },
  });
};

export const saveFavorites = async (payload) => {
  try {
    await AsyncStorage.setItem('FAVORITES', JSON.stringify(payload));
  } catch (error) {
    // console.log(error);
  }
};

export const saveToken = async (payload) => {
  try {
    await AsyncStorage.setItem('accessToken', JSON.stringify(payload));
    return true;
  } catch (error) {
    return false;
    // console.log(error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    return token !== null ? JSON.parse(token) : null;
  } catch (error) {
    // console.log(error);
    return null;
  }
};

export const clearToken = async () => {
  try {
    await AsyncStorage.removeItem('accessToken');
    return true;
  } catch (error) {
    // console.log(error);
    return false;
  }
};

export const getFavorites = async () => {
  try {
    const listFavorites = await AsyncStorage.getItem('FAVORITES');
    return listFavorites !== null
      && JSON.parse(listFavorites)
      && Array.isArray(JSON.parse(listFavorites))
      ? JSON.parse(listFavorites)
      : [];
  } catch (error) {
    // console.log(error);
    return false;
  }
};

export const loginEmt = async () => {
  const headers = await getHeaders();

  return axios({
    url: `${utils.Api.apiNew}mobilitylabs/user/login/`,
    method: 'GET',
    headers: {
      ...headers,
      email: 'jlhdevelop@gmail.com',
      password: 'tBV75KrS7seUR25',
    },
  });
};
