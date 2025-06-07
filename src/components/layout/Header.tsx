"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Home, Grid, Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// Play Store Icon Component
const PlayStoreIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path
      fill="#4285F4"
      d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5Z"
    />
    <path
      fill="#34A853"
      d="M16.81,15.12L6.05,21.34C5.79,21.5 5.50,21.57 5.21,21.57C4.60,21.57 4.03,21.26 3.84,21.85L13.69,12L16.81,15.12Z"
    />
    <path
      fill="#FBBC04"
      d="M20.16,10.85C20.16,10.85 20.16,10.85 20.16,10.85L17.93,9.22L13.69,12L17.93,14.78L20.16,13.15C20.69,12.87 21,12.26 21,11.5C21,10.74 20.69,10.13 20.16,10.85Z"
    />
    <path
      fill="#EA4335"
      d="M13.69,12L3.84,2.15C4.03,1.74 4.60,1.43 5.21,1.43C5.50,1.43 5.79,1.50 6.05,1.66L16.81,8.88L13.69,12Z"
    />
  </svg>
);

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Categories", href: "/categories", icon: Grid },
    { name: "Favorites", href: "/favorites", icon: Heart },
    { name: "Search", href: "/search", icon: Search },
    { name: "Download App", href: "/android", icon: PlayStoreIcon },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold header-title font-tan-mon transition-colors duration-300">
            Horizon Walls
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary ${
                  item.name === "Download App"
                    ? "bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-md"
                    : ""
                }`}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}

          {/* Theme Toggle for Desktop */}
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Theme Toggle for Mobile */}
          <ThemeToggle />

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-3 text-lg font-medium transition-colors hover:text-primary ${
                        item.name === "Download App"
                          ? "bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-md"
                          : ""
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon size={20} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
