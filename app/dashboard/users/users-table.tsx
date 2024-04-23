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
import { user as User } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function UsersTable({ users }: { users: User[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((user) =>
    user.full_name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
  );
  return (
    <div className="rounded-lg border p-2 shadow-sm">
      <div className="flex justify-end gap-3 py-3">
        <Input
          type="text"
          placeholder="Search By User Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-2"
        />

        <Link href="/dashboard/users/create" target="_blank">
          <Button className="flex items-center justify-between gap-2 bg-green-600 p-2 duration-100 hover:bg-green-700">
            Create User <ExternalLink className="h-5 w-5 opacity-80" />
          </Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead className="min-w-[150px]">Name</TableHead>
            <TableHead className="min-w-[150px]">Mobile no.</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead className="hidden sm:table-cell">Role</TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Suspense fallback={<div>Loading...</div>}>
            {filteredUsers.map((user) => (
              <TableRow key={user.user_id}>
                <TableCell className="font-medium">{user.user_id}</TableCell>
                <TableCell>{user.full_name}</TableCell>
                <TableCell>{user.phone_number}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {user.email}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {user.role}
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
                            href={`/dashboard/doctors/edit?id=${user.user_id}`}
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
                          <Label>username:</Label>
                          <h2 className="col-span-3 border p-3 ">
                            {user.user_name}
                          </h2>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label>Full Name:</Label>
                          <h2 className="col-span-3 border p-3 ">
                            {user.full_name}
                          </h2>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label>PHone Number:</Label>
                          <h2 className="col-span-3 border p-3 ">
                            {user.phone_number}
                          </h2>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label>Email:</Label>
                          <h2 className="col-span-3 border p-3 ">
                            {user.email}
                          </h2>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label>Role:</Label>
                          <h2 className="col-span-3 border p-3 ">
                            {user.role}
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
