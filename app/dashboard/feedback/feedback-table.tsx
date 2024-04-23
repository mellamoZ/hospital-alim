"use client";
import { useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Info, MoreHorizontal, Trash2 } from "lucide-react";
import { feedback as Feedback } from "@prisma/client";
import { useRouter } from "next/navigation";
import { deleteFeedback } from "@/lib/db/feedbackCrud";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
export default function FeedbackTable({
  feedbacks,
}: {
  feedbacks: Feedback[];
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFeedbacks = feedbacks.filter((feedback) =>
    feedback.full_name
      .toLocaleLowerCase()
      .includes(searchQuery.toLocaleLowerCase())
  );

  const router = useRouter();

  const handleDelete = async (feedbackId: number) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this feedback?"
    );

    if (confirmation) {
      await deleteFeedback(feedbackId);
      router.refresh();
    }
  };

  return (
    <div className="rounded-lg border p-2 shadow-sm">
      <div className="flex justify-end gap-3 py-3">
        <Input
          type="text"
          placeholder="Search By Feedback Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-2"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24">ID</TableHead>
            <TableHead className="min-w-28">Name</TableHead>
            <TableHead className="min-w-28">Phone</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead className="hidden md:table-cell">Comment</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Suspense fallback={<div>Loading...</div>}>
            {filteredFeedbacks.map((feedback) => (
              <TableRow key={feedback.feedback_id}>
                <TableCell className="font-medium">
                  {feedback.feedback_id}
                </TableCell>
                <TableCell>{feedback.full_name}</TableCell>
                <TableCell>{feedback.phone_number}</TableCell>
                <TableCell>{feedback.email}</TableCell>
                <TableCell className="hidden max-w-40 sm:table-cell">
                  <p className="truncate text-ellipsis">{feedback.comment}</p>
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex cursor-pointer items-center gap-2 ">
                          <DialogTrigger asChild>
                            <button className="flex w-full cursor-pointer items-center gap-2 ">
                              <Info className="h-4 w-4 text-emerald-600" />
                              Detail
                            </button>
                          </DialogTrigger>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex cursor-pointer items-center gap-2 hover:bg-red-200"
                          onClick={() => handleDelete(feedback.feedback_id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <DialogContent className="sm:max-w-[700px]">
                      <DialogHeader>
                        <DialogTitle>Details</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label>Name:</Label>
                          <h2 className="col-span-3 border p-3 ">
                            {feedback.full_name}
                          </h2>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label>Phone Number:</Label>
                          <h2 className="col-span-3 border p-3 ">
                            {feedback.phone_number}
                          </h2>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label>Email:</Label>
                          <h2 className="col-span-3 border p-3 ">
                            {feedback.email}
                          </h2>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label>Feedback Comment:</Label>
                          <h2 className="col-span-3 border p-3 ">
                            {feedback.comment}
                          </h2>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </Suspense>
        </TableBody>
      </Table>
    </div>
  );
}
