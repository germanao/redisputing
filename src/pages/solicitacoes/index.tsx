import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Container, Row, Col } from 'react-grid-system'
import { AuthContext } from '../../contexts/AuthContext'
import { api, apiAuth } from '../../services/api'
import { ICNPJInt, ISolic } from '../../interfaces'
import { List } from './list/list'

import { FiEye } from 'react-icons/fi'

interface IDashCard extends ISolic, ICNPJInt {}

const Dashboard: React.FC = () => {
  const { isAuthenticated, user } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [erro, setError] = useState(false)
  const [solics, setSolics] = useState<IDashCard[]>([] as IDashCard[])
  const [supplier, setSupplier] = useState<ICNPJInt>({} as ICNPJInt)

  const router = useRouter()
  const returnStatusDesc = useCallback((status: string) => {
    switch (status) {
      case 'AF':
        return 'Aguardando fornecedor'
      case 'As':
        return 'Aguardando solicitante'
      case 'Fs':
        return 'Finalizada com sucesso'
      case 'Fp':
        return 'Finalizada com pendência jurídica'
      case 'Ss':
        return 'Finalizada sem solução'
    }
  }, [])

  const returnProblemDesc = useCallback((kindOfProblem: number) => {
    switch (kindOfProblem) {
      case 1:
        return 'Dívida ativa'
      case 2:
        return 'Inadimplência'
    }
  }, [])

  const returnRankingDesc = useCallback((ranking: number) => {
    switch (ranking) {
      case 1:
        return 'Bens e consumo'
      case 2:
        return 'Serviços'
    }
  }, [])

  const returnSubjectDesc = useCallback((subject: number) => {
    switch (subject) {
      case 1:
        return 'Renegociação de produtos e serviços'
      case 2:
        return 'Renegociação da dívida'
    }
  }, [])
  useEffect(() => {
    console.log(isAuthenticated)
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const fetchCNPJ = useCallback(async (cnpj: string) => {
    const responseCNPJ = await api.get<ICNPJInt>(`/api/registerClient/${cnpj}`)
    return responseCNPJ.data[0]
  }, [])

  const fetchSolics = useCallback(async () => {
    if (isAuthenticated) {
      setIsLoading(true)
      try {
        const response = await api.get<ISolic[]>(`/api/solic/${user?.email}`)

        const supplier = await fetchCNPJ(response.data[0].supplier)

        const newObject = response.data.map(solic => {
          return {
            ...solic,
            ...supplier
          }
        })
        setSolics(newObject)

        console.log(response)
      } catch (err) {
        setError(err.response?.data)
      }
      setIsLoading(false)
    }
  }, [fetchCNPJ, isAuthenticated, user?.email])

  useEffect(() => {
    fetchSolics()
  }, [fetchSolics])

  useEffect(() => {
    console.log(solics)
  }, [solics])

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
                <>
                  {solics.map((solic, index) => (
                    <Row key={index} style={{ margin: 0, padding: 0 }}>
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
                          padding: '15px 15px 15px 35px'
                        }}
                      >
                        <Row
                          style={{
                            margin: 0,
                            justifyContent: 'flex-end'
                          }}
                        >
                          <Button
                            onClick={() =>
                              router.push(`/solicitacao/${solic.id}`)
                            }
                            style={{
                              fontSize: '25px',
                              padding: '1px 5px 1px 5px'
                            }}
                          >
                            <FiEye />
                          </Button>
                        </Row>
                        <Row>ID: {solic.id}</Row>
                        <Row>Instituição: {solic.nome}</Row>
                        <Row>CNPJ: {solic.CNPJ}</Row>
                        <Row>
                          Data de abertura:{' '}
                          {new Date(solic?.creationDate).toLocaleDateString()}
                        </Row>
                        <Row>
                          Classificação: {returnRankingDesc(solic.ranking)}{' '}
                          {'->'} {returnSubjectDesc(1)} {'->'}{' '}
                          {returnProblemDesc(solic.kindOfProblem)}
                        </Row>
                        <Row></Row>
                      </Col>
                    </Row>
                  ))}
                </>

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
