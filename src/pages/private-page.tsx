import { useAuth } from "../hooks/use-auth";


export const PrivatePage = () => {

    const { user, logout } = useAuth();

    return (
        <div className="lg:w-[480px] w-full flex justify-center items-center flex-col bg-white px-9">
            <img src="/logo.svg" alt="logo" className="w-48 mb-8" />
            <h1 className="text-black text-xl font-bold mb-11">Bem-vindo, {user}</h1>
            <button onClick={logout} className="px-6 py-2 bg-red-600 rounded-lg text-white">Logout</button>
        </div>
    )
}