import {makeApiRequest} from './request';

const PATH = '/api/v1/school';

export const fetchDepartments = async query => {
  const response = await makeApiRequest('GET', `${PATH}/departments?${query}`);
  return response;
};

export const fetchFaculties = async query => {
  const response = await makeApiRequest('GET', `${PATH}/faculty?${query}`);
  return response;
};

export const fetchAcademicCalendar = async query => {
  const response = await makeApiRequest('GET', `${PATH}/calendar?${query}`);
  return response;
};

export const fetchCourses = async query => {
  const response = await makeApiRequest('GET', `${PATH}/courses?${query}`);
  return response;
};
