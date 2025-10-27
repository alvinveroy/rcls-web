import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import ImpactStats from "@/components/impact-stats"
import About from "@/components/about"
import Projects from "@/components/projects"
import Events from "@/components/events"
import History from "@/components/history"
import GetInvolved from "@/components/get-involved"
import ImpactStories from "@/components/impact-stories"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ImpactStats />
      <About />
      <Projects />
      <Events />
      <History />
      <GetInvolved />
      <ImpactStories />
      <Newsletter />
      <Footer />
    </main>
  )
}
