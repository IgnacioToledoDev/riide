import { Card, CardHeader, CardFooter, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/features/_global/ui/button";

export const Payment = () => {
    const handlePayPalPayment = () => {
        // Aquí iría la lógica real para iniciar el pago con PayPal
        console.log("Iniciando pago con PayPal")
        alert("Pago simulado con éxito. En una implementación real, serías redirigido a PayPal.")
      }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
            <CardTitle>Pago con PayPal</CardTitle>
            <CardDescription>Completa tu suscripción a Ride</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="space-y-4">
                <div>
                <p className="text-lg font-semibold">Plan seleccionado: Cloud Plan</p>
                <p className="text-2xl font-bold">$25/mes</p>
                </div>
                <p className="text-sm text-muted-foreground">
                Al hacer clic en "Pagar con PayPal", serás redirigido a PayPal para completar tu pago de forma segura.
                </p>
            </div>
            </CardContent>
            <CardFooter>
            <Button onClick={handlePayPalPayment} className="w-full">
                Pagar con PayPal
            </Button>
            </CardFooter>
        </Card>
        </div>
    )
}
