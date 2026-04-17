import { cookies, headers } from "next/headers";

export async function getAlunos() {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("access_token")?.value

    const response = await fetch("http://localhost:8080/alunos", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then((res) => res.json())
    .catch((e) => {
        console.error(e);
        return[];
    });
    return response;
}