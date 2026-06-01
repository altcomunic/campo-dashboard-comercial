export type Mes = 'JAN' | 'FEV' | 'MAR' | 'ABR' | 'MAI'

export interface VendaGerada {
  mes: Mes
  venda: number
  faturado: number
}

export interface MetaMensal {
  mes: Mes
  meta: number
  realizado: number
  volume: number
  valor: number
}

export interface CarteiraMensal {
  mes: Mes
  ativos: number
  novos: number
  reativados: number
  perdas: number
  retencao: number
}

export interface MixMensal {
  mes: Mes
  MIN: number
  NCP: number
  PE: number
  RA: number
}

export interface Vendedor {
  id: string
  nome: string
  funcao: string
  tempo: string
  perfil: string
  destaque: string
  retencao: string
  evolucaoCarteira: string
  perdas: string
  resumo: string
  vendaGerada: VendaGerada[]
  dados: MetaMensal[]
  carteira: CarteiraMensal[]
  mix: MixMensal[]
  analises: string[]
  diagnosticoDesenvolvimento: string
  planoAcaoMedioPrazo: string[]
  pontosFortes: string[]
  desenvolvimento: string[]
}
