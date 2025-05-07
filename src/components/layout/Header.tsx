'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useTheme } from '@/providers/ThemeProvider';
import { Menu, X, Sun, Moon, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">Horizon Walls</span>
          </Link>
        </div>
        
        <nav className={`${isMenuOpen ? 'absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-800 flex flex-col gap-4' : 'hidden'} md:flex md:items-center md:gap-6`}>
          <Link href="/" className="text-sm font-medium hover:underline">Home</Link>
          <Link href="/categories" className="text-sm font-medium hover:underline">Categories</Link>
          {isAuthenticated && (
            <Link href="/favorites" className="text-sm font-medium hover:underline">Favorites</Link>
          )}
          <Link href="/about" className="text-sm font-medium hover:underline">About</Link>
          <Link href="/contact" className="text-sm font-medium hover:underline">Contact</Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link href="/search">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search size={20} />
            </Button>
          </Link>
          
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.name ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}` : ''} />
                    <AvatarFallback><User size={18} /></AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="outline" size="sm">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}