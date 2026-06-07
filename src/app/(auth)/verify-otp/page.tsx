import { BrandPanel } from "@/components/auth/brand-panel";
import {VerifyOtpForm} from "@/components/auth/forms/verify-otp-form";

export default function VerifyOtpPage() {
    return (
        <main className="min-h-screen flex bg-white">
            <BrandPanel />

            <div className="flex-1 flex items-center justify-center px-6 py-10">
                <VerifyOtpForm />
            </div>
        </main>
    );
}