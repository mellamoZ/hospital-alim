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

import { createDepartment } from "@/lib/db/departmentCrud";
import { LoadingSpinner } from "@/components/ui/loading";
import { insertAlgoliaRecord } from "@/lib/algolia/algoliaCRUD";
import { EntityType } from "@/lib/algolia/entityType";
import { departmentFormSchema } from "@/lib/formSchemas";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

type DepartmentFormSchemaType = z.infer<typeof departmentFormSchema>;

export default function CreateDepartmentPage() {
  const form = useForm<DepartmentFormSchemaType>({
    resolver: zodResolver(departmentFormSchema),
    defaultValues: {
      department_name: "",
      description: "",
      image_url: "",
    },
  });
  const { toast } = useToast();

  async function onSubmit(values: DepartmentFormSchemaType) {
    try {
      const result = await createDepartment({
        department_name: values.department_name,
        description: values.description,
        image_url: values.image_url,
      });

      if ("message" in result) {
        toast({
          variant: "destructive",
          description: "Uh oh! Something went wrong.",
        });
        return result;
      }

      const createdDepartment = result;

      await insertAlgoliaRecord(
        {
          id: createdDepartment.department_id.toString(),
          description: createdDepartment.description
            ? createdDepartment.description
            : "No description",
          page: "departments",
        },
        EntityType.Department
      );
      toast({
        description: "Department created successfully! ✅",
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
          <FormField
            control={form.control}
            name="department_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">department name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Department Name" {...field} />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">Image Url *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Image Url" {...field} />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">description *</FormLabel>
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
