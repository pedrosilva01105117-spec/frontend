import AlunoItem from "@/components/AlunoItem";

import { getAlunos } from "./action";

export default async function AlunosPage() {
   const alunos = await getAlunos();

    console.log(alunos);

    return (
         <div className="flex  flex-col flex-1 items-center justify-center">
            <h1 className=" flex flex-col flex-1 items-center justify-center bg-zinc-50 font-mono dark:bg-black text-4xl p-15 font-bold">Lista de alunos</h1>

            <div className="flex mb-60 flex-1 flex-col items-center justify-center border-10 border-double border-b-blue-950 shadow-xl shadow-indigo-500/40 max-w-250">
                <ul className="font-mono justify-center gap-10 flex items-center mb-60 flex-wrap">
                    <AlunoItem id={1} nome="Pedro 1"/>
                    <AlunoItem id={2} nome="Pedro 2"/>
                    <AlunoItem id={3} nome="Pedro 3"/>
                    <AlunoItem id={4} nome="Pedro 4"/>
                    <AlunoItem id={5} nome="Pedro 5"/>
                    <AlunoItem id={6} nome="Pedro 6"/>
                    <AlunoItem id={7} nome="Pedro 7"/>
                    <AlunoItem id={8} nome="Pedro 8"/>
                    <AlunoItem id={9} nome="Pedro 9"/>
                    <AlunoItem id={10} nome="Pedro 1"/>
                </ul>
            </div>
        </div>
    )
}