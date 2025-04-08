import React from 'react'
import IntroduceBackground from '../components/IntroduceBackground'
import LatestCompilation from '../components/LatestCompilation '
import BestChoice from '../components/BestChoice'
import OurRules from '../components/OurRules'

const Home = () => {
  return (
    <div>
      <IntroduceBackground />
      <LatestCompilation />
      <BestChoice />
      <OurRules />
    </div>
  )
}

export default Home