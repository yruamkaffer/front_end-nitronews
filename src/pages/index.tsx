import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Button, Card, CardHeader, CardBody, Modal } from "@heroui/react";

// Esquema de validação com Zod
const schema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export default function UserRegistration() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log("Usuário cadastrado:", data);
    alert("Cadastro realizado com sucesso!");
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 flex-col">
      <h1 className="text-2xl font-semibold mb-4">Bem-vindo ao Sistema de Cadastro</h1>
      <Button onClick={() => setIsOpen(true)} className="px-6 py-2 text-lg">Cadastrar Usuário</Button>
      
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Card className="w-96 shadow-lg">
          <CardHeader>
            <h2 className="text-xl font-semibold text-center">Cadastro de Usuário</h2>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input label="Nome" {...register("name")} />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>
              <div>
                <Input label="E-mail" type="email" {...register("email")} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              <div>
                <Input label="Senha" type="password" {...register("password")} />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full">Cadastrar</Button>
            </form>
          </CardBody>
        </Card>
      </Modal>
    </div>
  );
}
