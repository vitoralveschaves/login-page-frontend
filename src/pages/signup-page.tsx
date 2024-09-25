import { Link } from "react-router-dom"
import { Separator } from "../components/ui/separator"
import { SignupForm } from "../components/auth/signup-form"

export const SignupPage = () => {
    return (
        <div className="lg:w-[480px] w-full flex justify-center items-center flex-col bg-white px-9">
            <img src="/logo.svg" alt="logo" className="w-48 mb-8" />
            <h1 className="text-black text-xl font-bold mb-11">Sign in and start today!</h1>

            <SignupForm />
            <Separator />
            <Link
                to="/"
                className="flex justify-center items-center bg-transparent border border-[#7001FD] text-[#7001FD] font-medium w-full rounded-lg h-12 px-9">
                Login Now
            </Link>
        </div>
    )
}