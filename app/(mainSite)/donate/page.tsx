import Image from "next/image";
import React from "react";

export default function DonatePage() {
  const accounts = [
    {
      name: "hello cash",
      img: "/donation-images/hello-cash.png",
      number: "2830524",
    },
    { name: "ebirr", img: "/donation-images/ebirr.png", number: "809999" },
    { name: "sahay", img: "/donation-images/sahay.png", number: "976973" },
    { name: "cbe", img: "/donation-images/cbe.png", number: "1000326891766" },

    {
      name: "dahabshiil",
      img: "/donation-images/dahabshiil.png",
      number: "WJLD3834",
    },
    {
      name: "sahal micro finance",
      img: "/donation-images/sahal-micro-finance.png",
      number: "1100515",
    },
  ];
  return (
    <div className="">
      <div className="relative h-[500px] overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={"/donation-images/all-donation-accounts.jpg"}
            alt="all donation accounts"
            sizes="600"
            width={600}
            height={600}
            className="h-full w-full object-cover"
          />
          {/* Black overlay */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        {/* Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
          <h1 className="text-3xl font-bold md:text-5xl">
            MAKE DONATION TO OUR DIALYSIS CENTER
          </h1>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center justify-center gap-8 px-10">
        <h1 className="mb-3 text-3xl font-bold">
          YOUR DONATION CAN SAVE LIVES
        </h1>
        <h3 className="max-w-screen-lg text-lg">
          Your donation can make a difference in the lives of our patients. Help
          us provide world-class healthcare to everyone who needs it.
        </h3>
        <div className="grid gap-5 gap-y-20 px-10 md:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account) => (
            <div
              className="flex flex-col items-center justify-center gap-3"
              key={account.number}
            >
              <h2 className="text-3xl text-gray-800">{account.name}</h2>
              <Image
                src={account.img}
                alt={account.name}
                className=""
                width={300}
                height={300}
              />
              <h3 className="text-2xl font-bold">{account.number}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
