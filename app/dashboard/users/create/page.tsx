"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDepartmentNames } from "@/lib/db/departmentCrud";
import { department as Department } from "@prisma/client";
import { LoadingSpinner } from "@/components/ui/loading";
import { createUser } from "@/lib/db/userCrud";
import { userFormSchemaWithMatchingPasswords } from "@/lib/formSchemas";
import { useToast } from "@/components/ui/use-toast";

type UserFormSchemaType = z.infer<typeof userFormSchemaWithMatchingPasswords>;

export default function CreateUserPage() {
  const [departmentNames, setDepartmentNames] = useState<
    Pick<Department, "department_id" | "department_name">[]
  >([]);
  const roles = [
    { label: "Department Manager", value: "department_manager" },
    { label: "Appointment Manager", value: "appointment_manager" },
  ];

  const form = useForm<UserFormSchemaType>({
    resolver: zodResolver(userFormSchemaWithMatchingPasswords),
    defaultValues: {
      user_name: "",
      full_name: "",
      password: "",
      confirm: "",
      phone_number: "",
      email: "",
      role: "department_manager",
      department_id: 0,
    },
  });

  const { toast } = useToast();

  async function onSubmit(values: UserFormSchemaType) {
    try {
      const result = await createUser({
        user_name: values.user_name,
        full_name: values.full_name,
        password: values.password,
        phone_number: values.phone_number,
        role: values.role,
        email: values.email,
        department_id: values.department_id,
      });

      if ("message" in result) {
        toast({
          variant: "destructive",
          description: "Uh oh! Something went wrong.",
        });
        return result;
      }

      toast({
        description: "User created successfully ✅",
      });
      form.reset();
      return null;
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Uh oh! Something went wrong.",
      });
      return error;
    }
  }

  useEffect(() => {
    const fetchDepartments = async () => {
      const departmentNames = await getDepartmentNames();
      setDepartmentNames(departmentNames);
    };
    fetchDepartments();
  }, []);

  return (
    <div className="max-w-screen-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* user name */}
          <FormField
            control={form.control}
            name="user_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Username" {...field} />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">full name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Full Name" {...field} />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          {/* email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Email" {...field} />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          {/* phone number */}
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">phone number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Phone Number" {...field} />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          {/* role */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">User Role</FormLabel>
                <FormControl />
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>

                  <SelectContent defaultValue={roles[0].value}>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* departments */}
          <FormField
            control={form.control}
            name="department_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">department</FormLabel>
                <FormControl />
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="w-[210px]">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>

                  <SelectContent>
                    {departmentNames.map((department) => (
                      <SelectItem
                        key={department.department_id}
                        value={`${department.department_id}`}
                      >
                        {department.department_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Password" {...field} />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          {/* confirm password */}
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">confirm password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Password Again" {...field} />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="flex gap-2"
          >
            Submit
            {form.formState.isSubmitting ? <LoadingSpinner /> : null}
          </Button>
        </form>
      </Form>
    </div>
  );
}
