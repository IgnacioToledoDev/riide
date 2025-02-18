import NavbarOnlyHome from "@/features/_global/components/NavbarOnlyHome";
import ForgotPasswordForm from "@/features/auth/forgotPassword/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <NavbarOnlyHome />
      <div className="bg-background flex-col flex-grow flex items-center justify-center px-2 py-16 max-w-3xl mx-auto">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
