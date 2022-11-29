import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Container, Row, Col } from 'react-grid-system'
import { AuthContext } from '../../contexts/AuthContext'
import { api, apiAuth, apiCNPJ } from '../../services/api'
import Form from 'react-bootstrap/Form'
import { useForm } from 'react-hook-form'
import Modal from 'react-bootstrap/Modal'
import { ICNPJ } from '../../interfaces'

interface IFormData {
  formBasicEmail: string
}

interface IFormCNPJ {
  basicCNPJ?: string
  supplier?: string
}

interface IError {
  errorStatus?: number
  errorType: string
  errorDescription: string
}

const FormComponent: React.FC = () => {
  const { isAuthenticated, user } = useContext(AuthContext)
  const [CNPJ, setCNPJ] = useState<ICNPJ>(null)
  const [error, setError] = useState<IError>(null)
  const [CNPJInput, setCNPJInput] = useState<string>(null)
  const [isLoadingCNPJ, setIsLoadingCNPJ] = useState<boolean>(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  // TODO: Descomentar ao final do desenvolvimento
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push('/login')
  //   }
  // }, [isAuthenticated, router])

  const onSubmit = async (data: IFormData) => {
    console.log(data)
    handleShow()
  }

  const handleSubmitCNPJ = async (data: IFormCNPJ) => {
    setError(null)
    console.log(data)
    await fetchCNPJ(data.supplier)
  }

  const fetchCNPJ = useCallback(
    async (cnpj: string) => {
      if (cnpj.length !== 14 || !cnpj) {
        setError({ errorType: 'CNPJ', errorDescription: 'CNPJ inválido' })
        return
      }
      setIsLoadingCNPJ(true)
      try {
        const response = await apiCNPJ.get<ICNPJ>(`/${cnpj}`)
        console.log(response.data)
        setCNPJ(response.data)
      } catch (err) {
        console.log(err)
        setError({
          errorType: err.response.data.titulo,
          errorDescription: err.response.data.detalhes
        })
      }
      setIsLoadingCNPJ(false)
    },
    [setCNPJ]
  )

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    console.log(CNPJ)
  }, [CNPJ])

  useEffect(() => {
    console.log(error)
  }, [error])

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Consultar empresa</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body></Modal.Body> */}
        <Modal.Body>
          <Container>
            <Row style={{ marginRight: 0 }}>
              <Col>
                <Form onSubmit={handleSubmit(handleSubmitCNPJ)}>
                  <Form.Group controlId="basicCNPJ">
                    <Form.Label>Informe o CNPJ do fornecedor</Form.Label>
                    <Form.Text>(Sem pontuação, somente números)</Form.Text>
                    <Form.Control
                      {...register('supplier')}
                      type="number"
                      placeholder="Pesquisar por CNPJ/CPF sem pontuação"
                      style={{ marginTop: '15px' }}
                      onFocus={() => setError(null)}
                      onChange={e => setCNPJInput(e.target.value)}
                    />
                    {error && (
                      <Row
                        style={{
                          marginLeft: 0,
                          marginRight: 0,
                          marginTop: '15px',
                          padding: '5px 15px',
                          fontSize: '0.75rem',
                          color: 'red',
                          backgroundColor: 'rgba(105,105,105,0.04)'
                        }}
                      >
                        <div>
                          {error.errorType}: {error.errorDescription}
                        </div>
                      </Row>
                    )}

                    {CNPJ && (
                      <Row
                        style={{
                          marginLeft: 0,
                          marginRight: 0,
                          marginTop: '15px',
                          padding: '5px 15px',
                          fontSize: '0.75rem',
                          backgroundColor: 'rgba(105,105,105,0.04)'
                        }}
                      >
                        <Col xs={12}>
                          <Row>{CNPJ.razao_social}</Row>
                          <Row style={{ marginTop: '4px' }}>
                            Telefone: {CNPJ.estabelecimento.telefone1}
                          </Row>
                          <Row style={{ marginTop: '4px' }}>
                            {CNPJ.estabelecimento.atividade_principal.descricao}
                          </Row>

                          <Row style={{ marginTop: '4px' }}>
                            {CNPJ.estabelecimento.cep} -{' '}
                            {CNPJ.estabelecimento.cidade.nome} -{' '}
                            {CNPJ.estabelecimento.estado.nome} -{' '}
                            {CNPJ.estabelecimento.estado.sigla}
                          </Row>
                        </Col>
                      </Row>
                    )}
                    <Row
                      style={{
                        justifyContent: 'end',
                        marginRight: 0,
                        marginTop: '15px'
                      }}
                    >
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={CNPJInput?.length !== 14 || isLoadingCNPJ}
                      >
                        Consultar
                      </Button>
                    </Row>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

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
        <Row style={{ marginRight: 0 }}>
          <Col xs={12}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Col xs={12}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Informe o fornecedor</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Pesquisar por CNPJ/CPF sem pontuação"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} style={{ marginTop: '15px' }}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Classificação</Form.Label>
                  <Form.Select
                    {...register('ranking')}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '.375rem 2.25rem .375rem .75rem',
                      // -moz-padding-start: calc('.75rem - 3px')
                      fontSize: '1rem',
                      fontWeight: '400',
                      lineHeight: '1.5',
                      color: '#212529',
                      backgroundColor: '#fff',
                      // backgroundImage: url(
                      //   "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3E%3C/svg%3E"
                      // ),
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right .75rem center',
                      backgroundSize: '16px 12px',
                      border: ' 1px solid #ced4da',
                      borderRadius: '.375rem',
                      transition:
                        'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
                      // -webkit-appearance: 'none'
                      appearance: 'none'
                    }}
                  >
                    <option>Selecione uma opção...</option>
                    <option value="1">Bens e consumo</option>
                    <option value="2">Serviços</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} style={{ marginTop: '15px' }}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Assunto</Form.Label>
                  <Form.Select
                    {...register('subject')}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '.375rem 2.25rem .375rem .75rem',
                      // -moz-padding-start: calc('.75rem - 3px')
                      fontSize: '1rem',
                      fontWeight: '400',
                      lineHeight: '1.5',
                      color: '#212529',
                      backgroundColor: '#fff',
                      // backgroundImage: url(
                      //   "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3E%3C/svg%3E"
                      // ),
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right .75rem center',
                      backgroundSize: '16px 12px',
                      border: ' 1px solid #ced4da',
                      borderRadius: '.375rem',
                      transition:
                        'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
                      // -webkit-appearance: 'none'
                      appearance: 'none'
                    }}
                  >
                    <option>Selecione uma opção...</option>
                    <option value="1">
                      Renegociação de produtos/ serviços
                    </option>
                    <option value="2">Renegociação da dívida</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} style={{ marginTop: '15px' }}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Tipo de problema</Form.Label>
                  <Form.Select
                    {...register('kindOfProblem')}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '.375rem 2.25rem .375rem .75rem',
                      // -moz-padding-start: calc('.75rem - 3px')
                      fontSize: '1rem',
                      fontWeight: '400',
                      lineHeight: '1.5',
                      color: '#212529',
                      backgroundColor: '#fff',
                      // backgroundImage: url(
                      //   "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3E%3C/svg%3E"
                      // ),
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right .75rem center',
                      backgroundSize: '16px 12px',
                      border: ' 1px solid #ced4da',
                      borderRadius: '.375rem',
                      transition:
                        'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
                      // -webkit-appearance: 'none'
                      appearance: 'none'
                    }}
                  >
                    <option>Selecione uma opção...</option>
                    <option value="1">Dívida ativa</option>
                    <option value="2">Inadimplência</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col
                style={{ marginTop: '15px', marginBottom: '15px' }}
                xs={12}
                md={4}
              >
                <Button variant="primary" type="submit" disabled={false}>
                  Enviar solicitação
                </Button>
              </Col>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default FormComponent

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
