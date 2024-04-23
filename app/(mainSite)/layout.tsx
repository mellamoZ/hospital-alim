import Link from "next/link";
import Navbar from "./Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div key="1" className="flex min-h-screen flex-col">
      <Navbar />
      <div className="text-center">{children}</div>

      <footer className="bg-brand-primary mt-10 w-full py-6 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl/none">
                Sheikh Hassan Yabare Hospital
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-400 dark:text-gray-400 md:text-lg">
                9Q4P+87X, Jijiga, Ethiopia
              </p>
            </div>
            <div className="space-x-4">
              <Link
                className="text-sm font-medium underline-offset-4 hover:underline"
                href="#"
              >
                Privacy Policy
              </Link>
              <Link
                className="text-sm font-medium underline-offset-4 hover:underline"
                href="#"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
