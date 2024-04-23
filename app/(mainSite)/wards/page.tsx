import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import { getWards } from "@/lib/db/wardCrud";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function WardsPage() {
  const wards = await getWards();

  const default_image =
    "https://dummyimage.com/600x500/5e005e/84fafa.png&text=photo";
  return (
    <div className="my-10 flex items-center justify-center">
      <div className="flex max-w-screen-xl flex-col justify-center gap-5 px-10">
        {wards.map((ward) => (
          <Dialog key={ward.ward_id}>
            <DialogTrigger>
              <Card className="px-10 py-6 delay-75 duration-150 hover:bg-gray-100">
                <CardContent className="p-4">
                  <CardTitle className="mb-3">{ward.ward_name}</CardTitle>

                  <CardDescription className="mt-4 text-sm text-gray-800 dark:text-gray-400">
                    {`${ward.description} Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Veniam ipsam deleniti harum maxime laborum, repellat quasi
                    quibusdam placeat deserunt ullam labore quisquam debitis saepe
                    molestiae. Iste quos reprehenderit id repudiandae voluptatibus
                    deserunt. Veritatis, placeat corporis.`}
                  </CardDescription>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-screen-lg">
              <DialogHeader>
                <DialogTitle>{ward.ward_name}</DialogTitle>
              </DialogHeader>
              {/* <div> */}

              <Image
                src={default_image}
                alt={ward.ward_name}
                className="h-[500px] w-full"
                sizes="700"
                width="800"
                height="500"
              />

              {/* </div> */}
              <DialogDescription>
                <ScrollArea className="h-[200px] w-full rounded-md border p-1">
                  {`${ward.description} Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Veniam ipsam deleniti harum maxime laborum, repellat quasi
                  quibusdam placeat deserunt ullam labore quisquam debitis saepe
                  molestiae. Iste quos reprehenderit id repudiandae voluptatibus
                  deserunt. Veritatis, placeat corporis.`}
                </ScrollArea>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
