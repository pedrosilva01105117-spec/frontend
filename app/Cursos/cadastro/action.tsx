"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface createCursos {
    nome: string;
    professor: string;
    descricao: string;
    cargaHoraria: number;
}

export async function createCursos(Cursos: createCursos) {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("access_token")?.value;

    const response = await fetch(`http://localhost:8080/Cursos`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Cursos)
    });

    if (response.status === 201) {
        revalidateTag("listar", "default");
        return;
    }

    if (response.status === 401) {
        redirect("/login");
    }


    const data = await response.json();
    return data;
}