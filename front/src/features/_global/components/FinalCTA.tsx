import { Button } from "../ui/button"

export default function FinalCTA() {
  return (
    <section className="py-24 px-6 bg-blue-600 text-white text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">¿Listo para llevar tu aplicación al siguiente nivel con Ride?</h2>
        <p className="text-xl mb-8">
          Únete a miles de desarrolladores que confían en Ride para alojar sus aplicaciones.
        </p>
        <Button size="lg" variant="secondary">
          Comienza gratis
        </Button>
      </div>
    </section>
  )
}

