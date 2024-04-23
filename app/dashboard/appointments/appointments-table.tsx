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
import { appointment as Appointment } from "@prisma/client";
import { deleteAppointment } from "@/lib/db/appointmentCrud";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
export default function AppointmentsTable({
  appointments,
}: {
  appointments: Appointment[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredAppointments = appointments.filter((appointment) =>
    appointment.full_name
      .toLocaleLowerCase()
      .includes(searchQuery.toLocaleLowerCase())
  );

  const router = useRouter();

  const handleDelete = async (appointmentId: number) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (confirmation) {
      await deleteAppointment(appointmentId);
      router.refresh();
    }
  };

  return (
    <div className="rounded-lg border p-2 shadow-sm">
      <div className="flex justify-end gap-3 py-3">
        <Input
          type="text"
          placeholder="Search By Appointment Name"
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
            <TableHead className="hidden md:table-cell">Reason</TableHead>
            <TableHead className="hidden md:table-cell ">
              Appointment date
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Suspense fallback={<div>Loading...</div>}>
            {filteredAppointments.map((appointment) => (
              <TableRow key={appointment.appointment_id}>
                <TableCell className="font-medium">
                  {appointment.appointment_id}
                </TableCell>
                <TableCell>{appointment.full_name}</TableCell>
                <TableCell className="hidden max-w-40 sm:table-cell">
                  <p className="truncate text-ellipsis">
                    {appointment.appointment_reason}
                  </p>
                </TableCell>

                <TableCell>
                  {appointment.created_at.toLocaleDateString()}
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
                        <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
                          <DialogTrigger asChild>
                            <button className="flex w-full cursor-pointer items-center gap-2">
                              <Info className="h-4 w-4 text-emerald-600" />
                              Detail
                            </button>
                          </DialogTrigger>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex cursor-pointer items-center gap-2 hover:bg-red-200"
                          onClick={() =>
                            handleDelete(appointment.appointment_id)
                          }
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
                          <Label>Appointment Date:</Label>
                          <h2 className="col-span-3 border p-3 ">
                            {appointment.created_at.toLocaleDateString()}
                          </h2>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label>Booker:</Label>
                          <h2 className="col-span-3 border p-3 ">
                            {appointment.full_name}
                          </h2>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label>Mobile no:</Label>
                          <h2 className="col-span-3 border p-3 ">
                            {appointment.phone_number}
                          </h2>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label>Reason:</Label>
                          <h2 className="col-span-3 border p-3 ">
                            {appointment.appointment_reason}
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
