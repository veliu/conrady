import React from 'react'
import Layout from "../components/layout"
import { graphql } from 'gatsby'
import { ChildImageSharp } from '../types'
import SEO from '../components/SEO'
import styled from 'styled-components'
import { readableColor } from 'polished'
import { config, useSpring, animated } from 'react-spring'
import { AnimatedBox, Button } from '../elements'
import Img from 'gatsby-image'
import { Link } from 'gatsby'

type PageProps = {
  data: {
    aboutUs: ChildImageSharp
  }
}

const Area = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-gap: 1rem;
  padding-left: 4rem;
  padding-right: 4rem;
  margin: 0 auto;
  max-width: 1000px;
  grid-template-columns: repeat(2, 1fr);
  
  grid-template-areas: 'text adrian';

  @media (max-width: ${(props) => props.theme.breakpoints[3]}) {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints[1]}) {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints[0]}) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    grid-template-columns: 1fr;

    grid-template-areas:
      'adrian'
      'text';
  }
`
const Category = styled(AnimatedBox)`
  letter-spacing: 0.05em;
  font-size: ${(props) => props.theme.fontSizes[1]};
  text-transform: uppercase;
`

const Description = styled(animated.div)`
  max-width: 960px;
  letter-spacing: -0.003em;
  --baseline-multiplier: 0.179;
  --x-height-multiplier: 0.35;
  line-height: 1.58;
`

const PBox = styled(AnimatedBox)`
  max-width: 1000px;
  margin: 0 auto;
`

const PButton = styled(Button) <{ color: string }>`
  background: ${(props) => (props.color === 'white' ? 'black' : props.color)};
  color: ${(props) => readableColor(props.color === 'white' ? 'black' : props.color)};
`

const Adrian = styled.div`
  img {
    width: 100%;
   }
  grid-area: adrian;
`
const Text = styled.div`
  padding-right: 1rem;
  grid-area: text;
`

const Ueber: React.FunctionComponent<PageProps> = ({ data: { aboutUs } }) => {
  const categoryAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0, transform: 'translate3d(0, -30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  })

  const titleAnimation = useSpring({ config: config.slow, delay: 300, from: { opacity: 0 }, to: { opacity: 1 } })
  const descAnimation = useSpring({ config: config.slow, delay: 600, from: { opacity: 0 }, to: { opacity: 1 } })

  return (
    <Layout color="black">
      <SEO />
      <PBox py={10} px={[6, 6, 8, 10]}>
        <Category style={categoryAnimation}>Über uns</Category>
        <animated.h1 style={titleAnimation}>Conrady Gartengeslatung</animated.h1>
        <Description style={descAnimation}>
          <div dangerouslySetInnerHTML={{ __html: "Das sind wir" }} />
        </Description>
      </PBox>
      <Area>
        <Text>
          <span>
            Nachdem ich 2007 meine Ausbildung zum Gärtner abgeschlossen habe, arbeitete ich in den verschiedensten Bereichen
            des Gartenbaus. 2016 gründete ich die Firma Conrady Gartengestaltung, die mittlerweile aus einem eingespieltem,
            fünfköpfigem Team besteht und schon viele Gartenbesitzer glücklich gemacht hat.
          </span>
          <p> 
            Lassen auch Sie sich kostenlos von uns beraten und profitieren Sie von unserer jahrelangen Erfahrung. 
            Wir gestalten Ihre Außenanlage individuell nach Ihren Vorstellungen und schaffen Ihnen Ihre persönliche Oase für Zuhause.
          </p>
        </Text>
        <Adrian>
          <Img alt="Über uns" key={aboutUs.childImageSharp.fluid.src} fluid={aboutUs.childImageSharp.fluid} />
        </Adrian>
      </Area>
      <PBox style={{ textAlign: 'center' }} py={10} px={[6, 6, 8, 10]}>
        <h2>Wir helfen Ihnen bei Ihrem Garten-Projekt</h2>
        <Link to="/kontakt" >
          <PButton color="#4b7c2f" py={4} px={8}>
            Kontaktieren Sie uns!
          </PButton>
        </Link>
      </PBox>
    </Layout>
  )
}

export default Ueber;

export const query = graphql`
  query Ueber {
    aboutUs: file(sourceInstanceName: { eq: "images" }, name: { eq: "about-us-2" }) {
        childImageSharp {
          fluid(quality: 95, maxWidth: 800) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
`

