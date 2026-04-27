import AlunoItem from "@/components/AlunoItem";
import Starfield from "@/components/Starfield";
import { getAlunos } from "./action";
import Link from "next/link";

export default async function AlunosPage() {
    const alunos = await getAlunos();

    return (
        <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
            {/* 🌌 fundo estrelado */}
            <Starfield />

            {/* 🧾 card principal */}
            <div
                className="relative z-10 flex flex-col items-center w-full max-w-3xl px-8 py-8 rounded-2xl gap-6"
                style={{
                    border: "1.5px solid rgba(99,153,255,0.4)",
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(6px)",
                    boxShadow: "0 0 25px rgba(99,153,255,0.2)",
                }}
            >
                <h1 className="text-white text-3xl font-bold font-mono tracking-wide">
                    Lista de alunos
                </h1>

                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                    {alunos.map((aluno) => (
                        <li
                            key={aluno.id}
                            className="p-4 rounded-xl transition-all hover:-translate-y-1 hover:scale-105"
                            style={{
                                background: "rgba(255,255,255,0.06)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                backdropFilter: "blur(4px)",
                                boxShadow: "0 0 10px rgba(99,153,255,0.15)",
                            }}
                        >
                            <AlunoItem
                                nome={aluno.nome}
                                id={aluno.id}
                            />
                        </li>
                    ))}
                </ul>

               
                <Link
                    href="/aluno/cadastro"
                    className="px-6 py-2 rounded-xl text-sm font-medium text-white transition-all hover:-translate-y-0.5 active:scale-95"
                    style={{
                        background: "linear-gradient(135deg, #2c5be8, #1e3fa8)",
                        boxShadow: "0 0 15px rgba(44,91,232,0.5)",
                    }}
                >
                   ➕ Cadastrar aluno
                </Link>
            </div>
        </div>
    );
}