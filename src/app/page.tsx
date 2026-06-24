import HomeIntro from "@/components/HomeIntro";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseCatalog from "@/components/CourseCatalog";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HomeIntro />
        <CourseCatalog />
      </main>
      <Footer />
    </>
  );
}
