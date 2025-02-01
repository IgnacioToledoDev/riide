import { Card, CardHeader, CardFooter, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from "@/features/_global/ui/button";
import { useState } from "react";
import { EyeIcon, EyeOffIcon, Github, Mail } from "lucide-react"
import { Link } from "react-router-dom";


const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => setShowPassword(!showPassword)

    const handleGoogleLogin = () => {
      // Lógica para iniciar sesión con Google
      console.log("Iniciando sesión con Google")
    }
  
    const handleGithubLogin = () => {
      // Lógica para iniciar sesión con GitHub
      console.log("Iniciando sesión con GitHub")
    }

    return (
        <Card className="w-full max-w-md items-center justify-center">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Iniciar sesión en Ride</CardTitle>
            <CardDescription>Ingresa tus credenciales para acceder a tu cuenta</CardDescription>
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
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" type="email" placeholder="tu@ejemplo.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" required />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full">
              <Link to="/dashboard">
                Iniciar sesión
              </Link>
            </Button>
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
      )
    }


export default LoginForm;