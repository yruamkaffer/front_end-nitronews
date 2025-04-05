import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const createUserFormSchema = z.object ({
  name: z.string() .nonempty('O nome é obrigatório')
  .transform(name => {
    return name.trim().split(' ').map(word => {
      return word[0].toLocaleUpperCase().concat(word.substring(1))
    }).join(' ')
  }),
  email: z.string() .nonempty('O e-mal é obrigatório') .email('Formato de e-mail inválido') .toLowerCase(),
  password: z.string() .min(6, 'A senha precisa de no mínimo 6 caracteres'),
  doublecheck: z.string(),
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>

function Form() { const { register, handleSubmit, formState: { errors } } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema)
  })

  function createUser(data: any) {
    console.log(data)
  }

  return (
    <div>
    <main className="h-screen bg-zinc-950 text-zinc-300 flex items-center justify-center">
      <form
      className="flex flex-col gap-4 w-full max-w-xs"
      onSubmit={handleSubmit(createUser)}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name"> Nome completo</label>
           <input type="text" {...register('name')}
           className='border border-zinc-800 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white'/>
           {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email"> E-mail</label>
          <input type="email" {...register('email')}
          className='border border-zinc-800 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white'/>
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor=""> Senha</label>
          <input type="password" {...register('password')}
          className='border border-zinc-800 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white'/>
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password"> Confirmar senha</label> 
          <input type="password" {...register('doublecheck')}
          className='border border-zinc-800 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white'/>                
        </div>    

        <button
        type='submit'
        className='bg-red-500 rounded font-semibold text-white h-10 hover:bg-red-800'
        >Cadastrar</button>
      </form>
    </main>
    </div>   
    )
};

export default Form