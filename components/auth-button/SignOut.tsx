"use client"

import { signOut } from 'next-auth/react'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'

const SignOut = () => {
  return (
    <Button
    variant={'ghost'}
    onClick={()=>signOut()}
    className='p-0 px-1 w-full inline-flex justify-start'
    >
      <LogOut className="mr-2 h-4 w-4" />
      Sign Out</Button>
  )
}

export default SignOut