import { Server, Shield, Zap, Globe } from "lucide-react"

const features = [
  {
    icon: <Server className="h-8 w-8 text-blue-500" />,
    title: "Escalabilidad automática",
    description: "Nuestros servidores se adaptan automáticamente a tus necesidades de tráfico.",
  },
  {
    icon: <Shield className="h-8 w-8 text-blue-500" />,
    title: "Seguridad avanzada",
    description: "Protección contra DDoS y cifrado SSL gratuito para todas tus aplicaciones.",
  },
  {
    icon: <Zap className="h-8 w-8 text-blue-500" />,
    title: "Despliegue rápido",
    description: "Despliega tu aplicación en segundos con nuestro sistema de integración continua.",
  },
  {
    icon: <Globe className="h-8 w-8 text-blue-500" />,
    title: "CDN global",
    description: "Entrega tu contenido rápidamente en cualquier parte del mundo con nuestra CDN.",
  },
]

export default function Features() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Características principales de Ride</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
