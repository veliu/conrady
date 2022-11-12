import React from 'react'
import Layout from "../components/layout"
import { ArenguForm } from "gatsby-plugin-arengu-forms"
import SEO from '../components/SEO'
import { config, useSpring, animated } from 'react-spring'
import { AnimatedBox } from '../elements'
import styled from 'styled-components'

const PBox = styled(AnimatedBox)`
  max-width: 1000px;
  margin: 0 auto;
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

export default function angebot() {
    const categoryAnimation = useSpring({
        config: config.slow,
        from: { opacity: 0, transform: 'translate3d(0, -30px, 0)' },
        to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    })

    const titleAnimation = useSpring({ config: config.slow, delay: 300, from: { opacity: 0 }, to: { opacity: 1 } })
    const descAnimation = useSpring({ config: config.slow, delay: 600, from: { opacity: 0 }, to: { opacity: 1 } })

    return (
        <Layout>
            <SEO />
            <PBox py={10} px={[6, 6, 8, 10]}>
                <Category style={categoryAnimation}>Conrady Gartengestaltung</Category>
                <animated.h1 style={titleAnimation}>Angebotsanfrage</animated.h1>
                <Description style={descAnimation}>
                    <div dangerouslySetInnerHTML={{ __html: "Hier erhalten Sie ein unverbindliches Angebot" }} />
                    <div>
                        Damit wir vor dem ersten Gespräch schon einen kleinen Überblick über Ihre Wünsche und Anliegen bekommen, 
                        füllen Sie bitte das unten folgende Formular aus. Ein Mitarbeiter aus dem jeweiligen Fachbereich setzt 
                        sich dann zeitnah mit Ihnen in Verbindung.
                    </div>
                </Description>
            </PBox>
            <PBox py={10} px={[6, 6, 8, 10]}>
                <ArenguForm id="166774413746737620" />
            </PBox>
        </Layout>
    )
}