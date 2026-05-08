"use client"

import { Curso } from "@/interfaces/cursos";
import { useParams } from "next/navigation";
import { useState, useEffect, SubmitEvent, SetStateAction } from "react";
import { getCurso, updateCurso } from "../action";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AlunoPage() {
    const { id } = useParams();
    const [Curso, setCurso] = useState({} as Curso);
    const  router = useRouter();
    
      useEffect(() => {
            getCurso(Number(id)).then((response: SetStateAction<Curso>) => setCurso(response));
        }, [id]);

        function handleChange(value: string|number, key: keyof Curso) {
           setCurso(oldState => ({ ...oldState, [key]: value}));
        }

        async function handleUpdate(e: SubmitEvent) {
          e.preventDefault();
          const response = await updateCurso(Number(id), Curso);

          if (response) {
            alert(response);
            return;
        }

        router.push(`/Cursos`);
      }

    return (
      < div className="p-4 rounded-xl"
        style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(4px)",
            boxShadow: "0 0 10px rgba(99,153,255,0.15)",
        }} >
        <form className="flex flex-col gap-4 relative z-10"
        onSubmit={handleUpdate}
        >

        <div className="flex flex-col gap-4 left-60">
          <input
            value={Curso.nome ?? ""}
            onChange={(e) => handleChange(e.target.value, "nome")}
            className="..."
          />
        </div>

        <div>
          <input
            value={Curso.professor ?? ""}
            onChange={(e) => handleChange((e.target.value), "professor")}
            className="..."
          />
        </div>

        <div>
          <input
            type="number"
            value={Curso.cargaHoraria ?? ""}
            onChange={(e) => handleChange(Number(e.target.value), "cargaHoraria")}
            className="..."
          />
        </div>

        <div>
          <input
            value={Curso.descricao ?? ""}
            onChange={(e) => handleChange(e.target.value, "descricao")}
            className="..."
          />
          <button
          type="submit"
          className="bg-blue-500 text-white rounded-xl py-2 hover:scale-110 transition">
            Salvar
          </button>
        </div>
      </form>
      </div>
    );
}