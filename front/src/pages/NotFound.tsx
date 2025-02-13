import { Button } from "@/features/_global/ui/button";
import { Cloud, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/features/_global/context/AuthProvider";

export default function NotFound() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 text-center">
      <Cloud className="h-24 w-24 text-primary mb-8 animate-bounce" />
      <h1 className="text-4xl font-bold mb-4">404 - Página no encontrada</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Oops! Parece que te has perdido en las nubes. La página que estás
        buscando no existe o ha sido movida.
      </p>
      <Button asChild size="lg">
        <Link to={user ? "/dashboard" : "/"} className="flex items-center">
          <Home className="mr-2 h-4 w-4" />
          Volver a la página principal
        </Link>
      </Button>
    </div>
  );
}
