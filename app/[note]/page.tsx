import NotFoundMsg from '@/components/messages/NotFoundMsg'
import UpdateNote from '@/components/notes/UpdateNote'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

const page = async({params}:{
    params:{note: string}
}) => {

  const note = await prisma.notes.findUnique({
    where:{
        id: params.note
    }
  }) 

  const deleteNote = async() => {
    "use server"
   try{
    await prisma.notes.delete({
      where: {
        id: params.note
      }
    })
    revalidatePath('/')
   }catch(error){
    console.error(error)
   }
  }

  if(!note) return <NotFoundMsg error='Note is deleted!'/>

  return (
    <div className="flex justify-center ">
    <main className="container p-4 bg-card shadow-md rounded-md">
      <section
      className='flex flex-wrap gap-4 justify-between'
      >
      <table className="mt-4 w-fit">
        <caption
        className='text-lg lg:text-2xl mb-4'
        >{note.title}</caption>
        <tbody>
          <tr>
            <td className="font-bold pr-2">Created by:</td>
            <td>{note.userEmail}</td>
          </tr>
          <tr>
            <td className="font-bold pr-2">Created at:</td>
            <td>{note.createdAt.toDateString()}</td>
          </tr>
          <tr>
            <td className="font-bold pr-2">Updated at:</td>
            <td>{note.updatedAt.toDateString()}</td>
          </tr>
          <tr>
            <td className="font-bold pr-2">State:</td>
            <td>{note.state}</td>
          </tr>
          <tr>
            <td className="font-bold pr-2">Type:</td>
            <td>{note.type}</td>
          </tr>
        </tbody>
      </table>

      <p className="grow border border-foreground rounded-lg p-2">{note.desc}</p>
      <div
      className="flex flex-col gap-4"
      >
       <UpdateNote funcName="Edit" note={note}/>
       <UpdateNote funcName="Delete" handleDelete={deleteNote}/>
      </div>
      </section>
    </main>
  </div>
  )
}

export default page
