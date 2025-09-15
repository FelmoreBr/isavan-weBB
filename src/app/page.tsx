import HeroSection from '@/components/HeroSection';
import ReservaSteps from '@/components/ReservaSteps';
import VehiculosSection from '@/components/VehiculosSection';
import ConciertosSection from '@/components/ConciertosSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ReservaSteps />
      <VehiculosSection />
      <ConciertosSection />
    </main>
  );
}