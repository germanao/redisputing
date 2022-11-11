import React, { useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Router from 'next/router'
import Image from 'next/image'
import { Label, WrapperContainer } from './style'
import { AuthContext } from '../../contexts/AuthContext'

const Header: React.FC = () => {
  const { isAuthenticated, user } = useContext(AuthContext)

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
                <Label onClick={() => Router.push('/home')}>Home</Label>
              </Col>
              <Col xs={12} sm={4} lg={1.15} style={{ textAlign: 'center' }}>
                <Label onClick={() => Router.push('/solicitacoes')}>
                  Solicitações
                </Label>
              </Col>
              <Col xs={12} sm={4} lg={1.15} style={{ textAlign: 'center' }}>
                <Label onClick={() => Router.push('/home')}>Ajuda</Label>
              </Col>
            </Row>
          </Col>
          <Col xs={12} sm={3}>
            <Row align={'center'} justify={'center'}>
              <Col xs={12} md={8} lg={5} style={{ justifyContent: 'center' }}>
                {isAuthenticated ? (
                  <div>{user.name}</div>
                ) : (
                  <Button variant="primary" style={{ width: '100%' }}>
                    Acessar
                  </Button>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
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
      </WrapperContainer>
    </>
  )
}

export default Header
