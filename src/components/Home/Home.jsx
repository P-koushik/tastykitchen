import React from 'react'
import Header  from '../subcomponents/header/Header'
import Carousel from '../subcomponents/carousel/Carousel'
import Restaurent from '../subcomponents/restaurents/Restaurent'
import Footer from '../subcomponents/Footer/Footer'

const Home = () => {
  return (
    <>
        <Header/>
        <Carousel/>
        <Restaurent/>
        <Footer/>
    </>
  )
}

export default Home
