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
import { Mail } from "lucide-react";
import type React from "react"; // Added import for React
import { useMutation } from "react-query";

interface ForgotPasswordFormProps {
  email: string;
}

export default function ForgotPasswordForm() {
  const [formData, setFormData] = useState<ForgotPasswordFormProps>({
    email: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const mutation = useMutation<
    ForgotPasswordFormProps,
    Error,
    ForgotPasswordFormProps
  >(async (formData) => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/auth/forgot-password",
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
    mutation.mutate(formData, {
      onSuccess: () => {
        setIsSubmitted(true);
        // todo open modal to show success message
      },
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Olvidaste tu contraseña</CardTitle>
        <CardDescription>
          Ingresa tu correo electrónico y te enviaremos un enlace para
          restablecer tu contraseña.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isSubmitted ? (
          <Alert>
            <Mail className="h-4 w-4" />
            <AlertTitle>Email enviado</AlertTitle>
            <AlertDescription>
              Hemos enviado un enlace de restablecimiento de contraseña a tu
              correo electrónico.
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Enviar enlace de restablecimiento
              </Button>
            </div>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          variant="link"
          className="text-sm text-muted-foreground"
          onClick={() => window.history.back()}
        >
          Volver al inicio de sesión
        </Button>
      </CardFooter>
    </Card>
  );
}
