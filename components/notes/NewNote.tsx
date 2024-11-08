"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import NoteForm from "./NoteForm";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const NewNote = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleEscapeKeyPress = (event: { key: string; }) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKeyPress);
   }

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress);
   };
  }, [isOpen]);

  return (
    <AlertDialog
      open={isOpen}>
      <AlertDialogTrigger asChild>
        <Button 
        onClick={()=> setIsOpen(prev=>!prev)}
        variant="outline">New Note</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <NoteForm setIsOpenDialog={setIsOpen}/>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NewNote;
