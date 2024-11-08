"use client"

import { signIn } from 'next-auth/react'
import { Button } from '../ui/button'

const OAuthSignIn = () => {
  return (
    <Button
    className='m-1'
    onClick={()=>signIn('google')}
    >google</Button>
  )
}

export default OAuthSignIn