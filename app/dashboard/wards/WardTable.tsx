"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { ward as Ward } from "@prisma/client";
import {
  ExternalLink,
  Info,
  MoreHorizontal,
  PencilLine,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { Suspense, useState } from "react";
export default function WardTable({ wards }: { wards: Ward[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWards = wards.filter((ward) =>
    ward.ward_name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
  );
  return (
    <div className="rounded-lg border p-2 shadow-sm">
      <div className="flex justify-end gap-4 py-3">
        <Input
          type="text"
          placeholder="Search By Ward Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-2"
        />
        <Link href="/dashboard/wards/create" target="_blank">
          <Button className="flex items-center justify-between gap-2 bg-green-600 p-2 duration-100 hover:bg-green-700">
            Create New Ward <ExternalLink className="h-5 w-5 opacity-80" />
          </Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead className="min-w-[150px]">Name</TableHead>

            <TableHead className="hidden sm:table-cell">Description</TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Suspense fallback={<div>Loading...</div>}>
            {filteredWards.map((ward) => (
              <TableRow key={ward.ward_id}>
                <TableCell className="font-medium">{ward.ward_id}</TableCell>
                <TableCell>{ward.ward_name}</TableCell>

                <TableCell className="hidden max-w-40 sm:table-cell">
                  <p className="truncate text-ellipsis">{ward.description}</p>
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
                        <DropdownMenuItem>
                          <Link
                            href={`/dashboard/doctors/edit?id=${ward.ward_id}`}
                            className="flex w-full cursor-pointer items-center gap-2"
                          >
                            <PencilLine className="h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex cursor-pointer items-center gap-2 hover:bg-red-200">
                          <Trash2 className="h-4 w-4 text-red-600" />
                          Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex cursor-pointer items-center gap-2 ">
                          <DialogTrigger asChild>
                            <button className="flex w-full cursor-pointer items-center gap-2 ">
                              <Info className="h-4 w-4 text-emerald-600" />
                              Detail
                            </button>
                          </DialogTrigger>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Details</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label>ward name:</Label>
                          <h2 className="col-span-3 border p-3 ">
                            {ward.ward_name}
                          </h2>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label>Photo:</Label>
                          {ward.image_url ? (
                            <Link
                              href={ward.image_url}
                              target="_blank"
                              className="flex w-full cursor-pointer items-center gap-2"
                            >
                              <h2 className="col-span-3 border p-3">View</h2>
                            </Link>
                          ) : (
                            <h1>No image</h1>
                          )}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label>Description:</Label>
                          <h2 className="col-span-3 border p-3 ">
                            {ward.description}
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
