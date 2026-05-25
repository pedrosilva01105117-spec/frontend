"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
  });

  if (response.status === 201) {
    revalidateTag("listar", "max");
    return;
  }

  if (response.status === 401) {
    redirect("/login");
  }
  try {
    const data = await response.json();
    return data.message;
  } catch (e) {
    console.error(e);
    return "Erro ao cadastrar o aluno";
  }
}
