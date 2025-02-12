import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { signIn } from '@/api/sign-in';

const signInForm = z.object({
  email: z.string().email(),
  password: z.string(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
    defaultValues: {
      email: searchParams.get('email') ?? ''
    }
  });

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: SignInForm) {
    try {
      const response = await authenticate({ email: data.email, password: data.password })
      localStorage.setItem("auth-food-control", JSON.stringify(response.IdToken))
      navigate("/")
      toast.success("Bem-vindo ao painel.")
    } catch {
      toast.error('Erro ao tentar acesso.')
    }
  }

  return (
    <div className="p-8">
      {/* <Button variant="ghost" asChild className='absolute right-8 top-8'>
        <Link to="/sign-up">
          Novo estabelecimento
        </Link>
      </Button> */}

      <div className="w-[350px] flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Acessar painel</h1>
          <p className="text-sm text-muted-foreground">Acompanhe suas vendas pelo painel do parceiro!</p>
        </div>

      <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Seu e-mail</Label>
          <Input id="email" type="email" {...register("email")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Sua senha</Label>
          <Input id="password" type="password" {...register("password")} />
        </div>

        <Button disabled={isSubmitting} className="w-full" type="submit">
          Acessar painel
        </Button>
      </form>
      </div>
    </div>
  )
}
