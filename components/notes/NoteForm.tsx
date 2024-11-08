'use client'

import { Dispatch, SetStateAction, useTransition } from "react";
import { createNote, updateNote } from "./NoteAction"
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { Notes } from "@prisma/client";

type NoteFormProps = {
  setIsOpenDialog?: Dispatch<SetStateAction<boolean>>
  noteData?: Notes
}

const NoteForm = ({setIsOpenDialog, noteData}: NoteFormProps) => {
  const [isPending, startTransition] = useTransition()
  const onSubmit = (formData: { get: (arg0: string) => any; }) => {
    
    try {      
      if(noteData?.id){
        startTransition(()=> updateNote(formData))
        if(setIsOpenDialog){
          setIsOpenDialog(prev=>!prev)
        }
      }
      else{
        startTransition(()=> createNote(formData))
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section
    className="w-full"
    >
      {
        setIsOpenDialog &&
      <div
      className="flex justify-between items-center"
      >
        <h2>Note</h2>
        <Button
      className="mb-2 "
      onClick={()=>setIsOpenDialog(prev=>!prev)}
      >X</Button>
      </div>
      }
      <form action={onSubmit} className="space-y-8">
        <Input
        name="id"
        className="hidden"
        value={noteData?.id}
        
        />
        <Input
        defaultValue={noteData?.title}
        name="title" placeholder="Note title" type="text" />
        <Select name="noteType" defaultValue={noteData?.type ?? 'STANDARD'}>
          <SelectTrigger className="w-[240px]">
          <Label>Note type</Label>
            <SelectValue
            
            placeholder="STANDARD" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="STANDARD">Standard</SelectItem>
              <SelectItem value="PRIORITY">Priority</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select name="noteState" defaultValue={noteData?.state ?? "ON_STANDBY"}>
          <SelectTrigger className="w-[240px]">
            <Label>Note status</Label>
            <SelectValue placeholder="ON_STANDBY"  />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>            
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="ON_STANDBY">On Standby</SelectItem>
              <SelectItem value="CANCELED">Canceled</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Textarea
        defaultValue={noteData?.desc}
        name="desc" rows={8} placeholder="Your note..." />
        <Button
        disabled={isPending}
        type="submit">Save</Button>
      </form>
    </section>
  );
};

export default NoteForm;
