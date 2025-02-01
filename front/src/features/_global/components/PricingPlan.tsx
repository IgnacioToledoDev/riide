import { Check } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Plan {
    name: string,
    description: string,
    price: string,
    features: string[],
}

export const PricingPlan = (plan: Plan) => {
  return (
    <Card key={plan.name} className="flex flex-col">
    <CardHeader>
      <CardTitle>{plan.name}</CardTitle>
      <CardDescription>{plan.description}</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-3xl font-bold mb-4">
        {plan.price}
        <span className="text-sm font-normal">/mes</span>
      </p>
      <ul className="space-y-2">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center">
            <Check className="mr-2 h-4 w-4 text-green-500" />
            {feature}
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter>
      <Button className="w-full">
        <a href="/register">
          Seleccionar Plan
        </a>
      </Button>
    </CardFooter>
  </Card>
  )
}
