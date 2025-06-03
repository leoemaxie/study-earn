import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Linkedin, Twitter } from 'lucide-react';

const teamMembers = [
  {
    name: "Emmanuel Lafenwa",
    title: "Backend Developer",
    description: "Emmanuel is the architect behind Study Earn. He designs and builds the robust backend systems that power the application.",
    imageUrl: "https://drive.google.com/file/d/1GwX6xuqVh6zw_5spkABoRGYa8nG1Kege/view?usp=sharing",
    dataAiHint: "professional head shot",
    socials: { linkedin: "https://www.linkedin.com/emmanuel-lafenwa", twitter: "https://x.com/leoemaxie" }
  },
  {
    name: "Taiwo Amoo",
    title: "Team Lead",
    description: "Taiwo leads the team with a passion for innovation and quality, ensuring Study Earn delivers the best learning experience.",
    imageUrl: "https://placehold.co/300x300.png",
    dataAiHint: "male software developer",
    socials: { linkedin: "https://www.linkedin.com/in/amoo-taiwo-853706253", twitter: "#" }
  },
  {
    name: "Fatiha Adetola",
    title: "Frontend Developer",
    description: "Fatiha crafts the beautiful and intuitive user experience that makes Study Earn a joy to use.",
    imageUrl: "https://placehold.co/300x300.png",
    dataAiHint: "female designer creative",
    socials: { linkedin: "https://www.linkedin.com/in/fatiha-azeez-b26417243", twitter: "#" }
  },
  {
    name: "Bello Abdullahi",
    title: "ML Engineer",
    description: "Bello shapes the learning journey, developing the curriculum and content that makes Study Earn effective and engaging.",
    imageUrl: "https://placehold.co/300x300.png",
    dataAiHint: "male educator books",
    socials: { linkedin: "https://www.linkedin.com/in/bello-abdullahi-adeoye-533509257", twitter: "#" }
  },
];

export function TeamSection() {
  return (
    <section id="team" className="py-16 md:py-24 bg-secondary/30">
      <div className="container">
        <h2 className="mb-12 text-center font-headline text-3xl font-bold text-primary md:text-4xl">
          Meet Our Team
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <Card key={member.name} className="text-center shadow-lg rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-background">
              <CardHeader className="items-center pt-8">
                <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-accent mb-4 shadow-md">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    layout="fill"
                    
                    data-ai-hint={member.dataAiHint}
                  />
                </div>
                <CardTitle className="font-headline text-xl text-primary">{member.name}</CardTitle>
                <CardDescription className="text-accent font-medium">{member.title}</CardDescription>
              </CardHeader>
              <CardContent className="pb-8">
                <p className="text-sm text-foreground/70 mb-4 px-2">{member.description}</p>
                <div className="flex justify-center space-x-3">
                  {member.socials.linkedin && (
                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
