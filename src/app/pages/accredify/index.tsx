{/* <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <AgencySearch />
          <div className="container mx-auto px-4 pb-8">
            <RecommendedAgencies />
            <Pagination />
          </div>
        </main>
      </div> */}



import React from "react"
import { MainLayout } from "../../modules/landing/components/layout"
import AgencySearch from "../../modules/accredify/components/AgencySearch";
import RecommendedAgencies from "../../modules/accredify/components/RecommendedAgencies";
import Pagination from "../../modules/accredify/components/Pagination";


const Accredify: React.FC = () => {
  return (
    <MainLayout>
      <AgencySearch />
          <div className="container mx-auto px-4 pb-8">
            <RecommendedAgencies />
            <Pagination/>
          </div>
    </MainLayout>
  )
}

export default Accredify;

