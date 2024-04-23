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
import {
  ExternalLink,
  Info,
  MoreHorizontal,
  PencilLine,
  Trash2,
} from "lucide-react";
import { department as Department } from "@prisma/client";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function DepartmentsTable({
  departments,
}: {
  departments: Department[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredDepartments = departments.filter((department) =>
    department.department_name
      .toLocaleLowerCase()
      .includes(searchQuery.toLocaleLowerCase())
  );
  return (
    <div className="rounded-lg border p-2 shadow-sm">
      <div className="flex justify-end gap-3 py-3">
        <Input
          type="text"
          placeholder="Search By Department Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-2"
        />

        <Link href="/dashboard/departments/create" target="_blank">
          <Button className="flex items-center justify-between gap-2 bg-green-600 p-2 duration-100 hover:bg-green-700">
            Create Department <ExternalLink className="h-5 w-5 opacity-80" />
          </Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24">ID</TableHead>
            <TableHead className="min-w-28">Name</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Suspense fallback={<div>Loading...</div>}>
            {filteredDepartments.map((department) => (
              <TableRow key={department.department_id}>
                <TableCell className="font-medium">
                  {department.department_id}
                </TableCell>
                <TableCell>{department.department_name}</TableCell>
                <TableCell className="hidden max-w-40 sm:table-cell">
                  <p className="truncate text-ellipsis">
                    {department.description}
                  </p>
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
                        <DropdownMenuItem>
                          <Link
                            href={`/dashboard/doctors/edit?id=${department.department_id}`}
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
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent className="sm:max-w-[700px]">
                      <DialogHeader>
                        <DialogTitle>Details</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label>Department name:</Label>
                          <h2 className="col-span-3 border p-3 ">
                            {department.department_name}
                          </h2>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label>Description:</Label>
                          <h2 className="col-span-3 border p-3 ">
                            {department.description}
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
