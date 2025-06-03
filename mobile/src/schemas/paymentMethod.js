import {z} from 'zod';

const schema = z.object({
  bankName: z
    .string({
      required_error: 'Bank name is required',
    })
    .min(3, {
      message: 'Bank name must be at least 3 characters long',
    })
    .regex(/^[A-Za-z\s]+$/, {
      message: 'Bank name must contain only alphabets',
    }),
  accountNumber: z
    .string({
      required_error: 'Account number is required',
    })
    .length(10, {
      message: 'Account number must be 10 digits',
    })
    .regex(/^\d+$/, {
      message: 'Account number must contain only numbers',
    }),
  accountName: z
    .string({
      required_error: 'Account name is required',
    })
    .min(3, {
      message: 'Account name must be at least 3 characters long',
    })
    .regex(/^[A-Za-z\s]+$/, {
      message: 'Account name must contain only alphabets',
    }),
});

export default schema;
