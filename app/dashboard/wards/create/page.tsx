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
import { LoadingSpinner } from "@/components/ui/loading";
import { createWard } from "@/lib/db/wardCrud";
import { insertAlgoliaRecord } from "@/lib/algolia/algoliaCRUD";
import { EntityType } from "@/lib/algolia/entityType";
import { wardFormSchema } from "@/lib/formSchemas";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

type WardFormSchemaType = z.infer<typeof wardFormSchema>;

export default function CreateWardPage() {
  const form = useForm<WardFormSchemaType>({
    resolver: zodResolver(wardFormSchema),
    defaultValues: {
      ward_name: "",
      image_url: "",
      description: "",
    },
  });

  const { toast } = useToast();
  async function onSubmit(values: WardFormSchemaType) {
    try {
      const result = await createWard({
        ward_name: values.ward_name,
        image_url: values.image_url,
        description: values.description,
      });

      if ("message" in result) {
        toast({
          variant: "destructive",
          description: "Uh oh! Something went wrong.",
        });
        return result;
      }

      const createdWard = result;

      await insertAlgoliaRecord(
        {
          id: createdWard.ward_id.toString(),
          description: createdWard.description
            ? `${createdWard.description} ${createdWard.ward_name}`
            : `${createdWard.ward_name}`,
          page: "wards",
        },
        EntityType.Ward
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
            name="ward_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">ward name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Ward Name" {...field} />
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
                <FormLabel className="capitalize">Image Url</FormLabel>
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
