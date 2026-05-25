"use client";

import { Aluno } from "@/interfaces/alunos";
import { Curso } from "@/interfaces/cursos";
import { useParams } from "next/navigation";
import Starfield from "@/components/Starfield";
import {
  useState,
  useRef,
  useEffect,
  SubmitEvent,
  SetStateAction,
} from "react";
import { getAluno, matriculas, updateAluno } from "../actions";
import { useRouter } from "next/navigation";
import { getCursos } from "@/app/Cursos/action";
import { ArrowDownLeft, ArrowDownLeftFromCircle, ArrowDownRight, ArrowDownRightFromCircle, ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

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
  const [cursos, setCursos] = useState([] as Curso[]);
  const [matriculado, setmatriculado] = useState([] as Curso[]);
  const [NaoMatriculado, setNaoMatriculado] = useState([] as Curso[]);
  const router = useRouter();

  useEffect(() => {
    getAluno(Number(id)).then((response) => setAluno(response));
    getCursos().then((response) => setCursos(response));
  }, [id]);

  useEffect(() => {
    if (aluno.cursos) {
      const matriculadoTamp = [] as Curso[];
      const NaoMatriculadoTamp = [] as Curso[];

      for (const curso of cursos) {
        if (aluno.cursos.find((c) => c.id === curso.id)) {
          matriculadoTamp.push(curso);
        } else {
          NaoMatriculadoTamp.push(curso);
        }
      }
      setmatriculado(matriculadoTamp);
      setNaoMatriculado(NaoMatriculadoTamp);
    }
  }, [cursos, aluno]);

  function handleChange(value: string | number, key: keyof Aluno) {
    setAluno((oldState) => ({ ...oldState, [key]: value }));
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

  function matricular(curso: Curso) {
    setmatriculado((oldState) => [...oldState, curso]);
    setNaoMatriculado((oldState) => oldState.filter((c) => c.id !== curso.id));
  }

  function desmatricular(curso: Curso) {
    setmatriculado((oldState) => oldState.filter((c) => c.id !== curso.id));
    setNaoMatriculado((oldState) => [...oldState, curso]);
  }

  async function saveMatriculas() {
    const response = await matriculas(Number(id), matriculado, NaoMatriculado);

    if (response) {
      alert(response);
      return;
    }

    router.push(`/aluno/${id}`);
  }

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
       <Starfield />
       <p className="text-3xl font-mono">Editar Aluno</p>
       <div
                className="relative z-10 flex flex-col items-center w-full max-w-3xl px-8 py-8 rounded-2xl gap-6"
                style={{
                    border: "1.5px solid rgba(99,153,255,0.4)",
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(6px)",
                    boxShadow: "0 0 25px rgba(99,153,255,0.2)",
                }}
            >
              
     <form
        className="flex flex-col gap-3 relative z-10 w-full"
        onSubmit={handleUpdate}
      >
        <div className="flex flex-col gap-1">
          <input
            value={aluno.nome ?? ""}
            onChange={(e) => handleChange(e.target.value, "nome")}
            placeholder="Nome"
            className="w-full px-4 py-2.5 rounded-lg text-sm text-white/80 placeholder-white/20 bg-white/5 border border-white/10 focus:border-blue-400/50 focus:bg-blue-400/5 focus:outline-none transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1">
          <input
            type="number"
            value={aluno.idade ?? ""}
            onChange={(e) => handleChange(Number(e.target.value), "idade")}
            placeholder="Idade"
            className="w-full px-4 py-2.5 rounded-lg text-sm text-white/80 placeholder-white/20 bg-white/5 border border-white/10 focus:border-blue-400/50 focus:bg-blue-400/5 focus:outline-none transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1">
          <input
            type="number"
            value={aluno.cpf ?? ""}
            onChange={(e) => handleChange(Number(e.target.value), "cpf")}
            placeholder="CPF"
            className="w-full px-4 py-2.5 rounded-lg text-sm text-white/80 placeholder-white/20 bg-white/5 border border-white/10 focus:border-blue-400/50 focus:bg-blue-400/5 focus:outline-none transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1">
          <input
            type="email"
            value={aluno.email ?? ""}
            onChange={(e) => handleChange(e.target.value, "email")}
            placeholder="Email"
            className="w-full px-4 py-2.5 rounded-lg text-sm text-white/80 placeholder-white/20 bg-white/5 border border-white/10 focus:border-blue-400/50 focus:bg-blue-400/5 focus:outline-none transition-colors"
          />
        </div>
      </form>

          <button className="">Salav</button>

        <div className="flex flex-row gap-0 w-full rounded-xl overflow-hidden"
          style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(99,153,255,0.2)", minHeight: "180px" }}>

          <ul className="flex-1 flex flex-col gap-1 px-3 py-3">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-blue-300 text-center mb-2">
              Matriculado
            </h2>
            {matriculado.map((cursos) => (
              <li key={cursos.id} className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-blue-400/10 border border-blue-400/10 hover:bg-blue-400/20 transition-colors text-sm text-white/80">
                {cursos.nome}
                <button onClick={() => desmatricular(cursos)} className="cursor-pointer text-blue-400/50 hover:text-red-400 transition-colors ml-2">
                  <ArrowRightCircle size={16} />
                </button>
              </li>
            ))}
          </ul>

          <ul className="w-px self-stretch bg-blue-400/20" />

          <ul className="flex-1 flex flex-col gap-1 px-3 py-3">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-white/40 text-center mb-2">
              Não Matriculado
            </h2>
            {NaoMatriculado.map((cursos) => (
              <li key={cursos.id} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:bg-blue-400/10 hover:border-blue-400/20 transition-colors text-sm text-white/40 hover:text-white/70">
                <button onClick={() => matricular(cursos)} className="cursor-pointer text-white/20 hover:text-blue-400 transition-colors shrink-0">
                  <ArrowLeftCircle size={16} />
                </button>
                {cursos.nome}
              </li>
            ))}
          </ul>
        </div>
        <button className="bg-black text-white rounded-xl px-10 py-2 cursor-pointer transition-all 
        hover:-translate-y-0.5 active:scale-95"
        onClick={saveMatriculas}
        >
          Salvar Matricula
          </button>
      </div>
    </div>
  );
}
