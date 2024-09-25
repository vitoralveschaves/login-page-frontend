interface ButtonProps {
    text: string
}

export const Button = ({ text }: ButtonProps) => {
    return (
        <button
            type="submit"
            className="text-white bg-[#7001FD] flex justify-center items-center w-full h-12 px-10 rounded-lg font-semibold hover:bg-[#7001FD]/90">
            {text}
        </button>
    )
}