"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createDoctor } from "@/lib/db/doctorCrud";
import { LoadingSpinner } from "@/components/ui/loading";
import { insertAlgoliaRecord } from "@/lib/algolia/algoliaCRUD";
import { EntityType } from "@/lib/algolia/entityType";
import { doctorFormSchema } from "@/lib/formSchemas";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

type DoctorFormSchemaType = z.infer<typeof doctorFormSchema>;

export default function CreateDoctorPage() {
  const form = useForm<DoctorFormSchemaType>({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: {
      doctor_name: "",
      email: "",
      phone_number: "",
      specialization: "",
      description: "",
      photo_url: "",
    },
  });

  const { toast } = useToast();

  async function onSubmit(values: DoctorFormSchemaType) {
    try {
      const result = await createDoctor({
        doctor_name: values.doctor_name,
        email: values.email,
        phone_number: values.phone_number,
        specialization: values.specialization,
        description: values.description,
        photo_url: values.photo_url,
      });

      if ("message" in result) {
        toast({
          variant: "destructive",
          description: "Uh oh! Something went wrong.",
        });
        return result;
      }

      const createdDoctor = result;

      await insertAlgoliaRecord(
        {
          id: createdDoctor.doctor_id.toString(),
          description: createdDoctor.description
            ? `${createdDoctor.description} ${createdDoctor.doctor_name} ${createdDoctor.specialization}`
            : `${createdDoctor.doctor_name} ${createdDoctor.specialization}`,
          page: "doctors",
        },
        EntityType.Doctor
      );

      toast({
        description: "Doctor created successfully! ✅",
      });

      form.reset();
      return null;
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Uh oh! Something went wrong.",
      });
      return error;
    }
  }

  return (
    <div className="max-w-screen-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* doctor name */}
          <FormField
            control={form.control}
            name="doctor_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">doctor name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Full Name here" {...field} />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          {/* email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Email Here" {...field} />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          {/* specialization */}
          <FormField
            control={form.control}
            name="specialization"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">specialization</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Specialization" {...field} />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          {/* phone number */}
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">phone number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Phone Number" {...field} />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* image url */}
          <FormField
            control={form.control}
            name="photo_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">photo url</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter Description..." {...field} />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="flex gap-2"
          >
            Submit
            {form.formState.isSubmitting ? <LoadingSpinner /> : null}
          </Button>
        </form>
      </Form>
    </div>
  );
}
