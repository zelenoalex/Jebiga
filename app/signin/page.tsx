'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { signIn } from 'next-auth/react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Input from './Input'
import OAuthSignIn from '@/components/auth-button/SignIn'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import H1 from '@/components/ui/h1'

interface LoginData {
  email: string
  password: string
}

const schema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email is required'),
  password: z.string().nonempty('Password is required'),
})

const SignIn = () => {
  const { data: session } = useSession()
  const [err, setErr] = useState(false)
  const router = useRouter()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginData>({ resolver: zodResolver(schema) })

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    try {
      const response = await signIn('credentials', {
        ...data,
        redirect: false,
      })
      if (response?.error) {
        setErr(true);
      } else {
        setErr(false)
      }
    } catch (error) {
      setErr(true)
      console.log(error)
    }
  }

  if (session) router.push('/')

  return (
    <main className="text-center">
    <H1 title='Wellcome Back!' />
      <div className="p-5 shadow max-w-lg mx-auto m-1 bg-card">
        <form onSubmit={handleSubmit(onSubmit)}>
          {
            err ? <p className='text-destructive-foreground bg-destructive mb-4 p-2'>Bad Credentials</p> : null
          }
          <div className="mb-4">
            <Controller
              render={({ field }) => (
                <Input
                  type="text"
                  id="email"
                  placeholder="Email"
                  {...field}
                  error={errors.email?.message}
                />
              )}
              name="email"
              control={control}
              defaultValue=""
            />
          </div>

          <div className="mb-4">
            <Controller
              render={({ field }) => (
                <Input
                  type="password"
                  id="password"
                  placeholder="Password"
                  {...field}
                  error={errors.password?.message}
                />
              )}
              name="password"
              control={control}
              defaultValue=""
            />
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
            >
              Login
            </Button>
          </div>

          <div className="mt-8">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="text-secondary-foreground underline mx-2"
            >
              Register
            </Link>
          </div>
        </form>
        <div>
        <h2 className="my-4">or continue with</h2>
          <OAuthSignIn />
        </div>
      </div>
    </main>
  )
}

export default SignIn