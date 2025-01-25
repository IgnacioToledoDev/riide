import { ArrowRight } from "lucide-react"

const steps = [
  {
    title: "Conecta tu repositorio",
    description: "Vincula tu repositorio de GitHub, GitLab o Bitbucket con nuestra plataforma.",
  },
  {
    title: "Configura tu aplicación",
    description: "Especifica la configuración de tu aplicación y los recursos necesarios.",
  },
  {
    title: "Despliega",
    description: "Con un solo clic, despliega tu aplicación en nuestra infraestructura global.",
  },
  {
    title: "Escala y monitorea",
    description: "Observa el rendimiento de tu aplicación y escala según sea necesario.",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Cómo funciona Ride</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              {index < steps.length - 1 && <ArrowRight className="h-6 w-6 text-blue-500 mt-4 hidden lg:block" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}