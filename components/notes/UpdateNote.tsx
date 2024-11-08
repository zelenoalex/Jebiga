"use client";

import { Button } from "../ui/button";
import { useEffect, useState, useTransition } from "react";
import NoteForm from "./NoteForm";
import { Notes } from "@prisma/client";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { AlertDialogContent, AlertDialogTrigger } from "../ui/alert-dialog";

type EditNoteType = {
  funcName: string;
  handleDelete?: () => void;
  note?: Notes;
};

const UpdateNote = ({ funcName, handleDelete, note }: EditNoteType) => {
  const [isPending, startTransition] = useTransition();
  const [editingOn, setEditingOn] = useState(false);

  useEffect(() => {
    const handleEscapeKeyPress = (event: { key: string; }) => {
      if (event.key === "Escape") {
        setEditingOn(false);
      }
    };

    if (editingOn) {
      document.addEventListener("keydown", handleEscapeKeyPress);
   }

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress);
   };
  }, [editingOn]);

  return (
    <>
      {funcName === "Edit" && (
        <AlertDialog open={editingOn}>
          <AlertDialogTrigger asChild>
            <Button
            onClick={()=>setEditingOn(prev =>!prev)}
            variant="outline">{funcName}</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <NoteForm noteData={note} setIsOpenDialog={setEditingOn} />
          </AlertDialogContent>
        </AlertDialog>
      )}
      {funcName === "Delete" && handleDelete && (
        <Button
          disabled={isPending}
          onClick={() => startTransition(() => handleDelete())}
        >
          {funcName}
        </Button>
      )}
    </>
  );
};

export default UpdateNote;
