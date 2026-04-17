import LoginForm from "@/components/loginForm";
import { loginAction } from "./actions";

export default function loginPage() {
    return(
        <div className="bg-amber-50 w-screen h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-700 to-gray-900">
            <h1 className="flex text-4xl mb-50 font-mono flex-col flex-1 items-center justify-center no-underline hover:underline lowercase absolute mt-0.5 right-225">Login</h1>

            <LoginForm onSend={loginAction}/>
        </div>
    )
}

