import { Link } from "react-router-dom";
import { Button } from "@/features/_global/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Home,
  BarChart,
  Settings,
  HelpCircle,
  LogOut,
  Cpu,
  Cloud,
  Users,
  CreditCard,
} from "lucide-react";
import { useMutation } from "react-query";

const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Cloud, label: "Deployments", href: "/deployments" },
  { icon: Cpu, label: "Resources", href: "/resources" },
  { icon: BarChart, label: "Analytics", href: "/analytics" },
  { icon: Users, label: "Team", href: "/team" },
  { icon: CreditCard, label: "Billing", href: "/billing" },
  { icon: Settings, label: "Settings", href: "/settings" },
];
export function Sidebar() {
  const mutation = useMutation<any, Error, any>(async () => {
    const response = await fetch("http://127.0.0.1:8000/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  });

  const handleLogout = () => {
    console.log("Cerrar sesión");
    mutation.mutate("", {
      onSuccess: () => {
        console.log("Usuario desautenticado");
        window.location.href = "/login";
      },
      onError: (error) => {
        console.error("Error al cerrar sesión", error);
      },
    });
  };

  return (
    <div className="flex h-screen flex-col border-r bg-gray-100/40 dark:bg-gray-800/40">
      <div className="flex h-14 items-center border-b px-4">
        <Link className="flex items-center gap-2 font-semibold" to="/">
          <Cloud className="h-6 w-6" />
          <span>Ride</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-2 p-4">
          {sidebarItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start"
              asChild
            >
              <Link to={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className="mt-auto p-4">
        <Button variant="ghost" className="w-full justify-start">
          <HelpCircle className="mr-2 h-4 w-4" />
          Help & Support
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  );
}
