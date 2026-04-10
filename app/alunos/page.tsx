export default function AlunosPage() {
    return (
         <div className="flex  flex-col flex-1 items-center justify-center">
            <h1 className=" flex flex-col flex-1 items-center justify-center bg-zinc-50 font-mono dark:bg-black text-4xl p-15 font-bold">Lista de alunos</h1>

            <div className="flex mb-60 flex-1 flex-col items-center justify-center border-10 border-double border-b-blue-950 shadow-xl shadow-indigo-500/40 max-w-250">
                <ul className="font-mono justify-center gap-10 flex items-center mb-60 flex-wrap">
                    <li className="border-10 p-7 border-double shadow-xl shadow-indigo-400/40 transition-all duration-300 ease-in-out hover:scale-110 border-b-blue-950">Aluno 1</li>
                    <li className="border-10 p-7 border-double shadow-xl shadow-indigo-400/40 transition-all duration-300 ease-in-out hover:scale-110  border-b-blue-950">Aluno 2</li>
                    <li className="border-10 p-7 border-double shadow-xl shadow-indigo-400/40 transition-all duration-300 ease-in-out hover:scale-110  border-b-blue-950">Aluno 3</li>
                    <li className="border-10 p-7 border-double shadow-xl shadow-indigo-400/40 transition-all duration-300 ease-in-out hover:scale-110  border-b-blue-950">Aluno 4</li>
                    <li className="border-10 p-7 border-double shadow-xl shadow-indigo-400/40 transition-all duration-300 ease-in-out hover:scale-110  border-b-blue-950">Aluno 5</li>
                    <li className="border-10 p-7 border-double shadow-xl shadow-indigo-400/40 transition-all duration-300 ease-in-out hover:scale-110  border-b-blue-950">Aluno 6</li>
                    <li className="border-10 p-7 border-double shadow-xl shadow-indigo-400/40 transition-all duration-300 ease-in-out hover:scale-110  border-b-blue-950">Aluno 7</li>
                    <li className="border-10 p-7 border-double shadow-xl shadow-indigo-400/40 transition-all duration-300 ease-in-out hover:scale-110  border-b-blue-950">Aluno 8</li>
                    <li className="border-10 p-7 border-double shadow-xl shadow-indigo-400/40 transition-all duration-300 ease-in-out hover:scale-110  border-b-blue-950">Aluno 9</li>
                    <li className="border-10 p-7 border-double shadow-xl shadow-indigo-400/40 transition-all duration-300 ease-in-out hover:scale-110  border-b-blue-950">Aluno 10</li>

                </ul>
            </div>
        </div>
    )
}