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
import { createAppointment } from "@/lib/db/appointmentCrud";
import { LoadingSpinner } from "@/components/ui/loading";
import { Textarea } from "@/components/ui/textarea";
import { appointmentFormSchema } from "@/lib/formSchemas";
import { useState } from "react";
import { cn } from "@/lib/utils";

type AppointmentFormSchemaType = z.infer<typeof appointmentFormSchema>;

export default function BookAnAppointment() {
  const form = useForm<AppointmentFormSchemaType>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      full_name: "",
      phone_number: "",
      appointment_reason: "",
    },
  });

  const [formSubmissionStatus, setFormSubmissionStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const onSubmit = async (values: AppointmentFormSchemaType) => {
    try {
      const result = await createAppointment({
        full_name: values.full_name,
        phone_number: values.phone_number,
        appointment_reason: values.appointment_reason,
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
          "Your appointment has been successfully booked. We will contact you as soon as possible.",
      });
      form.reset();
      return null;
    } catch (error) {
      setFormSubmissionStatus({
        type: "error",
        message: "Error submitting appointment. Please try again later.",
      });
      return error;
    }
  };

  return (
    <div className="mt-10 flex items-center justify-center">
      <Card className="w-full max-w-screen-xl">
        <CardHeader>
          <CardTitle>Book An Appointment</CardTitle>
          <CardDescription>
            Please fill out the form below to book an appointment. Provide your
            full name, phone number, and a brief description of the reason for
            your appointment.
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
                name="appointment_reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      Appointment Reason
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter Reason for Appointment"
                        {...field}
                      />
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
