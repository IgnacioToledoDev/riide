import { useState } from "react"
import { Button } from "@/features/_global/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Mail } from "lucide-react"
import type React from "react" // Added import for React

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Aquí iría la lógica para enviar el email de restablecimiento
    console.log("Enviando email de restablecimiento a:", email)
    setIsSubmitted(true)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Olvidaste tu contraseña</CardTitle>
        <CardDescription>
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isSubmitted ? (
          <Alert>
            <Mail className="h-4 w-4" />
            <AlertTitle>Email enviado</AlertTitle>
            <AlertDescription>
              Hemos enviado un enlace de restablecimiento de contraseña a tu correo electrónico.
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
        <Button variant="link" className="text-sm text-muted-foreground" onClick={() => window.history.back()}>
          Volver al inicio de sesión
        </Button>
      </CardFooter>
    </Card>
  )
}

