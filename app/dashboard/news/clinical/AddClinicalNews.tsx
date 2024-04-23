import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from "@/components/ui/loading";
import { useRouter } from "next/navigation";
import { createClinicalNewsPost } from "@/lib/db/ClinicalNewsCrud";
const AddClinicalNews = () => {
  const formSchema = z.object({
    title: z.string().refine((value) => value.trim() !== "", {
      message: "Title is required",
    }),
    body: z.string().refine((value) => value.trim() !== "", {
      message: "Body is required",
    }),
    image: z.string(),
  });

  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<z.infer<typeof formSchema>>(
    {
      resolver: zodResolver(formSchema),
    }
  );

  const submitData = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);

    await createClinicalNewsPost(data);

    setIsDialogOpen(false);
    setLoading(false);

    // reset form inputs
    reset({
      title: "",
      body: "",
      image: "",
    });

    router.refresh();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-emerald-500 text-white hover:bg-emerald-600   hover:text-white"
        >
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add your blog post</DialogTitle>
        </DialogHeader>
        <form action="" onSubmit={handleSubmit(submitData)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                required
                {...register("title")}
                id="title"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <Input {...register("image")} id="image" className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="body" className="text-right">
                Body
              </Label>
              <Textarea
                required
                {...register("body")}
                id="body"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-emerald-500 text-white hover:bg-emerald-600   hover:text-white"
              type="submit"
              disabled={loading}
            >
              {loading ? <LoadingSpinner /> : "Publish"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddClinicalNews;
