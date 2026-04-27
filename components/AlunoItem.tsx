"use client";

import Link from "next/link";
import { Trash } from "lucide-react"    
import { deleteAluno } from "@/app/alunos/action";

interface Props {
    id: number;
    nome: string;
}

export default function AlunoItem({ id, nome }: Props){
    return(
        <div>
        <Link href={`/aluno/${id}`}>
      <li className="border-10 p-7 border-double shadow-xl shadow-indigo-400/40 transition-all duration-300 ease-in-out hover:scale-110 border-b-blue-950">{nome}</li>
       </Link>
       <button className="text-red-500 transition-all duration-300 ease-in-out hover:scale-110 hover:text-red-900"
        onClick={() => deleteAluno(id)}><Trash/></button>
       </div>
    )
}