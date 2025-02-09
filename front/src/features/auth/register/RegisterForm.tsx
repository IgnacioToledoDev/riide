import { Button } from "@/features/_global/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { EyeIcon, EyeOffIcon, Github, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "react-query";
import {
  SignUpFormState,
  SignUpFormResponse,
} from "@/features/auth/register/interfaces/userRegisterInterface";
import { setCookie } from "../cookie";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const planId = searchParams.get("planId");
  const billingCycle = searchParams.get("billingCycle");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const [formData, setFormData] = useState<SignUpFormState>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    planId: planId || "",
    billingCycle: billingCycle || "",
  });

  let dataResponse: any;
  const mutation = useMutation<SignUpFormResponse, Error, SignUpFormState>(
    async (formData) => {
      const response = await fetch("http://127.0.0.1:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      dataResponse = await response.json();
      return dataResponse;
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formData, {
      onSuccess: (data) => {
        console.log("Registro exitoso:", data);
        const isSaved = setCookie(dataResponse?.token);

        if (data?.success && isSaved) {
          handleRedirect();
        }
      },
      onError: (error) => {
        console.error("Error al registrar:", error);
      },
    });
  };

  const handleRedirect = () => {
    navigate("/payment");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Crear una cuenta</CardTitle>
        <CardDescription>
          Únete a Ride y comienza a alojar tus aplicaciones hoy mismo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Google
          </Button>
          <Button variant="outline">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              placeholder="John Doe"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
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
          <div className="space-y-2">
            <Label htmlFor="c_password">Repetir contraseña</Label>
            <div className="relative">
              <Input
                id="c_password"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={formData.password_confirmation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password_confirmation: e.target.value,
                  })
                }
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent space-y-2"
                onClick={toggleConfirmPasswordVisibility}
                aria-label={
                  showConfirmPassword
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"
                }
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Registrando..." : "Crear Cuenta"}
          </Button>
        </form>
        {mutation.isError && (
          <p className="text-red-500 text-center mt-2">
            Error: {mutation.error?.message}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="hover:underline text-blue-600">
            Inicia sesión
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
