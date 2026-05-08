"use client"

import { Aluno } from "@/interfaces/alunos";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect, SubmitEvent } from "react";
import { getAluno, updateAluno } from "../actions";
import { useRouter } from "next/navigation";

interface Star {
    x: number;
    y: number;
    radius: number;
    opacity: number;
    twinkleSpeed: number;
    twinkleOffset: number;
}

export default function AlunoPage() {
    const { id } = useParams();
    const [aluno, setAluno] = useState({} as Aluno);
    const  router = useRouter();

     const initials = aluno.nome
        ? aluno.nome.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
        : "?";
    
      useEffect(() => {
            getAluno(Number(id)).then((response) => setAluno(response));
        }, [id]);

        function handleChange(value: string|number, key: keyof Aluno) {
            setAluno(oldState => ({ ...oldState, [key]: value}));
        }

        async function handleUpdate(e: SubmitEvent) {
          e.preventDefault();
          const response = await updateAluno(Number(id), aluno);

          if (response) {
            alert(response);
            return;
        }

        router.push(`/aluno/${id}`);
      }

    return (
      < div >
        <form className="flex flex-col gap-4 relative z-10"
        onSubmit={handleUpdate}
        >

        <div>
          <input
            value={aluno.nome ?? ""}
            onChange={(e) => handleChange(e.target.value, "nome")}
            className="..."
          />
        </div>

        <div>
          <input
            type="number"
            value={aluno.idade ?? ""}
            onChange={(e) => handleChange(Number(e.target.value), "idade")}
            className="..."
          />
        </div>

        <div>
          <input
            type="number"
            value={aluno.cpf ?? ""}
            onChange={(e) => handleChange(Number(e.target.value), "cpf")}
            className="..."
          />
        </div>

        <div>
          <input
            type="email"
            value={aluno.email ?? ""}
            onChange={(e) => handleChange(e.target.value, "email")}
            className="..."
          />
        </div>
      </form>
      </div>
    );
}