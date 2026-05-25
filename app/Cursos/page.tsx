import Starfield from "@/components/Starfield";
import Link from "next/link";
import { deleteCurso, getCursos } from "./action";
import CursosItem from "@/components/CursosItem";
import { Key } from "react";

export default async function Cursos() {
    const Cursos = await getCursos();

    return (
        <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
            <Starfield />
            <div
                className="relative z-10 flex flex-col items-center w-full max-w-3xl px-8 py-8 rounded-2xl gap-6"
                style={{
                    border: "1.5px solid rgba(99,153,255,0.4)",
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(6px)",
                    boxShadow: "0 0 25px rgba(99,153,255,0.2)",
                }}
            >
                <h1 className="text-white text-xl font-bold">Cursos</h1>

                <ul className="w-full">
                    {Cursos.map((Cursos) => (
                        <CursosItem
                            key={Cursos.id}
                            id={Cursos.id}
                            nome={Cursos.nome}
                            onDelete={deleteCurso}
                        />
                    ))}
                </ul>

                <div className="flex gap-4">
                    <Link
                        href="/Cursos/cadastro"
                        className="px-6 py-2 rounded-xl text-sm font-medium text-white transition-all hover:-translate-y-0.5 active:scale-95"
                        style={{
                            background: "linear-gradient(135deg, #2c5be8, #1e3fa8)",
                            boxShadow: "0 0 15px rgba(44,91,232,0.5)",
                        }}
                    >
                        ➕ Cadastrar Curso
                    </Link>
                    <Link
                        href="/"
                        className="px-6 py-2 rounded-xl text-sm font-medium text-white transition-all hover:-translate-y-0.5 active:scale-95"
                        style={{
                            background: "linear-gradient(135deg, #2c5be8, #1e3fa8)",
                            boxShadow: "0 0 15px rgba(44,91,232,0.5)",
                        }}
                    >
                        ⬅️ Voltar
                    </Link>
                </div>
            </div>
        </div>
    );
}