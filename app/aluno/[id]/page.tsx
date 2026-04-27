"use client"

import { getAluno } from "./actions";
import { Aluno } from "@/interfaces/alunos";
import { useParams } from "next/navigation";
import router from "next/router";
import { useEffect, useState, useRef } from "react";

interface Star {
    x: number;
    y: number;
    radius: number;
    opacity: number;
    twinkleSpeed: number;
    twinkleOffset: number;
}

export default function AlunoPage() {
    const { id } = useParams();
    const [aluno, setAluno] = useState({} as Aluno);
    const cardRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<Star[]>([]);
    const animFrameRef = useRef<number>(0);

    const initials = aluno.nome
        ? aluno.nome.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
        : "?";

    useEffect(() => {
        getAluno(Number(id)).then((response) => setAluno(response));
    }, [id]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    };

    const handleMouseLeave = () => {
        cardRef.current?.style.setProperty("--mouse-x", "50%");
        cardRef.current?.style.setProperty("--mouse-y", "50%");
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;

            starsRef.current = Array.from({ length: 150 }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: 0.3 + Math.random() * 1.2,
                opacity: 0.2 + Math.random() * 0.8,
                twinkleSpeed: 0.005 + Math.random() * 0.02,
                twinkleOffset: Math.random() * Math.PI * 2,
            }));
        };

        resize();
        window.addEventListener("resize", resize);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // ⭐ estrelas
            starsRef.current.forEach((star) => {
                star.twinkleOffset += star.twinkleSpeed;

                const opacity =
                    star.opacity *
                    (0.5 + 0.5 * Math.sin(star.twinkleOffset));

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${opacity})`;
                ctx.fill();
            });

            animFrameRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <div className="relative flex flex-1 flex-col items-center justify-center gap-6 p-8">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
            />

            <div
                className="relative w-full max-w-sm"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <div
                    className="pointer-events-none absolute -inset-4 rounded-3xl opacity-60"
                    style={{
                        background:
                            "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(59,130,246,0.4), rgba(139,92,246,0.2) 40%, transparent 70%)",
                        filter: "blur(24px)",
                    }}
                />

                <div
                    ref={cardRef}
                    className="relative w-full rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md transition-all duration-300 ease-in-out hover:scale-105 overflow-hidden"
                    style={
                        { "--mouse-x": "50%", "--mouse-y": "50%" } as React.CSSProperties
                    }
                >
                    <div className="flex flex-col gap-4 relative z-10">
                        <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-700 dark:text-blue-300 text-xl font-medium mb-4">
                            {initials}
                        </div>

                        {aluno.nome && (
                            <div>
                                <span className="text-xs font-semibold uppercase tracking-widest text-white/40">Nome</span>
                                <p className="mt-1 text-2xl font-bold tracking-tight text-white">{aluno.nome}</p>
                            </div>
                        )}
                        {aluno.idade && (
                            <div>
                                <span className="text-xs font-semibold uppercase tracking-widest text-white/40">Idade</span>
                                <p className="mt-1 text-xl font-semibold text-white">{aluno.idade}</p>
                            </div>
                        )}
                        {aluno.cpf && (
                            <div>
                                <span className="text-xs font-semibold uppercase tracking-widest text-white/40">CPF</span>
                                <p className="mt-1 font-mono text-lg tracking-wider text-white/90">{aluno.cpf}</p>
                            </div>
                        )}
                        {aluno.email && (
                            <div>
                                <span className="text-xs font-semibold uppercase tracking-widest text-white/40">E-mail</span>
                                <p className="mt-1 text-base text-white/80 break-all">{aluno.email}</p>
                            </div>
                        )}
                    </div>
            
                </div>
            </div>
            
        </div>
    );
}