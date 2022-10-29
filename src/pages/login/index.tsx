import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { Container, Row, Col } from 'react-grid-system'
import { Rectangle } from './style'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../contexts/AuthContext'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const { signIn, isAuthenticated } = useContext(AuthContext)
  const [checked, setChecked] = useState(false)
  async function handleSignIn(data) {
    await signIn(data)
  }

  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push(process.env.NEXT_PUBLIC_ENV_HOME)
    }
  }, [isAuthenticated])

  return (
    <>
      <Container
        fluid
        style={{
          padding: 0,
          margin: 0
        }}
      >
        <Row style={{ alignItems: 'center', margin: 0 }}>
          <Col xs={12}></Col>
        </Row>
        <Row style={{ margin: 0 }}>
          <Col xs={12}>
            <p
              style={{
                fontSize: '2rem',
                textAlign: 'center',
                marginTop: '40px',
                fontWeight: 'bold'
              }}
            >
              Bem vindo!
            </p>
          </Col>
        </Row>
        <Row justify="center" style={{ margin: 0, marginBottom: '60px' }}>
          <Image src="/assets/newUser.png" width={125} height={125}></Image>
        </Row>
        <Row style={{ margin: 0, marginTop: '10px' }}>
          <Col>
            <form onSubmit={handleSubmit(handleSignIn)}>
              {!checked && (
                <Row justify="center" style={{ marginBottom: '10px' }}>
                  <Col xs={12}>
                    <Row justify="center">Nome</Row>
                  </Col>
                  <Col>
                    <Row justify="center">
                      <input
                        {...register('nome')}
                        type="nome"
                        id="nome-address"
                        autoComplete="nome"
                        required
                        placeholder="Insira seu nome"
                        name="nome"
                      ></input>
                    </Row>
                  </Col>
                </Row>
              )}
              <Row justify="center">
                <Col xs={12}>
                  <Row justify="center">Login</Row>
                </Col>
                <Col>
                  <Row justify="center">
                    <input
                      {...register('email')}
                      type="email"
                      id="email-address"
                      name="email"
                      autoComplete="email"
                      required
                      placeholder="Insira seu email"
                    ></input>
                  </Row>
                </Col>
              </Row>

              <Row style={{ margin: 0, marginTop: '10px' }}>
                <Col xs={12}>
                  <Row justify="center">Senha</Row>
                </Col>
                <Col>
                  <Row justify="center">
                    <input
                      {...register('password')}
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      required
                      placeholder="Insira sua senha"
                    ></input>
                  </Row>
                </Col>
              </Row>
              <Row justify="center" style={{ margin: 0, marginTop: '5px' }}>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  style={{ border: 'none' }}
                  onClick={() => setChecked(!checked)}
                >
                  <div style={{ fontSize: '0.6rem' }}>
                    {checked
                      ? `
                      Primeiro acesso?`
                      : `Já possuo conta`}
                  </div>
                </Button>
              </Row>
              <Row justify="center" style={{ margin: 0, marginTop: '10px' }}>
                <Button type="submit">Acessar</Button>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Login
