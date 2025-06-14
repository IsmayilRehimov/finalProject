import React from 'react'
import Slide from '../../components/slide/Slide'
import CatCard from '../../components/catCard/CatCard'
import {cards,projects} from '../../data'
import ProjectCard from '../../components/projectCard/projectCard'
import Featured from './components/featured/Featured'
import TrustedBy from './components/trustedBy/TrustedBy'
import Features from './components/features/Features'
import Explore from './components/explore/Explore'
import FeaturesDark from './components/featuresDark/FeaturesDark'

const Home = () => {
  return (
    <div>
      <Featured/>
      <TrustedBy/>
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} item={card} /> 
        ))}
      </Slide>
      <Features/>
      <Explore/>
      <FeaturesDark/>
      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((card) => (
          <ProjectCard key={card.id} item={card} /> 
        ))}
      </Slide>
    </div>
  )
}

export default Home