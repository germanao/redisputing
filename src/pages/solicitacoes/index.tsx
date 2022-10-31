import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React, { useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Container, Row, Col } from 'react-grid-system'
import { AuthContext } from '../../contexts/AuthContext'
import { api, apiAuth } from '../../services/api'

const Dashboard: React.FC = () => {
  const { isAuthenticated, user } = useContext(AuthContext)

  const router = useRouter()

  // TODO: Descomentar ao final do desenvolvimento
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push('/login')
  //   }
  // }, [isAuthenticated, router])

  return (
    <>
      <Container fluid style={{ padding: 0, margin: 0 }}>
        <Row style={{ marginRight: 0 }}>
          <Col xs={12}>
            <p
              style={{
                fontSize: '1.6rem',
                textAlign: 'center',
                marginTop: '40px',
                fontWeight: 'bold'
              }}
            >
              Dashboard de solicitações
            </p>
          </Col>
        </Row>
        <Row align="center" style={{ marginRight: 0 }}>
          <Col xs={12}>
            <Row
              style={{
                justifyContent: 'flex-end',
                marginRight: '4vh',
                marginBottom: '30px'
              }}
            >
              <Button onClick={() => router.push('/solicitacao')}>
                + Incluir solicitação
              </Button>
            </Row>
            <Row style={{ justifyContent: 'center' }}>
              Aqui vai listar todas dash
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Dashboard

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
