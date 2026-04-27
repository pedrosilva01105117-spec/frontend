import { AlunoData } from "./alunos";

export interface CursoData {
    id: number;
    nome: string;
    professor?: string;
    cargaHorari: number;
    descricao: string;
    createAT: Date;
    updateAT: Date;
}

export interface Curso extends CursoData {
    alunos: AlunoData[];
}