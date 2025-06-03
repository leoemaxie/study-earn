import { Eye, Target } from 'lucide-react';

export function VisionMission() {
  return (
    <section id="vision-mission" className="py-16 md:py-24 bg-secondary/30">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-4 p-8 bg-background rounded-xl shadow-xl transform transition-all hover:scale-105">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-full bg-accent/20">
                <Eye className="h-8 w-8 text-accent" />
              </div>
              <h2 className="font-headline text-3xl font-bold text-primary">Our Vision</h2>
            </div>
            <p className="text-foreground/80 leading-relaxed">
              To create a world where learning is not just a necessity but a rewarding experience for everyone. We envision a future where education is accessible, engaging, and directly translates into tangible benefits for learners.
            </p>
          </div>
          <div className="space-y-4 p-8 bg-background rounded-xl shadow-xl transform transition-all hover:scale-105">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-full bg-accent/20">
                <Target className="h-8 w-8 text-accent" />
              </div>
              <h2 className="font-headline text-3xl font-bold text-primary">Our Mission</h2>
            </div>
            <p className="text-foreground/80 leading-relaxed">
              To empower individuals by transforming education through an innovative platform that incentivizes learning. We strive to provide high-quality educational content and a motivating reward system that encourages continuous personal and professional development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
