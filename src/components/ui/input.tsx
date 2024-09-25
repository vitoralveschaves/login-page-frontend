interface InputProps {
    id: string
    name: string
    label: string
    type: string
    placeholder: string
    image: string
}

export const Input = ({ id, name, label, type, placeholder, image }: InputProps) => {
    return (
        <div className="space-y-2">
            <label htmlFor={id}>{label}</label>
            <div className="h-12 w-full rounded-lg flex bg-[#F1F3F6]">
                <input
                    id={id}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    className="bg-transparent flex-1 px-4 outline-none"
                />
                <div className="bg-[#7001FD] h-12 w-12 rounded-lg flex justify-center items-center">
                    <img src={image} alt="message icon" className="w-5" />
                </div>
            </div>
        </div>
    )
}