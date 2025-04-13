import {makeApiRequest} from './request';

const PATH = '/api/v1/user';

/*****************************************************
 * Profile Request
 * ***************************************************
 */
export const fetchProfile = async () => {
  const response = await makeApiRequest('GET', `${PATH}/profile`);
  return response;
};

export const updateProfile = async data => {
  const response = await makeApiRequest('PATCH', PATH, data);
  return response;
};

export const deleteProfile = async () => {
  const response = await makeApiRequest('DELETE', PATH);
  return response;
};

/*****************************************************
 * Activity Request
 * ***************************************************
 */
export const fetchActivity = async (query = '') => {
  const response = await makeApiRequest('GET', `${PATH}/activity?${query}`);
  return response;
};

export const deleteActivity = async (query = '') => {
  const response = await makeApiRequest('DELETE', `${PATH}/activity?${query}`);
  return response;
};

export const fetchCourses = async () => {
  const response = await makeApiRequest('GET', `${PATH}/courses`);
  return response;
};

export const fetchUsers = async (query = '') => {
  const response = await makeApiRequest('GET', `${PATH}/users?${query}`);
  return response;
};

/*****************************************************
 * Payment Method Request
 * ***************************************************
 */
export const addPaymentMethod = async data => {
  const response = await makeApiRequest('POST', `${PATH}/payment/method`, data);
  return response;
};

export const withdrawPoint = async data => {
  const response = await makeApiRequest('GET', `${PATH}/payment/redeem`, data);
  return response;
};

export const fetchPaymentMethod = async () => {
  const response = await makeApiRequest('GET', `${PATH}/payment/method`);
  return response;
};

export const deletePaymentMethod = async (query = '') => {
  const response = await makeApiRequest(
    'DELETE',
    `${PATH}/payment/method?${query}`,
  );
  return response;
};

export const updatePaymentMethod = async (id, data) => {
  const response = await makeApiRequest(
    'PATCH',
    `${PATH}/payment/method/${id}`,
    data,
  );
  return response;
};

/*****************************************************
 * Payment Request
 * ***************************************************
 */
export const fetchPaymentHistory = async (query = '') => {
  const response = await makeApiRequest(
    'GET',
    `${PATH}/payment/history?${query}`,
  );
  return response;
};

/*****************************************************
 * Security Request
 * ***************************************************
 */
export const sendNotification = async () => {
  const response = await makeApiRequest('POST', `${PATH}/notification`);
  return response;
};

export const registerDeviceToken = async data => {
  const response = await makeApiRequest(
    'POST',
    `${PATH}/notification/token`,
    data,
  );
  return response;
};

/*****************************************************
 * File Request
 * ***************************************************
 */
export const uploadFile = async (type, data) => {
  const response = await makeApiRequest(
    'POST',
    `${PATH}/file/upload/${type}`,
    data,
  );
  return response;
};
