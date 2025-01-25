import { Button } from "../ui/button"
import { Sheet, SheetTrigger, SheetContent}  from "../ui/sheet";
import { Mountain, Menu } from "lucide-react"

const navItems = [
    { name: "Inicio", href: "/" },
    { name: "Características", href: "#features" },
    { name: "Precios", href: "#pricing" },
    { name: "Contacto", href: "#contact" },
  ]

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-items-center">
        <div className="mr-4 hidden md:flex">
          <a href="/" className="mr-6 flex items-center space-x-2 md:flex md:justify-content-end">
            <Mountain className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Ride</span>
          </a>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <a href="/" className="mr-6 flex items-center space-x-2">
              <Mountain className="h-6 w-6" />
              <span className="font-bold">Ride</span>
            </a>
            <nav className="flex flex-col space-y-3 mt-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <a href="/login">Ingresar</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
