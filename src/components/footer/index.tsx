import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

import Image from 'next/image'
// import { } from './style'

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        bottom: 0,
        // position: 'fixed',
        left: 0,
        width: '100%',
        marginTop: '40px'
      }}
    >
      <Container style={{ alignSelf: 'end' }}>
        <Row style={{ padding: 0, margin: 0 }}>
          <div
            style={{
              minWidth: '100%',
              alignItems: 'center',
              height: '0',
              border: '1px solid #9e9e9e',
              margin: '20px 0'
            }}
          />
        </Row>
        <Row justify={'inherit'} align={'center'}>
          <Col>
            <Row>
              <Col>
                <Image src={'/assets/logo.png'} width={45} height={45} />
              </Col>
              <Col>Redisputing</Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col xs={6} sm={3}>
                <Image
                  src={'/assets/facebook.png'}
                  width={30}
                  height={30}
                  layout={'fixed'}
                />
              </Col>
              <Col xs={6} sm={3}>
                <Image
                  src={'/assets/instagram.png'}
                  width={30}
                  height={30}
                  layout={'fixed'}
                />
              </Col>
              <Col xs={6} sm={3}>
                <Image
                  src={'/assets/linkedin.png'}
                  width={30}
                  height={30}
                  layout={'fixed'}
                />
              </Col>
              <Col xs={6} sm={3}>
                <Image
                  src={'/assets/twitter.png'}
                  width={30}
                  height={30}
                  layout={'fixed'}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} lg={4} md={12} style={{ marginTop: '2vh' }}>
                Política de privacidade
              </Col>
              <Col xs={12} sm={12} lg={4} md={12} style={{ marginTop: '2vh' }}>
                Termos e condições
              </Col>
              <Col xs={12} sm={12} lg={4} md={12} style={{ marginTop: '2vh' }}>
                Ajuda
              </Col>
            </Row>
            <Row>
              <Col style={{ marginTop: '2vh' }}>
                {' '}
                2022 Todos os diretos reservados.
              </Col>
            </Row>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </footer>
  )
}
