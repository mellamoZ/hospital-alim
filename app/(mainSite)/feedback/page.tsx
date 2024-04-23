"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createFeedback } from "@/lib/db/feedbackCrud";
import { LoadingSpinner } from "@/components/ui/loading";
import { feedbackFormSchema } from "@/lib/formSchemas";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

type FeedbackFormSchemaType = z.infer<typeof feedbackFormSchema>;

export default function Feedback() {
  const form = useForm<FeedbackFormSchemaType>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
      comment: "",
    },
  });

  const [formSubmissionStatus, setFormSubmissionStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const onSubmit = async (values: FeedbackFormSchemaType) => {
    try {
      const result = await createFeedback({
        full_name: values.full_name,
        email: values.email,
        comment: values.comment,
        phone_number: values.phone_number,
      });

      if ("message" in result) {
        setFormSubmissionStatus({
          type: "error",
          message: result.message,
        });
        return null;
      }

      setFormSubmissionStatus({
        type: "success",
        message:
          "Your feedback has been successfully submitted. We appreciate your input.",
      });

      form.reset();
      return null;
    } catch (error) {
      setFormSubmissionStatus({
        type: "error",
        message: "Failed to submit feedback. Please try again.",
      });
      return error;
    }
  };

  return (
    <div className="mt-10 flex items-center justify-center">
      <Card className="w-full max-w-screen-xl">
        <CardHeader>
          <CardTitle>Feedback</CardTitle>
          <CardDescription>
            Please provide your valuable feedback to help us improve our
            services. We appreciate your input and strive to enhance your
            experience with us.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 text-start"
            >
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your Name" {...field} />
                    </FormControl>

                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your Phone Number" {...field} />
                    </FormControl>

                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your Email" {...field} />
                    </FormControl>

                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter Your Message" {...field} />
                    </FormControl>

                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="flex gap-2 bg-brand-primary/90 text-white hover:bg-brand-primary"
              >
                Submit
                <LoadingSpinner loading={form.formState.isSubmitting} />
              </Button>
            </form>
          </Form>
          {formSubmissionStatus && (
            <div
              className={cn(
                `mt-3 max-w-lg rounded-md border p-4`,
                formSubmissionStatus.type === "success"
                  ? "bg-green-100"
                  : "bg-red-100"
              )}
            >
              <p className="text-xl">{formSubmissionStatus.message}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
}
