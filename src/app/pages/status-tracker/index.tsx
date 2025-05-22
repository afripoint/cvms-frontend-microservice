      import React from "react"
      import { MainLayout } from "../../modules/landing/components/layout"
      
        import TrackingHero from "../../modules/status-tracker/components/trackingHero";
      
      
      const StatusTracker: React.FC = () => {
        return (
          <MainLayout>
            <main className="flex-1">
          <TrackingHero />
        </main>
          </MainLayout>
        )
      }
      
      export default StatusTracker;
      
      