import { z } from "zod";
import {
  isEmailAvailable,
  isEmailAvailableInDoctorDb,
  isUsernameAvailable,
} from "./validations";

/* Department Schema */
export const departmentFormSchema = z.object({
  department_name: z
    .string()
    .trim()
    .min(5, { message: "Department name must be at least 5 characters" }),
  image_url: z.string().trim().url(),
  description: z
    .string()
    .trim()
    .min(5, { message: "Description must be at least 5 characters" }),
});

/* Ward Schema */
export const wardFormSchema = z.object({
  ward_name: z
    .string()
    .trim()
    .min(5, { message: "Ward name must be at least 5 characters" }),
  image_url: z.string().trim().url(),
  description: z
    .string()
    .trim()
    .min(5, { message: "Description must be at least 5 characters" }),
});

/* Doctor Schema */
const phoneNumberRegex = /^[0-9]+$/;
export const doctorFormSchema = z.object({
  doctor_name: z
    .string()
    .trim()
    .min(3, { message: "Doctor name must be at least 3 characters" }),
  email: z
    .string()
    .trim()
    .email()
    .refine(isEmailAvailableInDoctorDb, { message: "Email already exists" }),
  phone_number: z
    .string()
    .trim()
    .min(5)
    .refine((value) => phoneNumberRegex.test(value), {
      message: "Invalid phone number",
    }),
  specialization: z
    .string()
    .trim()
    .min(1, { message: "Specialization is required" }),
  photo_url: z.string().trim().url(),
  description: z
    .string()
    .trim()
    .min(5, { message: "Description must be at least 5 characters" }),
});

/* User Schema */
export const userFormSchema = z.object({
  user_name: z
    .string()
    .trim()
    .min(5, { message: "Username must be at least 5 characters" })
    .refine(isUsernameAvailable, { message: "Username already exists" }),
  full_name: z
    .string()
    .trim()
    .min(6, { message: "Full name must be at least 6 characters" }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters" }),
  confirm: z.string().trim().optional(),
  phone_number: z
    .string()
    .trim()
    .min(5)
    .refine((value) => phoneNumberRegex.test(value), {
      message: "Invalid phone number",
    }),
  email: z
    .string()
    .trim()
    .email()
    .refine(isEmailAvailable, { message: "Email already exists" }),
  role: z.enum(["department_manager", "appointment_manager"]),
  department_id: z
    .number()
    .gt(0, { message: "Select Department" })
    .or(z.string())
    .pipe(z.coerce.number()),
});

export const userFormSchemaWithMatchingPasswords = userFormSchema.refine(
  (data) => data.password === data.confirm,
  {
    message: "Passwords do not match",
    path: ["confirm"],
  }
);

export const userFormSchemaWithoutConfirm = userFormSchema.omit({
  confirm: true,
});

/* Appointment Schema */

export const appointmentFormSchema = z.object({
  full_name: z
    .string()
    .min(6, { message: "Full name must be at least 5 characters" }),
  phone_number: z
    .string()
    .min(6, { message: "Phone number must be at least 6 characters" })
    .refine((value) => phoneNumberRegex.test(value), {
      message: "Invalid phone number",
    }),
  appointment_reason: z
    .string()
    .min(10, { message: "Appointment reason must be at least 10 characters" }),
});

/* Feedback Schema */

export const feedbackFormSchema = z.object({
  full_name: z
    .string()
    .min(5, { message: "Full name must be at least 5 characters" }),
  email: z.string().email(),
  comment: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
  phone_number: z
    .string()
    .min(6, { message: "Phone number must be at least 6 characters" })
    .refine((value) => phoneNumberRegex.test(value), {
      message: "Invalid phone number",
    }),
});
