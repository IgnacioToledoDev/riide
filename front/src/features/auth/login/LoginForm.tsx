import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/features/_global/ui/button";
import { useState } from "react";
import { EyeIcon, EyeOffIcon, Github, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

interface loginFormProps {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<loginFormProps>({
    email: "",
    password: "",
  });
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleGoogleLogin = () => {
    // Lógica para iniciar sesión con Google
    console.log("Iniciando sesión con Google");
  };

  const handleGithubLogin = () => {
    // Lógica para iniciar sesión con GitHub
    console.log("Iniciando sesión con GitHub");
  };

  const mutation = useMutation<loginFormProps, Error, loginFormProps>(
    async (formData) => {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formData, {
      onSuccess: () => {
        console.log("Usuario autenticado");
        navigate("/dashboard");
      },
      onError: (error) => {
        setError("Credenciales incorrectas");
        console.error(error);
      },
    });
  };

  return (
    <Card className="w-full max-w-md items-center justify-center">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">
          Iniciar sesión en Ride
        </CardTitle>
        <CardDescription>
          Ingresa tus credenciales para acceder a tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline" onClick={handleGoogleLogin}>
            <Mail className="mr-2 h-4 w-4" />
            Google
          </Button>
          <Button variant="outline" onClick={handleGithubLogin}>
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@ejemplo.com"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent space-y-2"
                onClick={togglePasswordVisibility}
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button className="w-full" type="submit">
            Iniciar sesión
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center space-y-2">
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
          <p>
            ¿No tienes una cuenta?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Regístrate
            </a>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
