"use server";

import { cookies } from "next/headers";

export async function loginAction(email: string, password: string) {
    const response = await fetch("http://localhost:8080/funcionarios/login", {
        method:  "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            senha: password
        })
    });

    const data = await response.json();

    if(response.status === 200) {
        const cookiesStore = await cookies(); 
        cookiesStore.set("access_token", data.access_token)
        return;
    }
 
    return data;
}