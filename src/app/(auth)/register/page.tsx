import { BrandPanel } from "@/components/auth/brand-panel";
import { RegisterForm } from "@/components/auth/forms/register-form";

export default function RegisterPage() {
    return (
        <main className="min-h-screen flex bg-white">
            <BrandPanel />

            <div className="flex-1 flex items-center justify-center px-6 py-10">
                <RegisterForm />
            </div>
        </main>
    );
}