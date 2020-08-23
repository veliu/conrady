import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { config, animated, useSpring } from 'react-spring'
import Layout from '../components/layout'
import GridItem from '../components/grid-item'
import SEO from '../components/SEO'
import { ChildImageSharp } from '../types'

type PageProps = {
  data: {
    leistungen: {
      nodes: {
        title: string
        slug: string
        cover: ChildImageSharp
      }[]
    }
  }
}

const Area = styled(animated.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 50vw;

  @media (max-width: ${(props) => props.theme.breakpoints[2]}) {
    grid-template-columns: 1fr;
    grid-auto-rows: 60vw;
  }
`

const Leistungen: React.FunctionComponent<PageProps> = ({ data: { leistungen } }) => {
  const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  return (
    <Layout color="#000">
      <SEO title="Leistungen | Conrady Gartengestaltung" />
      <Area style={pageAnimation}>
        {leistungen.nodes.map((leistung) => (
          <GridItem key={leistung.slug} to={leistung.slug} aria-label={`Leistungen "${leistung.title}"`}>
            <Img fluid={leistung.cover.childImageSharp.fluid} />
            <span>{leistung.title}</span>
          </GridItem>
        ))}
      </Area>
    </Layout>
  )
}

export default Leistungen

export const query = graphql`
  query Leistungen {
    leistungen: allProjectsYaml {
      nodes {
        title
        slug
        cover {
          childImageSharp {
            fluid(quality: 95, maxWidth: 1200) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
