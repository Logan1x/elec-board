"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IConnectionRecord } from "./columns";
import { LoaderCircle } from "lucide-react";
import { axUpdateConnection } from "@/services/connection";
import { useState } from "react";

const formSchema = z.object({
  ID: z.number(),
  Applicant_Name: z.string(),
  Gender: z
    .enum(["Male", "Female", "Other"])
    .refine((value) => ["Male", "Female", "Other"].includes(value), {
      message: "Gender must be either 'Male', 'Female' or 'Other'",
    }),
  District: z.string(),
  State: z.string(),
  Pincode: z.number().min(100000, "Pincode should be greater than 5 digits"),
  Ownership: z.string(),
  GovtID_Type: z.string(),
  ID_Number: z.number(),
  Category: z.string(),
  Load_Applied: z.coerce
    .number()
    .min(0, "Load_Applied should be between 0 to 100")
    .max(200, "Load_Applied should be between 0 to 200"),
  Date_of_Application: z.coerce.date(),
  Date_of_Approval: z.any(),
  Modified_Date: z.coerce.date(),
  Status: z
    .enum(["Pending", "Approved", "Rejected", "Connection Released"])
    .refine(
      (value) =>
        ["Pending", "Approved", "Rejected", "Connection Released"].includes(
          value.trim()
        ),
      {
        message:
          "Status must be either 'Pending', 'Approved', 'Rejected' or 'Connection Released'",
      }
    ),
  Reviewer_ID: z.number(),
  Reviewer_Name: z.string(),
  Reviewer_Comments: z.string(),
});

export function EditForm({
  record,
  closeModal,
  setRefetchRecords,
}: {
  record: IConnectionRecord;
  closeModal: () => void;
  setRefetchRecords: (value: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...record,
      Load_Applied: Number(record.Load_Applied),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const res = await axUpdateConnection(record.ID, values);
      setRefetchRecords(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
      closeModal();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-8 w-full md:w:4/5 py-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="ID"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Applicant_Name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Applicant Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="District"
            render={({ field }) => (
              <FormItem>
                <FormLabel>District</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="State"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Pincode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pincode</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Ownership"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ownership</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="GovtID_Type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GovtID Type</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ID_Number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID Number</FormLabel>
                <FormControl>
                  <Input {...field} type="number" disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Load_Applied"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Load Applied (in KV)</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Date_of_Application"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Application</FormLabel>
                <FormControl>
                  <Input {...field} type="date" disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Date_of_Approval"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Approval</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Modified_Date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modified Date</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Reviewer_ID"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reviewer ID</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Reviewer_Name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reviewer Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Reviewer_Comments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reviewer Comments</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4 items-center mt-8 ">
          {isLoading ? (
            <Button type="submit" className="" disabled>
              <LoaderCircle className="h-4 w-4 animate-spin mx-1" />
              <span>Updating...</span>
            </Button>
          ) : (
            <Button type="submit" className="">
              Update Record
            </Button>
          )}

          <Button variant={"outline"} onClick={closeModal}>
            Close
          </Button>
        </div>
      </form>
    </Form>
  );
}
