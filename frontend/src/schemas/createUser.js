import {z} from 'zod';

const schema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required',
    })
    .regex(/^[A-Za-z]{3,}$/, {
      message:
        'First name must be at least 3 characters long and contain only alphabets',
    }),
  lastName: z
    .string({
      required_error: 'Last name is required',
    })
    .regex(/^[A-Za-z]{3,}$/, {
      message:
        'First name must be at least 3 characters long and contain only alphabets',
    }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .regex(/^[a-z]+@(student\.)?lautech\.edu\.ng$/, {
      message: 'Invalid school email',
    }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character',
      },
    ),
  phoneNumber: z
    .string({
      required_error: 'Phone number is required',
    })
    .regex(/^(\+234|0)[789][01]\d{8}$/, {
      message: 'Invalid phone number',
    }),
  role: z.enum(['student', 'staff']),
  departmentId: z.string()
});

export default schema;
