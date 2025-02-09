import { useState } from "react";
import { Button } from "@/features/_global/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

interface ResetPasswordFormProps {
  password: string;
  confirmPassword: string;
  token: string;
  email: string;
}

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [formData, setFormData] = useState<ResetPasswordFormProps>({
    password: "",
    confirmPassword: "",
    token: token || "",
    email: email || "",
  });

  const mutation = useMutation<
    ResetPasswordFormProps,
    Error,
    ResetPasswordFormProps
  >(async (formData) => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/auth/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    mutation.mutate(formData, {
      onSuccess: () => {
        setIsSubmitted(true);
        // TODO change this
        // check other option to redirect
        const timeout = 3000;
        setTimeout(() => {
          navigate("/login");
        }, timeout);
      },
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Cambiar contraseña</CardTitle>
        <CardDescription>
          Ingresa tu nueva contraseña para restablecer tu cuenta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isSubmitted ? (
          <Alert>
            <Lock className="h-4 w-4" />
            <AlertTitle>Contraseña cambiada</AlertTitle>
            <AlertDescription>
              Tu contraseña ha sido cambiada exitosamente. Ya puedes iniciar
              sesión con tu nueva contraseña.
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Nueva contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirmar nueva contraseña
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full">
                Cambiar contraseña
              </Button>
            </div>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link to="/login">
          <Button variant="link" className="text-sm text-muted-foreground">
            Volver al inicio de sesión
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
