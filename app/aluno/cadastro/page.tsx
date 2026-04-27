"use client";

import { Aluno } from "@/interfaces/alunos";
import { SubmitEvent, useEffect, useRef, useState } from "react";
import { createAluno } from "./actions";
import { useRouter } from "next/navigation";

interface Star {
    x: number;
    y: number;
    radius: number;
    opacity: number;
    twinkleSpeed: number;
    twinkleOffset: number;
}

export default function AlunoCadastroPage() {
    const router = useRouter();
    const [nome, setNome] = useState("");
    const [aluno, setAluno] = useState({} as Aluno);
    const [idade, setIdade] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const cardRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<Star[]>([]);
    const animFrameRef = useRef<number>(0);

    const initials = aluno.nome
        ? aluno.nome.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
        : "?";

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        const response = await createAluno({
          nome,
          idade: Number(idade),
          cpf: Number(cpf),
          email,
        });

        if (!response) {
            setNome("");
            setIdade("");
            setCpf("");
            setEmail("");
            router.push("/alunos");
            return;
        }
        
        alert(response);   
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const center = { x: 0, y: 0 };

        const planets: any[] = [
            { orbit: 60, size: 4, speed: 0.02, angle: 0, color: "#aaa" },
            { orbit: 90, size: 6, speed: 0.015, angle: 0, color: "#f5c542" },
            { orbit: 120, size: 6, speed: 0.01, angle: 0, color: "#4da6ff", moonAngle: 0 }, // 🌍 Terra
            { orbit: 150, size: 5, speed: 0.008, angle: 0, color: "#ff4d4d" },
            { orbit: 200, size: 10, speed: 0.006, angle: 0, color: "#d9a066" },
            { orbit: 260, size: 9, speed: 0.005, angle: 0, color: "#e6cc80" },
        ];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            center.x = canvas.width / 2;
            center.y = canvas.height / 2;

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

            // ☀️ sol
            const sunGradient = ctx.createRadialGradient(
                center.x,
                center.y,
                10,
                center.x,
                center.y,
                40
            );
            sunGradient.addColorStop(0, "#fff7a1");
            sunGradient.addColorStop(1, "#ffae00");

            ctx.beginPath();
            ctx.arc(center.x, center.y, 30, 0, Math.PI * 2);
            ctx.fillStyle = sunGradient;
            ctx.fill();

            // 🪐 planetas + 🌙 lua
            planets.forEach((planet, index) => {
                planet.angle += planet.speed;

                const x = center.x + Math.cos(planet.angle) * planet.orbit;
                const y = center.y + Math.sin(planet.angle) * planet.orbit;

                // órbita
                ctx.beginPath();
                ctx.arc(center.x, center.y, planet.orbit, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(255,255,255,0.05)";
                ctx.stroke();

                // planeta
                ctx.beginPath();
                ctx.arc(x, y, planet.size, 0, Math.PI * 2);
                ctx.fillStyle = planet.color;
                ctx.fill();

                // 🌍 LUA orbitando a Terra
                if (index === 2) {
                    planet.moonAngle += 0.05;

                    const moonOrbit = 15;

                    const mx =
                        x + Math.cos(planet.moonAngle) * moonOrbit;
                    const my =
                        y + Math.sin(planet.moonAngle) * moonOrbit;

                    // órbita da lua
                    ctx.beginPath();
                    ctx.arc(x, y, moonOrbit, 0, Math.PI * 2);
                    ctx.strokeStyle = "rgba(255,255,255,0.08)";
                    ctx.stroke();

                    // lua
                    ctx.beginPath();
                    ctx.arc(mx, my, 2.5, 0, Math.PI * 2);
                    ctx.fillStyle = "#ddd";
                    ctx.fill();
                }
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
    <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden  bg-black">

        {/* fundo */}
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
        />

        {/*card com borda */}
        <div
            className="relative z-10 flex flex-col items-center w-full max-w-sm px-6 py-7 rounded-2xl"
            style={{
                border: "1.5px solid rgba(99,153,255,0.4)",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(4px)",
            }}
        >
            <p className="text-3xl font-mono">Cadastrar Aluno</p>

            <form
                className="flex flex-col gap-4 w-full"
                onSubmit={handleSubmit}
            >
                <input className="border-2 rounded px-3 py-1 bg-white/10 text-white" placeholder="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                <input className="border-2 rounded px-3 py-1 bg-white/10 text-white" placeholder="idade" value={idade} onChange={(e) => setIdade(e.target.value)} />
                <input className="border-2 rounded px-3 py-1 bg-white/10 text-white" placeholder="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                <input className="border-2 rounded px-3 py-1 bg-white/10 text-white" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <button className="bg-blue-500 text-white rounded-xl py-2 hover:scale-110 transition">
                    Cadastrar
                </button>
                <button
                onClick={()=> router.back()} >Voltar</button>
            </form>
        </div>

    </div>
);
}