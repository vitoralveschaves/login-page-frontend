import { FormEvent } from "react"
import { z } from "zod"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { http } from "../../lib/axios"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

export const SignupForm = () => {

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const formSchema = z.object({
            name: z.string().min(2, "O nome deve possuir no mínimo 2 caracteres"),
            email: z.string().email("O email é um campo obrigatório"),
            password: z.string().min(6, "O password deve possuir no mínimo 6 caracteres"),
            confirmPassword: z.string()
        }).superRefine(({ password, confirmPassword }, ctx) => {
            if (password !== confirmPassword) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "As senhas não condizem",
                    fatal: true
                })
            }
        })

        const validatData = formSchema.safeParse(
            Object.fromEntries(formData.entries())
        );

        if (validatData.error) {
            return validatData.error.errors.map(e => {
                toast.error(e.message)
            })
        }

        try {
            const { name, email, password } = validatData.data;
            await http.post("/auth/register", { name, email, password })
            toast.success("Usuário cadastrado com sucesso!")
            navigate("/")
        } catch (error) {
            console.log(error)
            toast.error("Erro ao cadastrar usuário")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
            <div className="flex flex-col gap-6">
                <Input
                    id="name"
                    name="name"
                    label="Name"
                    type="text"
                    placeholder="John Doe"
                    image="/message.svg"
                />
                <Input
                    id="email"
                    name="email"
                    label="Email Address"
                    type="text"
                    placeholder="john@email.com"
                    image="/message.svg"
                />
                <Input
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    image="/lock.svg"
                />
                <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm your password"
                    image="/lock.svg"
                />
            </div>
            <Button text="Sign Up" />
        </form>
    )
}