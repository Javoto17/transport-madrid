import {
  AsyncStorage,
} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import utils from '../../utils';

moment.locale('es');

export const getListLines = async () => {
  const headers = await utils.Api.getMultipartHeaders();
  const bodyFormData = new FormData();
  bodyFormData.append('idClient', utils.Api.idClient);
  bodyFormData.append('passKey', utils.Api.APIKEY);
  bodyFormData.append('SelectDate', moment().format('DD-MM-YYYY'));

  return axios({
    url: `${utils.Api.baseBusURL}GetListLines.php`,
    method: 'POST',
    headers,
    data: bodyFormData,
  });
};

export const getDirectionLine = async ({
  line,
}) => {
  const headers = await utils.Api.getMultipartHeaders();
  const bodyFormData = new FormData();
  bodyFormData.append('idClient', utils.Api.idClient);
  bodyFormData.append('passKey', utils.Api.APIKEY);
  bodyFormData.append('fecha', moment().format('DD-MM-YYYY'));
  bodyFormData.append('line', line);
  return axios({
    url: `${utils.Api.baseGeoURL}GetInfoLine.php`,
    method: 'POST',
    headers,
    data: bodyFormData,
  });
};

export const getRoutesLine = async ({
  line,
  directionLine,
}) => {
  const headers = await utils.Api.getMultipartHeaders();
  const bodyFormData = new FormData();
  bodyFormData.append('idClient', utils.Api.idClient);
  bodyFormData.append('passKey', utils.Api.APIKEY);
  bodyFormData.append('direction', directionLine);
  // bodyFormData.append('SelectDate', moment().format('DD-MM-YYYY'));
  bodyFormData.append('line', line);

  return axios({
    url: `${utils.Api.baseGeoURL}GetStopsLine.php`,
    method: 'POST',
    headers,
    data: bodyFormData,
  });
};

export const fetchBusStop = async ({
  idStop,
}) => {
  const headers = await utils.Api.getMultipartHeaders();
  const bodyFormData = new FormData();

  bodyFormData.append('idClient', utils.Api.idClient);
  bodyFormData.append('passKey', utils.Api.APIKEY);
  bodyFormData.append('idStop', idStop);

  return axios({
    url: `${utils.Api.baseGeoURL}GetArriveStop.php`,
    method: 'POST',
    headers,
    data: bodyFormData,
  });
};

export const saveFavorites = async (payload) => {
  try {
    await AsyncStorage.setItem('FAVORITES', JSON.stringify(payload));
  } catch (error) {
    console.log(error);
  }
};

export const getFavorites = async () => {
  try {
    const listFavorites = await AsyncStorage.getItem('FAVORITES');
    return listFavorites !== null && JSON.parse(listFavorites) && Array.isArray(JSON.parse(listFavorites)) ? JSON.parse(listFavorites) : [];
  } catch (error) {
    console.log(error);
    return false;
  }
};
