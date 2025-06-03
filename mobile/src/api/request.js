import client from './client';

export const makeApiRequest = async (method, endpoint, data) => {
  try {
    const headers = client.defaults.headers;
    console.log(endpoint);
    console.log('Authorization Header:', headers.Authorization);

    const response = await client.request({
      method,
      url: endpoint,
      data, // add the data parameter to the request options
    });
    return {data: response?.data, status: response?.status};
  } catch (error) {
    console.log(
      '-----------------error from makeApiRequest----------',
      JSON.stringify(error.config, null, 2),
    );
    const {response} = error;
    if (response?.data) {
      return {data: response.data, status: response.status};
    }
    return {error: error.message || error};
  }
};
