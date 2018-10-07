// utils
export const APIKEY = '0F17BA07-3C8A-4606-B99B-CC01264DBBF6';
export const baseBusURL = 'https://openbus.emtmadrid.es:9443/emt-proxy-server/last/bus/';
export const baseGeoURL = 'https://openbus.emtmadrid.es:9443/emt-proxy-server/last/geo/';
export const baseMediaURL = 'https://openbus.emtmadrid.es:9443/emt-proxy-server/last/media/';
export const idClient = 'WEB.SERV.javoto17@gmail.com ';

let headers;

export const getHeaders = async () => {
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  };
  return headers;
};

export const getMultipartHeaders = async () => {
  headers = {
    'Content-Type': 'multipart/form-data',
    accept: 'application/json',
  };
  return headers;
};
