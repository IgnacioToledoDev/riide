import { Check, Star } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface Plan {
  id: number;
  name: string;
  description: string;
  price: number | string;
  isPopular: boolean;
  storageLimit: number;
  bandwidthLimit: number;
  ramLimit: number;
  billingCycle: string;
}

export const PricingPlan = ({
  id,
  name,
  description,
  price,
  isPopular,
  storageLimit,
  bandwidthLimit,
  ramLimit,
  billingCycle,
}: Plan) => {
  const formatPrice = new Intl.NumberFormat("es-CL", {
    currency: "CLP",
    style: "currency",
  }).format(Number(price));
  return (
    <Card
      key={name}
      className={`flex flex-col ${
        isPopular
          ? "md:-mt-6 md:mb-6 bg-primary text-primary-foreground shadow-lg"
          : "bg-card"
      }`}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle
              className={`text-2xl font-bold ${
                isPopular ? "text-primary-foreground" : ""
              }`}
            >
              {name}
            </CardTitle>
            <CardDescription
              className={`mt-2 ${
                isPopular ? "text-primary-foreground/90" : ""
              }`}
            >
              {description}
            </CardDescription>
          </div>
          {isPopular && (
            <Badge
              variant="secondary"
              className="bg-primary-foreground text-primary"
            >
              <Star className="h-4 w-4 mr-1" /> Popular
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p
          className={`text-4xl font-bold mb-6 ${
            isPopular ? "text-primary-foreground" : ""
          }`}
        >
          {formatPrice}
          <span className="text-lg font-normal">
            /{billingCycle === "yearly" ? "año" : "mes"}
          </span>
        </p>
      </CardContent>
      <CardFooter className="flex-grow">
        <ul className="space-y-2">
          <li className="flex items-center">
            <Check className="mr-2 h-4 w-4 text-green-500" />
            {storageLimit} GB de almacenamiento
          </li>
          <li className="flex items-center">
            <Check className="mr-2 h-4 w-4 text-green-500" />
            {bandwidthLimit} GB Ancho de banda
          </li>
          <li className="flex items-center">
            <Check className="mr-2 h-4 w-4 text-green-500" />
            {ramLimit} GB de RAM
          </li>
        </ul>
      </CardFooter>
      <CardFooter>
        <Link
          className="w-full"
          to={{
            pathname: "/signup",
            search: `?planId=${id}&billingCycle=${billingCycle}`,
          }}
        >
          <Button className="w-full">Seleccionar Plan</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
