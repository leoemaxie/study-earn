import { Button } from '@/components/ui/button';
import { Smartphone, Download } from 'lucide-react'; 
import Link from 'next/link';

const APP_DOWNLOAD_LINK = "https://drive.google.com/file/d/11GxRtbvU00gJ53pvBwrbS6wNaAFo0iGH/view?usp=drive_link";

export function DownloadButtons() {
  return (
    <section id="download" className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container text-center">
        <h2 className="mb-4 font-headline text-3xl font-bold md:text-4xl">
          Ready to Start Learning & Earning?
        </h2>
        <p className="mb-8 max-w-2xl mx-auto text-lg text-primary-foreground/80">
          Download the Study Earn app today and take the first step towards a more rewarding educational journey.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto">
            <Link href={APP_DOWNLOAD_LINK} target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-5 w-5" />
              Get on Play Store
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary-foreground/50 hover:bg-primary-foreground/10 text-primary-foreground w-full sm:w-auto">
             <Link href={APP_DOWNLOAD_LINK} target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-5 w-5" />
              Get on App Store
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
