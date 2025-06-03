"use client";

import { useFormState, useFormStatus } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { submitEnquiry, type EnquiryFormState } from "@/app/actions";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useActionState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const enquiryFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(100),
  email: z.string().email({ message: "Please enter a valid email address." }).max(100),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(1000),
});

type EnquiryFormValues = z.infer<typeof enquiryFormSchema>;

const initialState: EnquiryFormState = {
  message: "",
  isSuccess: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Send Message
    </Button>
  );
}

export function EnquiryForm() {
  const [state, formAction] = useActionState(submitEnquiry, initialState);
  const { toast } = useToast();

  const form = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquiryFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  
  useEffect(() => {
    if (state.message) {
      if (state.isSuccess) {
        toast({
          title: "Success!",
          description: state.message,
        });
        form.reset(); // Reset form on successful submission
      } else { // Error
        toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
        });
        // Populate field errors from zod issues if available in state.issues
        if (state.issues && state.fields) {
          const parsed = enquiryFormSchema.safeParse(state.fields);
          if (!parsed.success) {
            parsed.error.issues.forEach(issue => {
              const fieldName = issue.path[0] as keyof EnquiryFormValues;
              if (fieldName) {
                 form.setError(fieldName, { type: "server", message: issue.message });
              }
            });
          }
        }
      }
    }
  }, [state, toast, form]);


  return (
    <section id="contact" className="py-16 md:py-24 bg-background flex justify-center items-center">
      <div className="container max-w-2xl">
        <Card className="shadow-xl border-2 border-primary/10 rounded-xl">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl font-bold text-primary md:text-4xl">Contact Us</CardTitle>
            <CardDescription className="text-foreground/70 mt-2">
              Have questions or want to learn more? Send us a message!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(async (data) => {
                  const formData = new FormData();
                  Object.entries(data).forEach(([key, value]) => {
                    formData.append(key, value);
                  });
                  await formAction(formData);
                })}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your query or feedback..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <SubmitButton />
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
