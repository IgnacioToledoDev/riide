import { Check } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"

interface Plan {
  id: number,
  name: string,
  description: string,
  price: string,  
  billingCycle: string,
  isPopular: boolean,
  storageLimit: number,
  bandwidthLimit: number,
  ramLimit: number,
}

export const PricingPlan = (plan: Plan) => {
  const formatPrice = new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'}).format(Number(plan.price));
  
  return (
    <Card key={plan.name} className="flex flex-col">
    <CardHeader>
      <CardTitle>{plan.name}</CardTitle>
      <CardDescription>{plan.description}</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-3xl font-bold mb-4">
        {formatPrice}
        <span className="text-sm font-normal">/mes</span>
      </p>
      <ul className="space-y-2">
          <li className="flex items-center">
            <Check className="mr-2 h-4 w-4 text-green-500" />
            {plan.storageLimit} GB de almacenamiento
          </li>
          <li className="flex items-center">
            <Check className="mr-2 h-4 w-4 text-green-500" />
            {plan.bandwidthLimit} GB Ancho de banda
          </li>
          <li className="flex items-center">
            <Check className="mr-2 h-4 w-4 text-green-500" />
            {plan.ramLimit} GB de RAM
          </li>
      </ul>
    </CardContent>
    <CardFooter>
    <Link className="w-full" to= {{ 
      pathname: "/signup",
          search: `?planId=${plan.id}&billingCycle=${plan.billingCycle}`
        }}>
      <Button className="w-full">
          Seleccionar Plan
      </Button>
    </Link>
    </CardFooter>
  </Card>
  )
}
