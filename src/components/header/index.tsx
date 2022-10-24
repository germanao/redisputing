import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

import Image from 'next/image'
import { Label, WrapperContainer } from './style'

const Header: React.FC = () => {
  return (
    <>
      <WrapperContainer
        fluid
        style={{
          background: '#FFFF',
          minHeight: '70px',
          justifyItems: 'center'
        }}
      >
        <Row
          style={{
            alignItems: 'center',
            minHeight: '70px',
            justifyContent: 'center'
          }}
        >
          <Col xs={12} sm={3}>
            <Row style={{ alignItems: 'center' }} align={'center'}>
              <Col xs={3}>
                <Image
                  layout={'fixed'}
                  src={'/assets/logo.png'}
                  width={45}
                  height={45}
                />
              </Col>
              <Col style={{ textAlign: 'start' }}>Redisputing</Col>
            </Row>
          </Col>
          <Col xs={12} sm={6}>
            <Row style={{ justifyContent: 'center' }}>
              <Col xs={12} sm={4} lg={1.15} style={{ textAlign: 'center' }}>
                <Label>Home</Label>
              </Col>
              <Col xs={12} sm={4} lg={1.15} style={{ textAlign: 'center' }}>
                <Label>Solicitações</Label>
              </Col>
              <Col xs={12} sm={4} lg={1.15} style={{ textAlign: 'center' }}>
                <Label>Ajuda</Label>
              </Col>
            </Row>
          </Col>
          <Col xs={12} sm={3}>
            <Row align={'center'} justify={'center'}>
              <Col xs={12} md={8} lg={5} style={{ justifyContent: 'center' }}>
                <Button variant="primary" style={{ width: '100%' }}>
                  Acessar
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </WrapperContainer>
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

export default Header
