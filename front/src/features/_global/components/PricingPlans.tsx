import { PricingPlan } from "./PricingPlan";
import { useQuery } from "react-query";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface Plan {
  id: number;
  name: string;
  description: string;
  price: string;
  billingCycle: string;
  isPopular: boolean;
  storageLimit: number;
  bandwidthLimit: number;
  ramLimit: number;
}

export default function PricingPlans() {
  const [isAnnual, setIsAnnual] = useState(false);
  const plans: Plan[] = [];
  const { isLoading, error, data } = useQuery("plans", async () => {
    // todo change this to get the URL from a env variable
    const response = await fetch("http://127.0.0.1:8000/api/plan/all");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });

  if (isLoading) return <div>Loading...</div>; // TODO pending change this fot a spinner

  if (error) return <div>Error: {error?.message}</div>; // TODO pending change this for a error component

  data.data.plans.map((plan: Plan) => {
    // TODO change this to adapt to diferrent billing cycles
    if (plan.billingCycle === "monthly") {
      plans.push(plan);
    }
  });

  return (
    <section className="py-24 px-6 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-12">
        Elige tu plan en Ride
      </h2>
      <div className="flex justify-center items-center space-x-4 mb-12">
        <Label htmlFor="billing-cycle" className="text-sm font-medium">
          Facturación Mensual
        </Label>
        <Switch
          id="billing-cycle"
          checked={isAnnual}
          onCheckedChange={setIsAnnual}
        />
        <Label htmlFor="billing-cycle" className="text-sm font-medium">
          Facturación Anual
        </Label>
        {isAnnual && (
          <Badge variant="secondary" className="ml-2">
            Ahorra hasta 15%
          </Badge>
        )}
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto pt-4">
        {plans.map((plan) => (
          <PricingPlan key={plan.id} {...plan} />
        ))}
      </div>
    </section>
  );
}
