import { Separator } from "../components/ui/separator"
import { Link, Navigate } from "react-router-dom"
import { useAuth } from "../hooks/use-auth";
import { SigninForm } from "../components/auth/signin-form";

export const SigninPage = () => {

    const { user } = useAuth();

    if (user) return <Navigate to="secret" />

    return (
        <div className="lg:w-[480px] w-full flex justify-center items-center flex-col bg-white px-9">
            <img src="/logo.svg" alt="logo" className="w-48 mb-8" />
            <h1 className="text-black text-xl font-bold mb-11">Login into your account</h1>
            <SigninForm />
            <Separator />

            <Link
                to="/signup"
                className="flex justify-center items-center bg-transparent border border-[#7001FD] text-[#7001FD] font-medium w-full rounded-lg h-12 px-9">
                Signup Now
            </Link>
        </div>
    )
}