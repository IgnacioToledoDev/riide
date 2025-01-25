import { PricingPlan } from "./PricingPlan"



interface Plan {
  name: string,
  description: string,
  price: string,
  features: string[],
}

const plans: Plan[] = [
  {
    name: "Starter",
    price: "$9",
    description: "Perfecto para proyectos pequeños",
    features: ["1 CPU", "1GB RAM", "10GB Almacenamiento", "100GB Ancho de banda"],
  },
  {
    name: "Pro",
    price: "$29",
    description: "Ideal para aplicaciones en crecimiento",
    features: ["2 CPUs", "4GB RAM", "50GB Almacenamiento", "500GB Ancho de banda"],
  },
  {
    name: "Enterprise",
    price: "Personalizado",
    description: "Para aplicaciones a gran escala",
    features: [
      "CPUs personalizadas",
      "RAM personalizada",
      "Almacenamiento personalizado",
      "Ancho de banda personalizado",
    ],
  },
]

export default function PricingPlans() {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-12">Elige tu plan en Ride</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
            <PricingPlan />
        ))}
      </div>
    </section>
  )
}

