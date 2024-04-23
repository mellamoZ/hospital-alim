"use client";

import { Baby, HandHelping, HeartPulse } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main className="flex-1">
        <section
          className="relative w-full bg-cover bg-center py-12 md:py-24 lg:py-32 xl:py-48"
          style={{ backgroundImage: `url('shy-hospital.jpeg')` }}
        >
          <div className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-black opacity-50" />
          <div className="container px-4 md:px-6">
            <div className="relative z-40 flex flex-col items-center space-y-4 text-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Largest Specialized Hospital and Medical School in Somali
                  Regional State
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 dark:text-gray-400 md:text-xl">
                  Sheik Hassen Yabare Comperhensive Specialized Hospital
                  provides broad primary and secondary care services to the
                  community
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md bg-gray-100 px-4 py-3 text-lg font-medium text-gray-800 shadow transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="/book-an-appointment"
                >
                  Book an Appointment
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* about the hospital section */}
        <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  About Our Hospital
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  We are a leading healthcare provider in the region, offering a
                  wide range of services from primary care to specialized
                  treatments. Our team of experienced doctors and nurses are
                  dedicated to providing the highest level of care to our
                  patients. We believe in treating each patient with compassion,
                  respect, and dignity. Our state-of-the-art facilities and
                  cutting-edge technologies ensure that we can provide the best
                  possible care to our patients.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* facebook posts section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Our Latest News
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Stay updated with our latest news and events.
                </p>
              </div>
              <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
                <div className="h-60 w-full" />
                <div className="h-60 w-full" />
                <div className="h-60 w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* departments section */}
        <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <HeartPulse className="h-12 w-12" />
                <h2 className="text-2xl font-bold tracking-tighter">
                  Cardiology
                </h2>
                <p className="mx-auto max-w-[200px] text-gray-500 dark:text-gray-400 md:text-lg">
                  Comprehensive heart care from prevention to complex
                  intervention.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Baby className="h-12 w-12" />
                <h2 className="text-2xl font-bold tracking-tighter">
                  Pediatrics
                </h2>
                <p className="mx-auto max-w-[200px] text-gray-500 dark:text-gray-400 md:text-lg">
                  Specialized care for your child from birth through
                  adolescence.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <HandHelping className="h-12 w-12" />
                <h2 className="text-2xl font-bold tracking-tighter">
                  Emergency Care
                </h2>
                <p className="mx-auto max-w-[200px] text-gray-500 dark:text-gray-400 md:text-lg">
                  24/7 emergency care with short wait times and expert staff.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* donate section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Donate
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Your donation can make a difference in the lives of our
                  patients. Help us provide world-class healthcare to everyone
                  who needs it.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="/donate"
                >
                  Donate Now
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
