import {fetchFaculties, fetchDepartments} from '@/api/school';
import {sendToast} from '@/components/Template/utils';
import {z} from 'zod';

export const userSchema = z.object({
  firstName: z
    .string()
    .min(3, {message: 'First name must be at least 3 characters'})
    .regex(/^[a-zA-Z]+$/, {message: 'First name must contain only alphabets'})
    .optional(),
  lastName: z
    .string()
    .min(3, {message: 'Last name must be at least 3 characters'})
    .regex(/^[a-zA-Z]+$/, {message: 'Last name must contain only alphabets'})
    .optional(),
  dob: z.date().optional(),
  phoneNumber: z
    .string()
    .length(11, {message: 'Phone number must be 11 digits'})
    .regex(/^[0-9]+$/, {message: 'Phone number must contain only digits'})
    .optional(),
  gps: z.string().optional(),
  matricNo: z
    .string()
    .min(4, {message: 'Matric number must be at least 4 characters'})
    .optional(),
  level: z
    .enum(['100', '200', '300', '400', '500'], {message: 'Invalid level'})
    .optional(),
  semester: z.number().int().min(1).max(2).optional(),
  cgpa: z.coerce
    .number()
    .min(0, {message: 'CGPA must be at least 0'})
    .max(5, {message: 'CGPA must be at most 5'})
    .optional(),
  position: z.string().optional(),
  directorate: z.string().optional(),
});

const fetchData = async (functionName, query, setLoading) => {
  try {
    setLoading(true);
    const {data, status} = await functionName(query);
    setLoading(false);
    if (status !== 200) {
      sendToast('error', 'Unable to fetch data. Please try again later');
      return [];
    }
    return data?.data;
  } catch (error) {
    sendToast('error', 'An error occurred. Please try again later');
    return [];
  }
};

export const data = [
  [
    {
      label: 'Faculty',
      key: 'faculty',
      format: value => `${value}`,
      type: 'picker',
      prompt: 'Select a faculty',
      action: setLoading => fetchData(fetchFaculties, '', setLoading),
    },
    {
      label: 'Department',
      key: 'department',
      format: value => `${value}`,
      type: 'picker',
      prompt: 'Select a department',
      action: setLoading => fetchData(fetchDepartments, '', setLoading),
    },
  ],
];

export const student = [
  [
    {
      label: 'Level',
      key: 'level',
      format: value => `${value} Level`,
      type: 'picker',
      action: setLoading => [
        {id: '100', name: '100 Level'},
        {id: '200', name: '200 Level'},
        {id: '300', name: '300 Level'},
        {id: '400', name: '400 Level'},
        {id: '500', name: '500 Level'},
      ],
    },
    {
      label: 'Semester',
      key: 'semester',
      format: value => `${value === 1 ? 'First' : 'Second'} Semester`,
      type: 'picker',
      action: setLoading => [
        {id: 1, name: 'First Semester'},
        {id: 2, name: 'Second Semester'},
      ],
    },
  ],
  [
    {
      label: 'Matric Number',
      key: 'matricNo',
      format: value => `${value}`,
    },
    {
      label: 'CGPA',
      key: 'cgpa',
      format: value => value.toString(),
      keyboardType: 'decimal-pad',
    },
  ],
];

export const staff = [
  [
    {
      label: 'Position',
      key: 'position',
      format: value => `${value}`,
    },
    {
      label: 'Directorate',
      key: 'directorate',
      format: value => `${value}`,
    },
  ],
];

export const name = [
  [
    {
      label: 'First Name',
      key: 'firstName',
      format: value => `${value}`,
    },
    {
      label: 'Last Name',
      key: 'lastName',
      format: value => `${value}`,
    },
  ],
];
