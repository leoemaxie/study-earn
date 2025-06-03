import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-background to-secondary/30">
      <div className="container grid items-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-6">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
            Unlock Your Potential with <span className="text-accent">Study Earn</span>
          </h1>
          <p className="text-lg text-foreground/80 md:text-xl">
            The revolutionary app that rewards your learning journey. Dive into interactive courses, track your progress, and earn exciting rewards as you master new skills.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="#download">Get Started Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-2xl">
          <Image
            src="https://drive.google.com/uc?id=1oRh13HrvM1sXw9GkcHZQYkN0PoL_AAm3"
            alt="Study Earn App Interface"
            layout="fill"
            objectFit='fill'
            data-ai-hint="app interface education"
            className="transform transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}
