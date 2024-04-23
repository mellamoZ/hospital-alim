import Link from "next/link";
import { FolderKanban } from "lucide-react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 dark:bg-gray-800/40 lg:block">
        <div className="flex flex-col gap-2">
          <div className="flex h-[60px] items-center px-6">
            <Link
              className="flex items-center gap-2 font-semibold"
              href="/dashboard"
            >
              <FolderKanban className="h-6 w-6" />
              <span className="">SHY H.</span>
            </Link>
          </div>
          <Sidebar />
        </div>
      </div>
      <div className="flex flex-col">
        <Navbar />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          {children}
        </main>
        <Toaster />
      </div>
    </div>
  );
}
