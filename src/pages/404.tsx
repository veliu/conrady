import React from 'react'
import Layout from "../components/layout"
import { Link } from 'gatsby'

export default function fourOfour() {
  return (
    <Layout>
      <div style={{ padding: '2rem' }}>
        <h2>Seite nicht gefunden</h2>
        <Link to="/">Zurück</Link>
      </div>
    </Layout>
  )
}
