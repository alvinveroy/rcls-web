import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import ImpactStats from "@/components/impact-stats"
import About from "@/components/about"
import Projects from "@/components/projects"
import Events from "@/components/events"
import LatestUpdates from "@/components/impact-stories"
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
      <LatestUpdates />
      <Footer />
    </main>
  )
}
