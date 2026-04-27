"use server";

import { Aluno } from "@/interfaces/alunos";
import { cookies } from "next/headers";

export async function getAluno(id: number) {

    const cookiesStore = await cookies();
    const token = cookiesStore.get("access_token")?.value;
    console.log(token);
    const response = await fetch(`http://localhost:8080/alunos/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then((res) => res.json())
    .catch((e) => {
        console.error(e);
        return [];
    })

    return response as Aluno;
};