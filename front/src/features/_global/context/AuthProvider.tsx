import { createContext, useState, useContext, useEffect } from "react";

// Definimos el tipo de usuario
type User = {
  id: number;
  name: string;
  email: string;
} | null;

// Creamos el contexto
const AuthContext = createContext<{
  user: User;
  setUser: (user: User) => void;
} | null>(null);

// Proveedor del contexto
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    // Cargar usuario desde la API
    fetch("/api/user", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
