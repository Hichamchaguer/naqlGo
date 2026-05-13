// Converted from tanstack router to Next.js App Router page
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Paths } from "@/components/site/Paths";
import { Stats } from "@/components/site/Stats";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";

// Head/meta should be handled by Next.js metadata or <Head> in the page/layout.

// Export page component as default for Next.js App Router
export default Index;

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Paths />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
