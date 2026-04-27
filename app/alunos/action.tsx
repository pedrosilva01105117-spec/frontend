"use server";

import { Aluno } from "@/interfaces/alunos";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function getAlunos() {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("access_token")?.value

    const response = await fetch("http://localhost:8080/alunos", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        next: { tags: ["listar"] },
    })
    .then((res) => res.json())
    .catch((e) => {
        console.error(e);
        return[];
    });

    console.log(response)
    return response as Aluno[];
}

export async function deleteAluno(id: number) {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("access_token")?.value;

    const response = await fetch(`http://localhost:8080/alunos/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    const data = await response.json();

    if (response.status === 200) {
        revalidateTag("listar", "max");
        return;
    }

    return data;
    
}