import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React, { useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Container, Row, Col } from 'react-grid-system'
import { AuthContext } from '../../contexts/AuthContext'
import { api, apiAuth } from '../../services/api'

const Form: React.FC = () => {
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
      <Container
        fluid
        style={{
          margin: '0px 15px',
          border: '1px solid #0000009e',
          borderRadius: '15px',
          backgroundColor: '#d9d9d91c'
        }}
      >
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
              Formulário de solicitação
            </p>
          </Col>
        </Row>
        <Row align="center">
          <Col xs={12}>
            <Row style={{ justifyContent: 'center' }}>
              Aqui vai listar todas dash
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Form

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
