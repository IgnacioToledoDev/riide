import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "¿Qué tipos de aplicaciones puedo alojar en Ride?",
    answer:
      "Ride te permite alojar una amplia variedad de aplicaciones, incluyendo aplicaciones web, APIs, microservicios y aplicaciones serverless.",
  },
  {
    question: "¿Cómo se maneja la escalabilidad?",
    answer:
      "Nuestra plataforma escala automáticamente tus aplicaciones según la demanda, asegurando un rendimiento óptimo en todo momento.",
  },
  {
    question: "¿Ofrecen soporte técnico?",
    answer:
      "Sí, ofrecemos soporte técnico 24/7 para todos nuestros clientes, con tiempos de respuesta garantizados según el plan elegido.",
  },
  {
    question: "¿Puedo usar mi propio dominio?",
    answer: "Absolutamente. Puedes usar tu propio dominio y configurarlo fácilmente en nuestra plataforma.",
  },
  {
    question: "¿Cómo se manejan los backups?",
    answer:
      "Realizamos backups automáticos diarios de todas las aplicaciones y datos, y los mantenemos durante 30 días.",
  },
]

export default function FAQ() {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Preguntas frecuentes sobre Ride</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

