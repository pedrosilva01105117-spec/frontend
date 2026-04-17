"use client";

import { useRouter } from "next/navigation";
import { useState } from "react"

interface Props {
    onSend: (email: string, password: string) => Promise<void | string>;
}

export default function LoginForm({onSend}: Props) {
    const router = useRouter();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSumit() {
        const response = await onSend(email, password)

        if(response) {
            alert(response);
            return;
        }

        router.push("/")
    }


    return (
        <div className="flex flex-col p-7  h-50 flex-1 items-center justify-center gap-3 ">
                <input className="border-2  rounded px-3 py-0.5 shadow-xl shadow-indigo-200/25"
                 type="email" 
                 placeholder="Email"
                 value={email} 
                 onChange={(e) => setEmail(e.target.value)}/>

                <input className="border-2 rounded px-3 py-0.5 shadow-xl shadow-indigo-200/25" 
                 type="password" 
                 placeholder="Senha" 
                 value={password} 
                 onChange={(e) => setPassword(e.target.value)}/>

                <button 
                className="bg-blue-950 cursor-pointer hover:opacity-80 px-3 transition-all duration-300 ease-in-out hover:scale-110 shadow-xl shadow-indigo-500/40 rounded-2xl py-2 hover:bg-indigo-500"
                onClick={handleSumit}
                >
                Entrar
                </button>
            </div> 
            
    )
}