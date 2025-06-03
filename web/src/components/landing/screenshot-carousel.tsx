"use client";

import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const screenshots = [
  { src: "https://drive.google.com/uc?id=15MO0TCK2V944Ipia97rf5hGpV8wPwpWW", alt: "App Screenshot 1", hint: "mobile app" },
  { src: "https://drive.google.com/uc?id=1ejG9CqqD4kIEUozudukx5cNOPrU6OPrD", alt: "App Screenshot 2", hint: "dashboard analytics" },
  { src: "https://drive.google.com/uc?id=11b218d3a94Kwlg7c2xjX0GY5tdXqsQtO", alt: "App Screenshot 3", hint: "user profile" },
  { src: "https://drive.google.com/uc?id=1ejG9CqqD4kIEUozudukx5cNOPrU6OPrD", alt: "App Screenshot 4", hint: "learning module" },
  { src: "https://drive.google.com/uc?id=1GLj2Ory85-JMzRKhtOtNx43WJ264FXec", alt: "App Screenshot 5", hint: "rewards screen" },
];

export function ScreenshotCarousel() {
  return (
    <section id="features" className="py-16 md:py-24 bg-background">
      <div className="container">
        <h2 className="mb-12 text-center font-headline text-3xl font-bold text-primary md:text-4xl">
          App in Action
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay(
              
              { stopOnInteraction: false }),
          ]}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {screenshots.map((screenshot, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden shadow-lg rounded-lg">
                    <CardContent className="flex aspect-video items-center justify-center p-0">
                      <Image
                        src={screenshot.src}
                        alt={screenshot.alt}
                        width={800}
                        height={800}
                        className="object-contain w-full h-full"
                        data-ai-hint={screenshot.hint}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-[-10px] sm:ml-[-20px] md:ml-[-50px] text-primary bg-background/70 hover:bg-background" />
          <CarouselNext className="mr-[-10px] sm:mr-[-20px] md:mr-[-50px] text-primary bg-background/70 hover:bg-background" />
        </Carousel>
      </div>
    </section>
  );
}
