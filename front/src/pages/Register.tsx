import SignUpForm from "@/features/auth/register/RegisterForm";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import NavbarOnlyHome from "@/features/_global/components/NavbarOnlyHome";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <NavbarOnlyHome />

      <GoogleReCaptchaProvider
        reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY as string}
        language="es-419"
      >
        <div className="max-w-3xl mx-auto pt-6">
          <SignUpForm />
        </div>
      </GoogleReCaptchaProvider>
    </div>
  );
}
