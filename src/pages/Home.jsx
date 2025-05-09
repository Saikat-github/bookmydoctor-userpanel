import React from 'react'
import { Header, SearchDoctors, SpecialityMenu } from '../components'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div className='space-y-8 sm:space-y-16'>
      <SearchDoctors />
      <Header />
      <SpecialityMenu />
    </div>
  )
}

export default Home