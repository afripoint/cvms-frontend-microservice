import type React from "react"
import { HeroSection } from "../../modules/landing/components/hero"
import { Dashboard, FeatureSection } from "../../modules/landing/components/dashboard"
import { Benefits } from "../../modules/landing/components/benefits"
import { ContactContainer } from "../../modules/landing/components/contacts"
import { MainLayout } from "../../modules/landing/components/layout"


const Home: React.FC = () => {
  return (
    <MainLayout>
      <HeroSection />
      <Dashboard />
      <FeatureSection />
      <Benefits />
      <ContactContainer />
    </MainLayout>
  )
}

export default Home

