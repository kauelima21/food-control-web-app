import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { registerManager } from '@/api/register-manager';

const signUpForm = z.object({
  password: z.string(),
  passwordConfirm: z.string(),
  email: z.string().email(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm)
  });

  const { mutateAsync: registerManagerFn } = useMutation({
    mutationFn: registerManager,
  })

  async function handleSignUp(data: SignUpForm) {
    try {
      if (data.password !== data.passwordConfirm) {
        throw "Senhas não conferem"
      }

      await registerManagerFn({
        email: data.email,
        password: data.password,
        role: "admin"
      })

      toast.success("Administrador cadastrado com sucesso!", {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        }
      })
    } catch(err) {
      if (err) {
        toast.error('Erro ao cadastrar usuário.' + err)
      } else {
        toast.error('Erro ao cadastrar usuário, verifique o formulário e tente novamente.')
      }
    }
  }

  return (
    <div className="p-8">
      <Button variant="ghost" asChild className='absolute right-8 top-8'>
        <Link to="/sign-in">
          Fazer login
        </Link>
      </Button>

      <div className="w-[350px] flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Criar conta grátis
          </h1>
          <p className="text-sm text-muted-foreground">
            Seja um parceiro e comece suas vendas!
          </p>
        </div>

      <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Seu e-mail</Label>
          <Input id="email" type="email" {...register("email")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Crie sua senha</Label>
          <Input id="password" type="password" {...register("password")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="passwordConfirm">Repita a senha</Label>
          <Input id="passwordConfirm" type="password" {...register("passwordConfirm")} />
        </div>

        <Button disabled={isSubmitting} className="w-full" type="submit">
          Finalizar cadastro
        </Button>

        <p className='px-6 text-center text-sm leading-relaxed text-muted-foreground'>
          Ao continuar, você concorda com nossos Termos de{' '}
          <a className='underline underline-offset-4' href="">serviço</a> e{' '}
          <a className='underline underline-offset-4' href="">políticas de privacidade</a>.
        </p>
      </form>
      </div>
    </div>
  )
}
