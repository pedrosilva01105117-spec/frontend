import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-24 -top-24 rounded-full bg-[#5B8BF5] opacity-[0.18] blur-[120px]" />
        <div className="absolute -bottom-20 -left-20 rounded-full bg-[#7DF9C2] opacity-[0.18] blur-[120px]" />
        <p className="flex flex-1 text-[25px] font-mono p-10 items-center justify-center font-bold uppercase tracking-[0.14em]">
            Bem Vindo ao Gerenciador De Alunos
            </p>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">
        <main className="flex w-full max-w-2xl flex-col gap-12">

          <hr className="border-white/10" />

          <div className="flex flex-col gap-4">
            <p className="text-[15px]  font-bold uppercase tracking-[0.14em] text-white/25">
              Navegação
            </p>

            <div className="flex flex-wrap gap-3">
             <Link
                  href="/alunos"
                  className="group relative flex items-center text-white text-[17px] font-medium tracking-[0.05em] 
                  bg-[#a370f0] rounded-[0.9em] h-[2.8em] pl-[1.2em] pr-[3.3em] cursor-pointer
                  shadow-[inset_0_0_1.6em_-0.6em_#714da6] overflow-hidden"
                >
                  👥 Alunos

                  <span
                    className="absolute right-[0.3em] flex items-center justify-center 
                    h-[2.2em] w-[2.2em] bg-white rounded-[0.7em]
                    shadow-[0.1em_0.1em_0.6em_0.2em_#7b52b9]
                    transition-all duration-300
                    group-hover:w-[calc(100%-0.6em)]
                    active:scale-95"
                  >
                    <svg
                      className="w-[1.1em] text-[#7b52b9] transition-transform duration-300 group-hover:translate-x-[0.1em]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5 10h10M10 5l5 5-5 5" />
                    </svg>
                  </span>
              </Link>

            <Link
              href="/login"
              className="group relative flex items-center text-white text-[17px] font-medium tracking-[0.05em] 
              bg-[#a370f0] rounded-[0.9em] h-[2.8em] pl-[1.2em] pr-[3.3em] cursor-pointer
              shadow-[inset_0_0_1.6em_-0.6em_#714da6] overflow-hidden"
            >
              🔐 Login

              <span
                className="absolute right-[0.3em] flex items-center justify-center 
                h-[2.2em] w-[2.2em] bg-white rounded-[0.7em]
                shadow-[0.1em_0.1em_0.6em_0.2em_#7b52b9]
                transition-all duration-300
                group-hover:w-[calc(100%-0.6em)]
                active:scale-95"
              >
                <svg
                  className="w-[1.1em] text-[#7b52b9] transition-transform duration-300 group-hover:translate-x-[0.1em]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 10h10M10 5l5 5-5 5" />
                </svg>
              </span>
            </Link>
            </div>
          </div>

          <hr className="border-white/10" />

        </main>
      </div>
    </>
  );
}
