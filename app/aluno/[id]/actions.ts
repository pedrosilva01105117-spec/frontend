"use server";

import { Aluno } from "@/interfaces/alunos";
import { Curso } from "@/interfaces/cursos";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getAluno(id: number) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("access_token")?.value;

  const response = await fetch(`http://localhost:8080/alunos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { tags: ["pegarDados"] },
  });

  if (response.status === 401) {
    redirect("/login");
  }

  try {
    const data = await response.json();
    return data as Aluno;
  } catch (e) {
    console.error(e);
    return {} as Aluno;
  }
}

export async function updateAluno(id: number, aluno: Aluno) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("access_token")?.value;

  const response = await fetch(`http://localhost:8080/alunos/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(aluno),
  });

  if (response.status === 401) {
    redirect("/login");
  }

  if (response.status === 200) {
    revalidateTag("pegarDados", "max");
    return;
  }

  try {
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
    return "Erro ao atualizar o aluno";
  }
}

export async function matriculas(
  id: number,
  matricula: Curso[],
  desmatriculado: Curso[],
) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("access_token")?.value;

  let response = await fetch(`http://localhost:8080/alunos/matriculas/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cursosId: matricula.map((curso) => curso.id),
    }),
  });

  if (response.status === 401) {
    redirect("/login");
  }
  if (response.status === 200) {
    try {
      const data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
      return "Erro ao desmatricular o aluno";
    }
  }

  response = await fetch(`http://localhost:8080/alunos/matriculas/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cursosId: desmatriculado.map((curso: { id: any; }) => curso.id),
    }),
  });

  if (response.status === 401) {
    redirect("/login");
  }

  if (response.status !== 200) {
    try {
      const data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
      return "Erro ao atualizar as matriculas";
    }
  }

  revalidateTag("pegarDados", "max");
  revalidateTag("listar", "max");
  return;
}
