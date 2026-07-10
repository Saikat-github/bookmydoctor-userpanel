import React from 'react'
import { HeroSection, SpecialitySection, SearchBar } from '../../components'

const Home = () => {
  return (
    <div className='space-y-8 sm:space-y-16'>
      <SearchBar />
      <HeroSection />
      <SpecialitySection />
    </div>
  )
}

export default Home