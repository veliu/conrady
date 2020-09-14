import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/layout'
import SEO from '../components/SEO'
import { AnimatedBox, Button } from '../elements'
import { config, useSpring, animated } from 'react-spring'
import { Link } from 'gatsby'
import { readableColor } from 'polished'

type PageProps = {
  data: {
    leistungen: {
      nodes: {
        name: string
        desc: string
      }[]
    }
  }
}

const PButton = styled(Button) <{ color: string }>`
  background: ${(props) => (props.color === 'white' ? 'black' : props.color)};
  color: ${(props) => readableColor(props.color === 'white' ? 'black' : props.color)};
`

const Area = styled.div`
  box-sizing: border-box;
  max-width: 1000px;
  margin: 0 auto;
  padding-left: 4rem;
  padding-right: 4rem;
  
  @media (max-width: ${(props) => props.theme.breakpoints[3]}) {
    padding-left: 4rem;
    padding-right: 4rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints[1]}) {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints[0]}) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
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

const Leistungen: React.FunctionComponent<PageProps> = ({ data: { leistungen } }) => {

  const categoryAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0, transform: 'translate3d(0, -30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  })
  const titleAnimation = useSpring({ config: config.slow, delay: 300, from: { opacity: 0 }, to: { opacity: 1 } })
  const descAnimation = useSpring({ config: config.slow, delay: 600, from: { opacity: 0 }, to: { opacity: 1 } })

  return (
    <Layout color="#000">
      <SEO title="Sonstige Leistungen | Conrady Gartengestaltung" />
      <PBox py={10} px={[6, 6, 8, 10]}>
        <Category style={categoryAnimation}>Gartengestaltung</Category>
        <animated.h1 style={titleAnimation}>Sonstige Leistungen</animated.h1>
        <Description style={descAnimation}>
          <div dangerouslySetInnerHTML={{ __html: "Conrady Gartengeslatung" }} />
        </Description>
      </PBox>
      <Area>
        {leistungen.nodes.map((leistung) => (
          <>
            <h4>{leistung.name}</h4>
            <span>{leistung.desc}</span>
          </>
        ))}
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

export default Leistungen

export const query = graphql`
  query Leistungen {
    leistungen: allSonstigeLeistungenYaml {
      nodes {
        name
        desc
      }
    }
  }
`
