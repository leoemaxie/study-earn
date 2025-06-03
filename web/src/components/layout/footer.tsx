import { BookOpenText } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-secondary/50 py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center space-x-2">
          <BookOpenText className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg font-bold text-primary">Study Earn</span>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Study Earn. All rights reserved.
        </p>
        <div className="flex space-x-4">
          {/* Placeholder for social media icons if needed in future */}
        </div>
      </div>
    </footer>
  );
}
