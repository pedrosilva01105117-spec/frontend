"use client"

import { PenBox } from "lucide-react";
import { Curso } from "@/interfaces/cursos";
import { getCurso } from "./action";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Starfield from "@/components/Starfield";
import Link from "next/link";

export default function AlunoPage() {
    const { id } = useParams();
    const [Curso, setCurso] = useState({} as Curso);

    useEffect(() => {
            getCurso(Number(id)).then((response) => setCurso(response));
        }, [id]);

        return (
    <div className="flex flex-col gap-4 relative z-10">
            <Starfield />
        {Curso.nome && (
         <div>
         <span className="text-xs font-semibold uppercase tracking-widest text-white/40">Nome</span>
          <p className="mt-1 text-2xl font-bold tracking-tight text-white">{Curso.nome}</p>
           </div>
        )}
            <Link href={`/Curso/${id}/editar`}>
            <PenBox />
            </Link>
            {Curso.professor && (
            <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/40">Idade</span>
                <p className="mt-1 text-xl font-semibold text-white">{Curso.professor}</p>
            </div>
            )}
                {Curso.cargaHoraria && (
            <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/40">CPF</span>
                <p className="mt-1 font-mono text-lg tracking-wider text-white/90">{Curso.cargaHoraria}</p>
            </div>
            )}
                {Curso.descricao && (
            <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/40">E-mail</span>
                    <p className="mt-1 text-base text-white/80 break-all">{Curso.descricao}</p>
            </div>
            )}
                    </div>
        );

}