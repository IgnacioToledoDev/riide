import SignUpForm from "@/features/auth/register/RegisterForm";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <GoogleReCaptchaProvider
        reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY as string}
        language="es-419"
      >
        <SignUpForm />
      </GoogleReCaptchaProvider>
    </div>
  );
}
