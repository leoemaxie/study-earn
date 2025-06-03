import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, BookOpenText } from 'lucide-react';

export function Navbar() {
  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#vision-mission', label: 'Our Vision' },
    { href: '#team', label: 'Team' },
    { href: '#contact', label: 'Contact Us' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <BookOpenText className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl font-bold text-primary">Study Earn</span>
        </Link>
        <nav className="hidden flex-1 items-center space-x-4 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button asChild className="hidden md:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="#download">Download App</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 p-4">
                <Link href="/" className="mb-4 flex items-center space-x-2">
                  <BookOpenText className="h-6 w-6 text-primary" />
                  <span className="font-headline text-xl font-bold text-primary">Study Earn</span>
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="#download">Download App</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
