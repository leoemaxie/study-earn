"use server";

import { z } from "zod";

const enquirySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(100),
  email: z.string().email({ message: "Please enter a valid email address." }).max(100),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(1000),
});

export type EnquiryFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  isSuccess?: boolean;
};

export async function submitEnquiry(
  prevState: EnquiryFormState,
  data: FormData
): Promise<EnquiryFormState> {
  const formData = Object.fromEntries(data);
  const parsed = enquirySchema.safeParse(formData);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    const issues: string[] = [];
    parsed.error.issues.forEach(issue => {
      const path = issue.path.join('.');
      fieldErrors[path] = issue.message;
      issues.push(issue.message);
    });

    return {
      message: "Invalid form data. Please check the fields below.",
      fields: formData as Record<string, string>,
      issues: issues,
      isSuccess: false,
    };
  }

  // Simulate API call or database interaction
  // console.log("Enquiry submitted:", parsed.data);
  // In a real application, you would send an email, save to DB, etc.
  // Example: await sendEmail(parsed.data);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));


  return { 
    message: "Thank you for your enquiry! We will get back to you soon.",
    isSuccess: true,
   };
}
