import { Button } from "../ui/button"

export default function Hero() {
  return (
    <section className="py-24 px-6 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <h1 className="text-5xl font-bold mb-6">Aloja tu aplicación con Ride</h1>
      <p className="text-xl mb-8 max-w-2xl mx-auto">
        Ride ofrece alojamiento escalable, seguro y confiable para tus aplicaciones. Despliega en minutos y enfócate en
        tu código.
      </p>
      <Button size="lg" variant="secondary">
        Get Started
      </Button>
    </section>
  )
}

