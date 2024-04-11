"use client";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { EditForm } from "./form";
import { IConnectionRecord } from "./columns";

type Props = {
  record: IConnectionRecord;
};

export default function EditRecord({ record }: Props) {
  return (
    record && (
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Edit Record</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <EditForm record={record} />
      </DialogContent>
    )
  );
}
