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
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

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
              {/* Aqui vai listar todas dash */}
              <Col
                xs={12}
                style={{
                  border: '1px solid #7272720f',
                  minHeight: '20vh',
                  borderRadius: '30px',
                  flexBasis: '80%',
                  paddingBottom: '15px'
                  // flexBasis: '85%'
                }}
              >
                <Row style={{ margin: 0, padding: 0 }}>
                  <Col
                    xs={1}
                    style={{
                      background: 'yellow',
                      margin: 0,
                      padding: 0,
                      minHeight: '5vh',
                      width: 'auto',
                      marginTop: '15px',
                      border: '1px solid black'
                    }}
                  ></Col>
                  <Col
                    xs={11}
                    style={{
                      border: '1px solid #727272',
                      margin: '0',
                      minHeight: '5vh',
                      width: 'auto',
                      marginTop: '15px',
                      padding: '15px 15px 15px 30px'
                    }}
                  >
                    <Row>ID: 31412</Row>
                    <Row>Instituição: Mercado Livre</Row>
                    <Row>Aquisição: 25/12/2021</Row>
                    <Row>Negociação: 06/02/2022</Row>
                    <Row>Negociação: 06/02/2022</Row>
                    <Row>Negociação: 06/02/2022</Row>
                    <Row>Negociação: 06/02/2022</Row>
                    <Row></Row>
                  </Col>
                </Row>
                <Row style={{ margin: 0, padding: 0 }}>
                  <Col
                    xs={1}
                    style={{
                      background: '#00ff37',
                      margin: 0,
                      padding: 0,
                      minHeight: '5vh',
                      width: 'auto',
                      marginTop: '15px',
                      border: '1px solid black'
                    }}
                  ></Col>
                  <Col
                    xs={11}
                    style={{
                      border: '1px solid #727272',
                      margin: '0',
                      minHeight: '5vh',
                      width: 'auto',
                      marginTop: '15px',
                      padding: '15px 15px 15px 30px'
                    }}
                  >
                    <Row>ID: 31412</Row>
                    <Row>Instituição: Mercado Livre</Row>
                    <Row>Aquisição: 25/12/2021</Row>
                    <Row>Negociação: 06/02/2022</Row>
                    <Row>Negociação: 06/02/2022</Row>
                    <Row>Negociação: 06/02/2022</Row>
                    <Row>Negociação: 06/02/2022</Row>
                    <Row></Row>
                  </Col>
                </Row>
                <Row style={{ margin: 0, padding: 0 }}>
                  <Col
                    xs={1}
                    style={{
                      background: '#1b9128f5',
                      margin: 0,
                      padding: 0,
                      minHeight: '5vh',
                      width: 'auto',
                      marginTop: '15px',
                      border: '1px solid black'
                    }}
                  ></Col>
                  <Col
                    xs={11}
                    style={{
                      border: '1px solid #727272',
                      margin: '0',
                      minHeight: '5vh',
                      width: 'auto',
                      marginTop: '15px',
                      padding: '15px 15px 15px 30px'
                    }}
                  >
                    <Row>ID: 31412</Row>
                    <Row>Instituição: Mercado Livre</Row>
                    <Row>Aquisição: 25/12/2021</Row>
                    <Row>Negociação: 06/02/2022</Row>
                    <Row>Negociação: 06/02/2022</Row>
                    <Row>Negociação: 06/02/2022</Row>
                    <Row>Negociação: 06/02/2022</Row>
                    <Row></Row>
                  </Col>
                </Row>
                <Row style={{ margin: 0, padding: 0 }}>
                  <Col
                    xs={1}
                    style={{
                      background: '#ff1700',
                      margin: 0,
                      padding: 0,
                      minHeight: '5vh',
                      width: 'auto',
                      marginTop: '15px',
                      border: '1px solid black'
                    }}
                  ></Col>
                  <Col
                    xs={11}
                    style={{
                      border: '1px solid #727272',
                      margin: '0',
                      minHeight: '5vh',
                      width: 'auto',
                      marginTop: '15px',
                      padding: '15px 15px 15px 30px'
                    }}
                  >
                    <Row>ID: 31412</Row>
                    <Row>Instituição: Mercado Livre</Row>
                    <Row>Aquisição: 25/12/2021</Row>
                    <Row>Negociação: 06/02/2022</Row>
                    <Row>Negociação: 06/02/2022</Row>
                    <Row>Negociação: 06/02/2022</Row>
                    <Row>Negociação: 06/02/2022</Row>
                    <Row></Row>
                  </Col>
                </Row>
                <Row style={{ margin: 0, padding: 0 }}>
                  <Col
                    xs={1}
                    style={{
                      background: '#00ff37',
                      margin: 0,
                      padding: 0,
                      minHeight: '5vh',
                      width: 'auto',
                      marginTop: '15px',
                      border: '1px solid black'
                    }}
                  ></Col>
                  <Col
                    xs={11}
                    style={{
                      border: '1px solid #727272',
                      margin: '0',
                      minHeight: '5vh',
                      width: 'auto',
                      marginTop: '15px',
                      padding: '15px 15px 15px 30px'
                    }}
                  >
                    <Row>ID: 31412</Row>
                    <Row>Instituição: Mercado Livre</Row>
                    <Row>Aquisição: 25/12/2021</Row>
                    <Row>Negociação: 06/02/2022</Row>
                    <Row>Negociação: 06/02/2022</Row>
                    <Row>Negociação: 06/02/2022</Row>
                    <Row>Negociação: 06/02/2022</Row>
                    <Row></Row>
                  </Col>
                </Row>
              </Col>
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
