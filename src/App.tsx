import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { AutoClarity } from './components/AutoClarity'
import { DecisionLab } from './components/DecisionLab'
import { Services } from './components/Services'
import { TechStack } from './components/TechStack'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { MouseGlow } from './components/shared/Background'

export default function App() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#050505]">
      <MouseGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <AutoClarity />
        <DecisionLab />
        <Services />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
