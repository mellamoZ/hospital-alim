import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoadingSpinner } from "@/components/ui/loading";
import { useRouter } from "next/navigation";
import { createGeneralNewsPost } from "@/lib/db/generalNewsCrud";
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

const formSchema = z.object({
  fb_url: z
    .string()
    .includes("iframe", { message: "Invalid Facebook post link" }),
});
const AddNews = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fb_url: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const regex = /src="(.*?)"/;
      const result = data.fb_url.match(regex);

      if (result) {
        const fbLink = result[1];
        await createGeneralNewsPost({ fb_url: fbLink });

        setIsDialogOpen(false);
        // Reset form inputs
        form.reset();
        router.refresh();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-emerald-500 text-white hover:bg-emerald-600 hover:text-white"
        >
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Add your news post</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="fb_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook Post</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={form.formState.isSubmitting}>
              Submit
              {form.formState.isSubmitting && <LoadingSpinner />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNews;
