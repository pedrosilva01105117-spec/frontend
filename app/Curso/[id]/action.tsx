"use server";

import { Curso } from "@/interfaces/cursos";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getCurso(id: number) {
    try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("access_token")?.value;
    console.log(token);
    const response = await fetch(`http://localhost:8080/Cursos/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        next: { tags: ["pegarDados"] },
    })

    const data = await response.json();
     
    if (response.status === 401) {
            redirect("/login");
        }

    return data as Curso;
    } catch (e) {
        console.error(e);
        return {} as Curso;
    }
};

export async function updateCurso(id: number, curso: Curso) {
    try{
    const cookiesStore = await cookies();
    const token = cookiesStore.get("access_token")?.value;

    const response = await fetch(`http://localhost:8080/Cursos/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(curso),
    });

    if (response.status === 401) {
        redirect("/login");
    }
    const data = await response.json();

    if (response.status === 200) {
        revalidateTag("pegarDados", "max");
        return;
    }

    return data;
} catch (e) {
    console.error(e);
    return "Erro ao atualizar o Curso";
}
}