import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React, { useContext, useEffect } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import { AuthContext } from '../../contexts/AuthContext'
import { api, apiAuth } from '../../services/api'

const Home: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext)

  const router = useRouter()

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push('/login')
  //   }
  // }, [isAuthenticated, router])

  return (
    <>
      <Container fluid style={{ padding: 0, margin: 0 }}>
        <Row style={{ alignItems: 'center' }}>
          <Col xs={12}>
            <Image
              src={'/assets/handshake.png'}
              width={'2000'}
              height={'255px'}
              layout={'intrinsic'}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <p
              style={{
                fontSize: '2rem',
                textAlign: 'center',
                marginTop: '40px',
                fontWeight: 'bold'
              }}
            >
              Resolução de disputas online
            </p>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home

export const getServersideProps: GetServerSideProps = async ctx => {
  const { ['redisputing.token']: token } = parseCookies(ctx)

  console.log(token)
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
