import { Cloud } from "lucide-react";
import { Link } from "react-router-dom";

const NavbarOnlyHome = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 top-0">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <Cloud className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-gray-900">Ride</span>
              <span className="sr-only">Ir a la página principal</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarOnlyHome;
