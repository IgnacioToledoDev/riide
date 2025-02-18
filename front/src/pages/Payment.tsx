import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/features/_global/ui/button";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import { CreditCard, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loading } from "@/features/_global/components/Loading";
import NavbarOnlyHome from "@/features/_global/components/NavbarOnlyHome";

// TODO: Reemplazar con tu propio client ID
const initialOptions = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture",
};

export const Payment = () => {
  const [selectedPlan, setSelectedPlan] = useState("Basic");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [isProcessing, setIsProcessing] = useState(false);
  const searchParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    const planFromUrl = searchParams.get("plan");
    if (planFromUrl) {
      setSelectedPlan(planFromUrl);
    }
  }, [searchParams]);
  const price = billingCycle === "monthly" ? "9.99" : "99.99";

  const handleCardPayment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsProcessing(true);
    // Simular procesamiento de pago
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    alert("Pago con tarjeta procesado con éxito!");
  };

  const handlePayPalPayment = async (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: price.toString(),
          },
        },
      ],
    });
  };

  const onPayPalApprove = async (data: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
      alert(
        "Pago con PayPal procesado con éxito! ID de transacción: " + details.id
      );
    });
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <NavbarOnlyHome />
        <div className="max-w-3xl mx-auto pt-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Completar suscripción
              </CardTitle>
              <CardDescription>
                Estás a un paso de impulsar tu aplicación con Ride
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Resumen del plan</h3>
                <p className="text-lg font-medium">{selectedPlan}</p>
                <p className="text-3xl font-bold mt-2">
                  ${price}
                  <span className="text-base font-normal">
                    /{billingCycle === "monthly" ? "mes" : "año"}
                  </span>
                </p>
                <RadioGroup
                  defaultValue={billingCycle}
                  onValueChange={setBillingCycle}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly">Mensual</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="annual" id="annual" />
                    <Label htmlFor="annual">Anual (2 meses gratis)</Label>
                  </div>
                </RadioGroup>
                {/* <ul className="mt-4 space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul> */}
              </div>
              <Tabs defaultValue="card">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="card">Tarjeta de Crédito</TabsTrigger>
                  <TabsTrigger value="paypal">PayPal</TabsTrigger>
                </TabsList>
                <TabsContent value="card">
                  <form onSubmit={handleCardPayment} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Número de tarjeta</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Fecha de expiración</Label>
                        <Input id="expiry" placeholder="MM / YY" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" required />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loading className="mr-2" />
                          Procesando...
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Pagar ${price}
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="paypal">
                  <PayPalButtons
                    createOrder={handlePayPalPayment}
                    onApprove={onPayPalApprove}
                    style={{ layout: "vertical" }}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="justify-center">
              <p className="text-sm text-muted-foreground flex items-center">
                <Shield className="mr-2 h-4 w-4" />
                Pago seguro con encriptación de 256 bits
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};
