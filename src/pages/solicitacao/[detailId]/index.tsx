import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Container, Row, Col } from 'react-grid-system'
import { AuthContext } from '../../../contexts/AuthContext'
import { ICNPJInt, ISolic } from '../../../interfaces'
import { api } from '../../../services/api'

const SolicDetail: React.FC = () => {
  const { isAuthenticated, user } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [erro, setError] = useState(false)
  const [solic, setSolic] = useState<ISolic>({} as ISolic)
  const [supplier, setSupplier] = useState<ICNPJInt>({} as ICNPJInt)

  const router = useRouter()
  const { detailId } = router.query

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const fetchCNPJ = useCallback(async (cnpj: string) => {
    setIsLoading(true)
    const responseCNPJ = await api.get<ICNPJInt>(`/api/registerClient/${cnpj}`)
    setSupplier(responseCNPJ.data[0])
    setIsLoading(false)
  }, [])

  const fetchSolic = useCallback(
    async (id: string | string[]) => {
      if (isAuthenticated) {
        setIsLoading(true)
        try {
          const response = await api.get<ISolic[]>(`/api/solic/${user?.email}`)

          setSolic(response.data.find(solic => solic.id === Number(id)))
          await fetchCNPJ(
            response.data.find(solic => solic.id === Number(id))?.supplier
          )
        } catch (err) {
          setError(err.response.data)
        }
        setIsLoading(false)
      }
    },
    [fetchCNPJ, isAuthenticated, user?.email]
  )

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
      default:
        return 'Status não encontrado'
    }
  }, [])

  const returnProblemDesc = useCallback((kindOfProblem: number) => {
    switch (kindOfProblem) {
      case 1:
        return 'Dívida ativa'
      case 2:
        return 'Inadimplência'
      default:
        return 'Problema não encontrado'
    }
  }, [])

  const returnRankingDesc = useCallback((ranking: number) => {
    switch (ranking) {
      case 1:
        return 'Bens e consumo'
      case 2:
        return 'Serviços'
      default:
        return 'Não encontrado'
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
    if (detailId) {
      fetchSolic(detailId)
    }
  }, [detailId, fetchSolic])

  return (
    <>
      <Container fluid style={{ padding: 0, margin: 0 }}>
        <Row style={{ margin: 0 }}>
          <Col>
            <Row style={{ padding: 0, margin: 0 }}>
              ID da solicitação: {detailId}
            </Row>
            <Row style={{ padding: 0, margin: 0 }}>
              Status: {returnStatusDesc(solic?.status)}
            </Row>
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
            <Row style={{ padding: 0, margin: 0 }}>
              Fornecedor: {supplier?.nome}
            </Row>
            <Row style={{ padding: 0, margin: 0 }}>CNPJ: {solic?.supplier}</Row>
            <Row style={{ padding: 0, margin: 0 }}>
              Telefone: ({supplier?.ddd1}) - {supplier?.telefone1}
            </Row>
            <Row style={{ padding: 0, margin: 0 }}>
              Endereço: {supplier?.cep} - {supplier?.cidadeDesc} -{' '}
              {supplier?.estadoDesc}
            </Row>
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
            <Row style={{ padding: 0, margin: 0 }}>
              Classificação: {returnRankingDesc(solic?.ranking)} {'->'}{' '}
              {returnSubjectDesc(solic?.subject)} {'->'}{' '}
              {returnProblemDesc(solic?.kindOfProblem)}
            </Row>
          </Col>
        </Row>
        <Row style={{ margin: 0 }}>
          <Col>
            <Row style={{ padding: 0, margin: 0 }}>
              <p>
                Data de abertura:{' '}
                {new Date(solic?.creationDate).toLocaleDateString()}
              </p>
            </Row>
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
