"use client";

import Link from "next/link";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteCurso } from "@/app/Cursos/action";

interface Props {
    id: number;
    nome: string;
    onDelete: (id: number) => void;
}

export default function CursosItem({ id, nome, onDelete }: Props) {

    const router = useRouter();

  async function handleDelete() {
    await deleteCurso(id);
    router.refresh(); 
  }
  
    return (
        <div>
            <Link href={`/Curso/${id}`}>
                <li className="border-10 p-7 border-double shadow-xl shadow-indigo-400/40 transition-all duration-300 ease-in-out hover:scale-110 border-b-blue-950">
                    {nome}
                </li>
            </Link>
            <button
                className="text-red-500 transition-all duration-300 ease-in-out hover:scale-110 hover:text-red-900"
                onClick={handleDelete}
            >
                <Trash />
            </button>
        </div>
    );
}