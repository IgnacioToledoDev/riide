import { Button } from "@/features/_global/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Github, Mail } from "lucide-react"
import { useNavigate } from "react-router-dom";



export default function SignUpForm() {
  const navigate = useNavigate();
  const handleGoogleLogin = () => {
    // Lógica para iniciar sesión con Google
    console.log("Iniciando sesión con Google")
  }

  const handleGithubLogin = () => {
    // Lógica para iniciar sesión con GitHub
    console.log("Iniciando sesión con GitHub")
  }

  const handleRedirect = () => {
    navigate("/payment"); // Redirige a /dashboard
  };

  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Crear una cuenta</CardTitle>
        <CardDescription>Únete a Ride y comienza a alojar tus aplicaciones hoy mismo.</CardDescription>
      </CardHeader>
      <CardContent>
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
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input id="name" placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input id="email" type="email" placeholder="john@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Repetir contraseña</Label>
            <Input id="c_password" type="password" required />
          </div>
          <Button type="submit" className="w-full" onClick={handleRedirect}>
              Crear Cuenta
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="text-primary hover:underline">
            Inicia sesión
          </a>
        </p>
      </CardFooter>
    </Card>
  )
}

