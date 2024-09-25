import { z } from "zod";
import { toast } from "sonner";
import { FormEvent } from "react";
import { useAuth } from "../../hooks/use-auth";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const SigninForm = () => {

    const ctx = useAuth();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const formSchema = z.object({
            email: z.string().email("O email é um campo obrigatório"),
            password: z.string().min(6, "O password é um campo obrigatório")
        })

        const data = formSchema.safeParse(
            Object.fromEntries(formData.entries())
        );

        if (data.error) {
            return data.error.errors.map(e => {
                toast.error(e.message)
            })
        }

        await ctx.login(data.data);
    }

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
            <div className="flex flex-col gap-6">
                <Input
                    id="email"
                    name="email"
                    label="Email Address"
                    type="text"
                    placeholder="alex@email.com"
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
                <a href="" className="text-sm text-right text-[#1e2672] underline">Forgot Password?</a>
            </div>
            <Button text="Login Now" />
        </form>
    )
}