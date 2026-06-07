import {BrandPanel} from "@/components/auth/brand-panel";
import {LoginForm} from "@/components/auth/forms/login-form";

export default function LoginPage(){
    return(
        <main className="min-h-screen flex bg-white">
            <BrandPanel />

            <div className="flex-1 flex items-center justify-center px-6 py-10">
                <LoginForm />
            </div>
        </main>
    );
}