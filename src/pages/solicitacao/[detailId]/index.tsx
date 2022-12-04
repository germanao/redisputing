import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { Container, Row, Col } from 'react-grid-system'
import { AuthContext } from '../../../contexts/AuthContext'
import { Divider } from './styles'

const SolicDetail: React.FC = () => {
  const { isAuthenticated, user } = useContext(AuthContext)

  const router = useRouter()
  const { detailId } = router.query
  console.log(router.query)

  // TODO: Descomentar ao final do desenvolvimento
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push('/login')
  //   }
  // }, [isAuthenticated, router])

  return (
    <>
      <Container fluid style={{ padding: 0, margin: 0 }}>
        <Row style={{ margin: 0 }}>
          <Col>
            <Row style={{ padding: 0, margin: 0 }}>
              ID da solicitação: {detailId}
            </Row>
            <Row style={{ padding: 0, margin: 0 }}>Status:</Row>
          </Col>
        </Row>
        <Row style={{ padding: 0, margin: 0, justifyContent: 'center' }}>
          <div
            style={{
              minWidth: '87%',
              alignItems: 'center',
              height: '0',
              border: '1px solid #9e9e9e63',
              margin: '20px 0'
            }}
          />
        </Row>
        <Row style={{ margin: 0 }}>
          <Col>
            <Row style={{ padding: 0, margin: 0 }}>Fornecedor:</Row>
            <Row style={{ padding: 0, margin: 0 }}>CNPJ:</Row>
            <Row style={{ padding: 0, margin: 0 }}>Telefone:</Row>
            <Row style={{ padding: 0, margin: 0 }}>Endereço:</Row>
          </Col>
        </Row>
        <Row style={{ padding: 0, margin: 0, justifyContent: 'center' }}>
          <div
            style={{
              minWidth: '87%',
              alignItems: 'center',
              height: '0',
              border: '1px solid #9e9e9e63',
              margin: '20px 0'
            }}
          />
        </Row>
        <Row style={{ margin: 0 }}>
          <Col>
            <Row style={{ padding: 0, margin: 0 }}>Classificação:</Row>
          </Col>
        </Row>
        <Row style={{ margin: 0 }}>
          <Col>
            <Row style={{ padding: 0, margin: 0 }}>Data da ocorrência:</Row>
            <Row style={{ padding: 0, margin: 0 }}>Data de abertura:</Row>
          </Col>
        </Row>
        <Row style={{ padding: 0, margin: 0, justifyContent: 'center' }}>
          <div
            style={{
              minWidth: '87%',
              alignItems: 'center',
              height: '0',
              border: '1px solid #9e9e9e63',
              margin: '20px 0'
            }}
          />
        </Row>
        <Row style={{ margin: 0 }}>
          <Col>
            <Row
              style={{
                padding: 0,
                margin: 0,
                justifyContent: 'center'
              }}
            >
              Chat
            </Row>
            <Row
              style={{
                padding: 0,
                margin: 0,
                justifyContent: 'flex-end'
              }}
            >
              <Row
                style={{
                  padding: 0,
                  margin: 0,
                  border: 'black solid 0.5px',
                  minHeight: '270px',
                  width: '100%'
                }}
              ></Row>
              <Row
                style={{
                  padding: 0,
                  margin: 0,
                  marginTop: '15px'
                }}
              >
                <Button>Enviar mensagem</Button>
              </Row>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default SolicDetail

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
