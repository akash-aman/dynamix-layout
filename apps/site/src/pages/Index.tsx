import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import DemoSection from "@/components/DemoSection";
import InstallationSection from "@/components/InstallationSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        <HeroSection />
        
        <section id="features">
          <FeaturesSection />
        </section>
        
        <section id="demo">
          <DemoSection />
        </section>
        
        <section id="installation">
          <InstallationSection />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
