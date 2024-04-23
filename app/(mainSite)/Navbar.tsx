"use client";
import { ChevronDown, LogIn } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import AlgoliaSearchInput from "./AlgoliaSearchInput";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: session }: any = useSession();
  const pathname = usePathname();
  const navLinks = [
    {
      label: "Who We Are",
      subLinks: [
        { label: "About Us", link: "/about" },
        { label: "Departments", link: "/departments" },
        { label: "Doctors", link: "/doctors" },
        { label: "Wards", link: "/wards" },
      ],
    },
    {
      label: "what we do",
      subLinks: [
        { label: "Services", link: "/services" },
        { label: "Researches", link: "/researches" },
      ],
    },
    {
      label: "News",
      subLinks: [
        { label: "General", link: "/news/general" },
        { label: "Clinical", link: "/news/clinical" },
      ],
    },
  ];
  return (
    <header className="flex h-14 items-center bg-brand-primary px-4 py-2 text-white lg:px-6">
      <div className="flex gap-5">
        <Link className="flex items-center justify-center" href="/">
          <Image
            src="/white-logo.png"
            alt="Hospital Logo"
            width={180}
            height={180}
          />
          <span className="sr-only">Hospital</span>
        </Link>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="flex w-64 cursor-pointer items-center justify-start rounded-md border-[#355c92] bg-brand-primary hover:bg-[#2c4b77] hover:text-white"
              variant="outline"
            >
              <span className="ml-2">Search ...</span>
            </Button>
          </DialogTrigger>
          <AlgoliaSearchInput setDialogOpen={setDialogOpen} />
        </Dialog>
      </div>

      <nav className="ml-auto flex items-center justify-center gap-0 text-white md:gap-2">
        <Menubar className="border-none bg-brand-primary">
          {navLinks.map((nav) => (
            <MenubarMenu key={nav.label}>
              <MenubarTrigger className="flex cursor-pointer items-center justify-center px-1 text-xs font-medium capitalize underline-offset-4 outline-none hover:underline sm:text-sm md:text-base">
                {nav.label}
                <ChevronDown
                  className="relative top-[1px] h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180 md:ml-1"
                  aria-hidden="true"
                />
              </MenubarTrigger>
              <MenubarContent className="border-[#355c92] bg-brand-primary text-white">
                {nav.subLinks.map((subLink) => (
                  <Link key={subLink.link} href={subLink.link}>
                    <MenubarItem key={subLink.label} className="cursor-pointer">
                      {subLink.label}
                    </MenubarItem>
                  </Link>
                ))}
              </MenubarContent>
            </MenubarMenu>
          ))}
        </Menubar>
        <Link
          href="/feedback"
          className="px-1 text-xs font-medium capitalize underline-offset-4 hover:underline sm:text-sm md:text-base"
        >
          Feedback
        </Link>
        <Link
          href="/donate"
          className="px-1 text-xs font-medium capitalize underline-offset-4 hover:underline sm:text-sm md:text-base"
        >
          Donate
        </Link>
        {pathname !== "/" && pathname !== "/book-an-appointment" ? (
          <Link href="/book-an-appointment" className="hidden md:block">
            <Button className="bg-white p-2 text-sm font-medium capitalize text-brand-primary hover:bg-white/90">
              book an appointment
            </Button>
          </Link>
        ) : null}
        {session && (
          <Link
            className="flex gap-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            href="/dashboard/users"
          >
            <h1>Dashboard</h1>
            <LogIn />
          </Link>
        )}
      </nav>
    </header>
  );
}
