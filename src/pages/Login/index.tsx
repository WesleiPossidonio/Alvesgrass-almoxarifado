import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useUser } from '@/hooks/useUser'

const confirmOrderLoginValidationSchema = z.object({
  email: z.string().email('Informe o seu email'),
  password: z.string().min(6, 'Informe a Senha'),
})

export type OrderLoginData = z.infer<typeof confirmOrderLoginValidationSchema>

type ConfirmOrderFormLoginData = OrderLoginData
export const Login = () => {

    const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ConfirmOrderFormLoginData>({
    resolver: zodResolver(confirmOrderLoginValidationSchema),
  })

  const { handleLoginUser } = useUser()

    const handleLogin = (data: ConfirmOrderFormLoginData) => {
    const { email, password } = data

    const dataLogin = {
      email,
      password,
      typeSessions: 'user'
    }
    handleLoginUser(dataLogin)
    reset()
  }

  return (
    <form className='w-full h-svh flex flex-col items-start justify-center gap-4 p-5' onSubmit={handleSubmit(handleLogin)}>
      <h1 className='self-center text-xl font-semibold'>Login</h1>
      <Input className='py-5 shadow' placeholder="Email" {...register('email')}/>
      {errors.email && (
        <p className="text-red-500 text-xs">{errors.email.message}</p>
      )}
      <Input className='py-5 shadow' placeholder="Senha" type="password" {...register('password')}/>
      {errors.password && (
        <p className="text-red-500 text-xs">{errors.password.message}</p>
      )}
      <Button className='bg-base-blue'>Entrar</Button>
    </form>
  )
}


