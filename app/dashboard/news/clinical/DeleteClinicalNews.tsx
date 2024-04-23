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
import { deleteClinicalNewsPost } from "@/lib/db/ClinicalNewsCrud";
import { useRouter } from "next/navigation";

interface DeleteClinicalNewsProps {
  id: number;
}

const DeleteClinicalNews: React.FC<DeleteClinicalNewsProps> = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const deleteBlogById = async () => {
    setLoading(true);

    await deleteClinicalNewsPost(id);

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
            size={25}
            className="transform cursor-pointer text-slate-100 transition duration-300 hover:scale-110"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure you to delete this News</DialogTitle>
        </DialogHeader>

        <DialogFooter>
          <Button
            className="bg-red-500 text-white hover:bg-red-600   hover:text-white"
            type="submit"
            disabled={loading}
            onClick={deleteBlogById}
          >
            {loading ? <LoadingSpinner /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteClinicalNews;
