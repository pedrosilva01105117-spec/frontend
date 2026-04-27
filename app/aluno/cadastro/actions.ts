"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

interface CreateAluno {
    nome: string;
    idade: number;
    cpf: number;
    email: string;
}

export async function createAluno(aluno: CreateAluno) {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("access_token")?.value;

    const response = await fetch(`http://localhost:8080/alunos`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(aluno),
    })
        const data = await response.json();

        if (response.status === 201) {
            revalidateTag("listar", "max");
            return;
        }

        return data.message;
}