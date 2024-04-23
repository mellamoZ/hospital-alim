"use client";

import {
  UsersRound,
  Building,
  ClipboardPlus,
  Ambulance,
  LineChart,
  Newspaper,
  CalendarRange,
  MessageCircleMore,
} from "lucide-react";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Sidebar() {
  const [userRole, setUserRole] = useState<string | null>(null); // Assuming userRole is a string

  const pathname = usePathname();

  const { data: session }: any = useSession();
  useEffect(() => {
    // Update userRole when session changes
    if (session && session.user && session.user.role) {
      setUserRole(session.user.role);
    } else {
      setUserRole(null);
    }
  }, [session]);

  const navItems = [
    {
      label: "analytics",
      link: "/dashboard/analytics",
      icon: <LineChart className="h-4 w-4" />,
      role: ["admin"],
    },
    {
      label: "users",
      link: "/dashboard/users",
      icon: <UsersRound className="h-4 w-4" />,
      role: ["admin"],
    },
    {
      label: "departments",
      link: "/dashboard/departments",
      icon: <Building className="h-4 w-4" />,
      role: ["admin"],
    },
    {
      label: "doctors",
      link: "/dashboard/doctors",
      icon: <ClipboardPlus className="h-4 w-4" />,
      role: ["admin", "department_manager"],
    },
    {
      label: "wards",
      link: "/dashboard/wards",
      icon: <Ambulance className="h-4 w-4" />,
      role: ["admin", "department_manager"],
    },
    {
      label: "appointments",
      link: "/dashboard/appointments",
      icon: <CalendarRange className="h-4 w-4" />,
      role: ["admin", "appointment_manager"],
    },
    {
      label: "News",
      link: "/dashboard/news",
      icon: <Newspaper className="h-4 w-4" />,
      role: ["admin", "department_manager"],
    },

    {
      label: "feedbacks",
      link: "/dashboard/feedback",
      icon: <MessageCircleMore className="h-4 w-4" />,
      role: ["admin", "department_manager"],
    },
  ];
  return (
    <nav className="grid items-start px-4 text-sm font-medium">
      {navItems.map(
        (item) =>
          item.role?.includes(userRole || "") && (
            <Link
              key={item.link}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 capitalize text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50",
                pathname === item.link && "bg-gray-200"
              )}
              href={item.link}
            >
              {item.icon}
              {item.label}
            </Link>
          )
      )}
    </nav>
  );
}
