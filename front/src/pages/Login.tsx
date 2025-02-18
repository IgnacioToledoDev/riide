import NavbarOnlyHome from "@/features/_global/components/NavbarOnlyHome";
import LoginForm from "@/features/auth/login/LoginForm";

const Login = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <NavbarOnlyHome />
      <div className="bg-background flex-col flex-grow flex items-center justify-center px-2 py-16 max-w-3xl mx-auto">
        <LoginForm />
      </div>
    </main>
  );
};

export default Login;
