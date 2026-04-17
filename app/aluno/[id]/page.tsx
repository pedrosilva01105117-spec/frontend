"use client"

import { useParams } from "next/navigation";

export default function AlunoPage() {
    const {id} = useParams();

    return (
        <p className="text-white flex  flex-col flex-1 items-center justify-center">{id}</p>
    );
}