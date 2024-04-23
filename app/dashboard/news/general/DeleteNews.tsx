import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading";
import { Trash2 } from "lucide-react";
import { deleteGeneralNewsPost } from "@/lib/db/generalNewsCrud";
import { useRouter } from "next/navigation";

interface DeleteNewsProps {
  id: number;
}

const DeleteNews: React.FC<DeleteNewsProps> = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const deleteNewsById = async () => {
    setLoading(true);

    await deleteGeneralNewsPost(id);

    setIsDialogOpen(false);
    setLoading(false);

    router.refresh();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-red-500 text-white hover:bg-red-600   hover:text-white"
        >
          <Trash2
            size={30}
            className="transform cursor-pointer text-slate-100 transition duration-300 hover:scale-110"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure you to delete this news</DialogTitle>
        </DialogHeader>

        <DialogFooter>
          <Button
            className="bg-red-500 text-white hover:bg-red-600   hover:text-white"
            type="submit"
            disabled={loading}
            onClick={deleteNewsById}
          >
            {loading ? <LoadingSpinner /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteNews;
