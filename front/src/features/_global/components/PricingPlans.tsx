import { PricingPlan } from "./PricingPlan";
import { useQuery } from "react-query";

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
  const plans: Plan[] = [];
  const { isLoading, error, data } = useQuery("plans", async () => {
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
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <PricingPlan key={plan.id} {...plan} />
        ))}
      </div>
    </section>
  );
}
