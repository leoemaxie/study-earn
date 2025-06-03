import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/landing/hero';
import { ScreenshotCarousel } from '@/components/landing/screenshot-carousel';
import { VisionMission } from '@/components/landing/vision-mission';
import { DownloadButtons } from '@/components/landing/download-buttons';
import { EnquiryForm } from '@/components/landing/enquiry-form';
import { TeamSection } from '@/components/landing/team-section';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ScreenshotCarousel />
        <VisionMission />
        <TeamSection />
        <DownloadButtons />
        <EnquiryForm />
      </main>
      <Footer />
    </div>
  );
}
