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
import Link from "next/link";
import { doctor as Doctors } from "@prisma/client";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function DoctorTable({ doctors }: { doctors: Doctors[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.doctor_name
      .toLocaleLowerCase()
      .includes(searchQuery.toLocaleLowerCase())
  );
  return (
    <div className="rounded-lg border p-2 shadow-sm">
      <div className="flex justify-end gap-3 py-3">
        <Input
          type="text"
          placeholder="Search By Doctor Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-2"
        />

        <Link href="/dashboard/doctors/create" target="_blank">
          <Button className="flex items-center justify-between gap-2 bg-green-600 p-2 duration-100 hover:bg-green-700">
            Create Doctor <ExternalLink className="h-5 w-5 opacity-80" />
          </Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead className="min-w-[150px]">Name</TableHead>

            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead className="hidden sm:table-cell">
              Specialization
            </TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Suspense fallback={<div>Loading...</div>}>
            {filteredDoctors.map((doctor) => (
              <TableRow key={doctor.doctor_id}>
                <TableCell className="font-medium">
                  {doctor.doctor_id}
                </TableCell>
                <TableCell>{doctor.doctor_name}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {doctor.email}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {doctor.specialization}
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
                            href={`/dashboard/doctors/edit?id=${doctor.doctor_id}`}
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
                          <Label>Doctor name:</Label>
                          <h2 className="col-span-3 border p-3 ">
                            {doctor.doctor_name}
                          </h2>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label>Department id:</Label>
                          <a
                            href={`/dashboard/departments`}
                            className="text-blue-500 hover:underline"
                          >
                            <h2 className="col-span-3 p-3">
                              {doctor.department_id}
                            </h2>
                          </a>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label>Field:</Label>
                          <h2 className="col-span-3 border p-3 ">
                            {doctor.specialization}
                          </h2>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label>Email:</Label>
                          <h2 className="col-span-3 border p-3 ">
                            {doctor.email}
                          </h2>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label>Mobile no:</Label>
                          <h2 className="col-span-3 border p-3 ">
                            {doctor.phone_number}
                          </h2>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label>Photo:</Label>
                          {doctor.photo_url ? (
                            <Link
                              href={doctor.photo_url}
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
                            {doctor.description}
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
