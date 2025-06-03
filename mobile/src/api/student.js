import {makeApiRequest} from './request';

const PATH = '/api/v1/student';
// GET SCHOLARSHIP
export const fetchScholarship = async (query = '') => {
  const response = await makeApiRequest('GET', `${PATH}/scholarships?${query}`);
  return response;
};

// GET ACADEMIC RESOURCES
export const fetchAcademicResources = async () => {
  const response = await makeApiRequest('GET', '/student/study/download');
  return response;
};
