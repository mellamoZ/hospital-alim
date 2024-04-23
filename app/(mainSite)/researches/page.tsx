import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export default async function ResearchesPage() {
  const services = [
    {
      id: 1,
      title: "Lorem ipsum",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo perspiciatis dolorum obcaecati aspernatur laboriosam. Sequi earum error laboriosam assumenda quidem rem aliquid quaerat quos porro mollitia iure beatae, dolorum cum?",
    },
    {
      id: 2,
      title: "ipsum dolor",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo perspiciatis dolorum obcaecati aspernatur laboriosam. Sequi earum error laboriosam assumenda quidem rem aliquid quaerat quos porro mollitia iure beatae, dolorum cum?",
    },
    {
      id: 3,
      title: "consectetur adipisicing elit",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo perspiciatis dolorum obcaecati aspernatur laboriosam. Sequi earum error laboriosam assumenda quidem rem aliquid quaerat quos porro mollitia iure beatae, dolorum cum?",
    },
    {
      id: 4,
      title: "perspiciatis dolorum",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo perspiciatis dolorum obcaecati aspernatur laboriosam. Sequi earum error laboriosam assumenda quidem rem aliquid quaerat quos porro mollitia iure beatae, dolorum cum?",
    },
  ];

  return (
    <div className="my-5 flex items-center justify-center">
      <div className="max-w-screen-xl px-10">
        <h1 className="mb-5 text-3xl font-bold">Researches Made</h1>

        <div className="flex flex-col items-center gap-5">
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
