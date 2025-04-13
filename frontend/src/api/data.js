import {makeApiRequest} from './request';

const PATH = '/api/v1/data';

export const fetchEvents = async query => {
  const response = await makeApiRequest('GET', `${PATH}/events?${query}`);
  return response;
};

export const fetchAnnouncements = async query => {
  const response = await makeApiRequest('GET', `${PATH}/announcement?${query}`);
  return response;
};

export const fetchBusiness = async query => {
  const response = await makeApiRequest('GET', `${PATH}/business?${query}`);
  return response;
};
