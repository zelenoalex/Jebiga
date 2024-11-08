'use client'
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"


type NotFoundProps = {
    error: string
}

const NotFoundMsg = ({error}:NotFoundProps) => {
  const router = useRouter()
  return (
    <section
    className="container flex-col gap-4 text-lg lg:text-2xl justify-center items-center flex bg-card p-4 shadow"
    >
        <h2>{error}</h2>
        <Button
        onClick={()=> router.back()}
        >Go back</Button>
    </section>
  )
}

export default NotFoundMsg