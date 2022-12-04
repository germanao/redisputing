interface Porte {
  id: string
  descricao: string
}

interface NaturezaJuridica {
  id: string
  descricao: string
}

interface QualificacaoDoResponsavel {
  id: number
  descricao: string
}

interface QualificacaoSocio {
  id: number
  descricao: string
}

interface Socio {
  cpf_cnpj_socio: string
  nome: string
  tipo: string
  data_entrada: string
  cpf_representante_legal: string
  nome_representante?: any
  faixa_etaria: string
  atualizado_em: Date
  pais_id: string
  qualificacao_socio: QualificacaoSocio
  qualificacao_representante?: any
}

interface AtividadesSecundaria {
  id: string
  secao: string
  divisao: string
  grupo: string
  classe: string
  subclasse: string
  descricao: string
}

interface AtividadePrincipal {
  id: string
  secao: string
  divisao: string
  grupo: string
  classe: string
  subclasse: string
  descricao: string
}

interface Pais {
  id: string
  iso2: string
  iso3: string
  nome: string
  comex_id: string
}

interface Estado {
  id: number
  nome: string
  sigla: string
  ibge_id: number
}

interface Cidade {
  id: number
  nome: string
  ibge_id: number
  siafi_id: string
}

interface Estado2 {
  id: number
  nome: string
  sigla: string
  ibge_id: number
}

interface InscricoesEstaduai {
  inscricao_estadual: string
  ativo: boolean
  atualizado_em: Date
  estado: Estado2
}
interface Estabelecimento {
  cnpj: string
  atividades_secundarias: AtividadesSecundaria[]
  cnpj_raiz: string
  cnpj_ordem: string
  cnpj_digito_verificador: string
  tipo: string
  nome_fantasia?: any
  situacao_cadastral: string
  data_situacao_cadastral: string
  data_inicio_atividade: string
  nome_cidade_exterior?: any
  tipo_logradouro: string
  logradouro: string
  numero: string
  complemento?: any
  bairro: string
  cep: string
  ddd1: string
  telefone1: string
  ddd2?: any
  telefone2?: any
  ddd_fax?: any
  fax?: any
  email: string
  situacao_especial?: any
  data_situacao_especial?: any
  atualizado_em: Date
  atividade_principal: AtividadePrincipal
  pais: Pais
  estado: Estado
  cidade: Cidade
  motivo_situacao_cadastral?: any
  inscricoes_estaduais: InscricoesEstaduai[]
}

export interface ICNPJ {
  cnpj_raiz: string
  razao_social: string
  capital_social: string
  responsavel_federativo: string
  atualizado_em: Date
  porte: Porte
  natureza_juridica: NaturezaJuridica
  qualificacao_do_responsavel: QualificacaoDoResponsavel
  socios: Socio[]
  simples?: any
  estabelecimento: Estabelecimento
}

export interface ICNPJInt {
  CNPJ: number | string
  nome: string
  ativa: string
  tipoLogradouro: string
  logradouro: string
  numero: number | string
  complemento: string
  bairro: string
  cep: string
  ddd1: string
  telefone1: string
  ddd2: string
  telefone2: string
  atividadePrincipal: string
  paisId: string | number
  paisDesc: string
  estadoId: string | number
  estadoDesc: string
  cidadeId: string | number
  cidadeDesc: string
}
