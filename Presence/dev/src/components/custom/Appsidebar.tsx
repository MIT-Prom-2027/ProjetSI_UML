"use client";

import { LineChart, BarChart3, Home, CircleAlert } from "lucide-react";
import { Sidebar, SidebarContent } from "../ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/Usercontext";
interface NavItemInterface {
  title: string;
  icon: React.ElementType;
  href: string;
}

const AppSidebar = () => {
  const { user, setUser } = useContext(UserContext);
  const pathname = usePathname();
  const [navItems, setNavItems] = useState<NavItemInterface[]>([]);

  const NavItemsEtudiant: NavItemInterface[] = [
    { title: "Historique", icon: Home, href: "/home" },
    { title: "Faire presence", icon: LineChart, href: "/presence" },
  ];

  const NavItemsDelegue: NavItemInterface[] = [
    { title: "Historique", icon: Home, href: "/home" },
    { title: "Faire presence", icon: LineChart, href: "/presence" },
    { title: "Rapport", icon: BarChart3, href: "/rapport" },
  ];

  const NavItemsProf: NavItemInterface[] = [
    { title: "Historique", icon: Home, href: "/home" },
    {
      title: "Validation presence",
      icon: CircleAlert,
      href: "/valid-presence",
    },
    { title: "Rapport", icon: BarChart3, href: "/rapport" },
  ];

  useEffect(() => {
    if (!user) {
      const newuser = localStorage.getItem("user");
      if (newuser) {
        setUser(JSON.parse(newuser));
      }
    }
  }, []);
  useEffect(() => {
    if (!user?.role) return;

    switch (user.role) {
      case "Etudiant":
        setNavItems(NavItemsEtudiant);
        break;
      case "Delegue":
        setNavItems(NavItemsDelegue);
        break;
      case "Enseignant":
        setNavItems(NavItemsProf);
        break;
      default:
        setNavItems([]);
    }
  }, [user?.role]);

  return (
    <Sidebar className="mt-[70px]">
      <SidebarContent className="px-2">
        <div className="space-y-1 py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all",
                    isActive
                      ? "bg-blue-900 text-finance-accent text-white"
                      : "text-muted-foreground hover:bg-gray-500 hover:text-accent"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
