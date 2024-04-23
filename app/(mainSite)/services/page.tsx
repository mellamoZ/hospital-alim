import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export default async function ServicesPage() {
  const services = [
    {
      id: 1,
      title: "blook bank",
      description:
        "Our hospital has a well-equipped blood bank with all blood types readily available. We maintain the highest standards of safety and cleanliness in our blood bank.",
    },
    {
      id: 2,
      title: "ambulance",
      description:
        "Our ambulance service is available 24/7 to transport patients to and from our hospital. Our ambulances are equipped with all necessary medical equipment and staffed by trained professionals.",
    },
    {
      id: 3,
      title: "Kidney dialysis",
      description:
        "Kidney dialysis is a service offered by hospitals to patients suffering from kidney failure. It involves the use of a machine to filter the patient blood removing waste products and excess fluids that would normally be eliminated by the kidneys",
    },
    {
      id: 4,
      title: "cancer treatment",
      description:
        "Cancer treatment is a vital service provided by hospitals to patients diagnosed with cancer. The service includes a wide range of medical interventions, such as chemotherapy, radiation therapy, surgery, and immunotherapy.",
    },
  ];

  return (
    <div className="my-6 flex items-center justify-center">
      <div className="max-w-screen-2xl px-10">
        <h1 className="mb-5 text-3xl font-bold">Our Services</h1>
        <div className="grid grid-cols-2 justify-center gap-5">
          {services.map((service) => (
            <Card
              key={service.id}
              className="px-10 py-6 delay-75 duration-150 hover:bg-gray-100"
            >
              <CardContent className="p-4">
                <CardTitle className="mb-3">{service.title}</CardTitle>

                <CardDescription className="mt-4 text-sm text-gray-800 dark:text-gray-400">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
