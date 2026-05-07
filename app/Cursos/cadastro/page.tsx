"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createCursos } from "./action";
import Starfield from "@/components/Starfield";

export default function CursosCadastroPage() {
    const router = useRouter();
    const [nome, setNome] = useState("");
    const [professor, setProfessor] = useState("");
    const [descricao, setDescricao] = useState("");
    const [cargaHoraria, setCargaHoraria] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await createCursos({
            nome,
            professor,
            descricao,
            cargaHoraria: Number(cargaHoraria),
        });

        if (!response) {
            setNome("");
            setProfessor("");
            setDescricao("");
            setCargaHoraria("");
            router.push("/Cursos");
            return;
        }

        alert(response);
    }

    return (
        <div className="flex flex-col gap-4 relative z-10">
            <Starfield />
            <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
                <input
                    className="border-2 rounded px-3 py-1 bg-white/10 text-white"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    className="border-2 rounded px-3 py-1 bg-white/10 text-white"
                    placeholder="Professor"
                    value={professor}
                    onChange={(e) => setProfessor(e.target.value)}
                />
                <input
                    className="border-2 rounded px-3 py-1 bg-white/10 text-white"
                    placeholder="Carga Horária (horas)"
                    type="number"
                    value={cargaHoraria}
                    onChange={(e) => setCargaHoraria(e.target.value)}
                />
                <input
                    className="border-2 rounded px-3 py-1 bg-white/10 text-white"
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-xl py-2 hover:scale-110 transition"
                >
                    Cadastrar
                </button>
                <button type="button" onClick={() => router.back()}>
                    Voltar
                </button>
            </form>
        </div>
    );
}