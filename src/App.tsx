import { useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  ChevronRight,
  CircleDollarSign,
  Gauge,
  Menu,
  PackageSearch,
  ShieldCheck,
  Target,
  UserCheck,
  Users,
  WalletCards,
  X,
} from 'lucide-react'

type Tone = 'green' | 'blue' | 'amber' | 'red' | 'purple' | 'slate'
type Page = 'executivo' | SellerId
type SellerId = 'demitrio' | 'renata' | 'luana' | 'wanderson'

type MonthlyResult = {
  mes: string
  faturamento: number
  volume: number
  mc: number
  margem: number
  tkm: number
  mcTon: number
  desconto: number
  clientes: number
  ncp: number
  retidos: number
  novos: number
  reativados: number
  perdas: number
}

type TopClient = {
  nome: string
  faturamento: number
  participacao: number
  leitura: string
}

type Seller = {
  id: SellerId
  nome: string
  perfil: string
  status: string
  statusTone: Tone
  resumo: string
  monthly: MonthlyResult[]
  clientesUnicos: number
  recorrentes: number
  compraUnica: number
  recorrencia: number
  concentracaoTop3: number
  comissao: number
  topClients: TopClient[]
  pontosFortes: string[]
  riscos: string[]
  prioridades: string[]
  diagnostico: string
}

const historicalComparison = [
  {
    mes: 'JAN',
    comKam2025: 970923,
    semKam2025: 714000,
    atual2026: 785549,
    volumeComKam2025: 305010,
    volumeSemKam2025: 236580,
    volumeAtual2026: 246948,
    margemComKam2025: 18.2,
    margemSemKam2025: 16.9,
    margemAtual2026: 18.9,
  },
  {
    mes: 'FEV',
    comKam2025: 718301,
    semKam2025: 624551,
    atual2026: 774365,
    volumeComKam2025: 211830,
    volumeSemKam2025: 196830,
    volumeAtual2026: 222464,
    margemComKam2025: 15.5,
    margemSemKam2025: 15.2,
    margemAtual2026: 20.1,
  },
  {
    mes: 'MAR',
    comKam2025: 668388,
    semKam2025: 573513,
    atual2026: 569452,
    volumeComKam2025: 222120,
    volumeSemKam2025: 196620,
    volumeAtual2026: 188135,
    margemComKam2025: 12.5,
    margemSemKam2025: 12.0,
    margemAtual2026: 21.2,
  },
  {
    mes: 'ABR',
    comKam2025: 891621,
    semKam2025: 792863,
    atual2026: 842322,
    volumeComKam2025: 270535,
    volumeSemKam2025: 245395,
    volumeAtual2026: 236375,
    margemComKam2025: 13.0,
    margemSemKam2025: 12.0,
    margemAtual2026: 19.6,
  },
  {
    mes: 'MAI',
    comKam2025: 984740,
    semKam2025: 754796,
    atual2026: 879768,
    volumeComKam2025: 304125,
    volumeSemKam2025: 234965,
    volumeAtual2026: 225208,
    margemComKam2025: 17.7,
    margemSemKam2025: 17.0,
    margemAtual2026: 20.1,
  },
]

const teamMonthly = [
  { mes: 'JAN', faturamento: 785549, volume: 246948, mc: 148473, margem: 18.9, clientes: 36, tkm: 3181, mcTon: 601 },
  { mes: 'FEV', faturamento: 774365, volume: 222464, mc: 155521, margem: 20.1, clientes: 35, tkm: 3481, mcTon: 699 },
  { mes: 'MAR', faturamento: 569452, volume: 188135, mc: 120814, margem: 21.2, clientes: 33, tkm: 3027, mcTon: 642 },
  { mes: 'ABR', faturamento: 842322, volume: 236375, mc: 165014, margem: 19.6, clientes: 37, tkm: 3563, mcTon: 698 },
  { mes: 'MAI', faturamento: 879768, volume: 225208, mc: 176956, margem: 20.1, clientes: 42, tkm: 3906, mcTon: 786 },
  { mes: 'JUN', faturamento: 870292, volume: 238230, mc: 195333, margem: 22.4, clientes: 37, tkm: 3653, mcTon: 820 },
]

const sellers: Seller[] = [
  {
    id: 'demitrio',
    nome: 'Demitrio Vieira',
    perfil: 'Expansão e geração de volume',
    status: 'Rentável, porém concentrado',
    statusTone: 'amber',
    resumo:
      'Melhorou margem, MC por tonelada e controle de desconto, mas perdeu volume e mantém alta dependência dos maiores clientes.',
    monthly: [
      { mes: 'JAN', faturamento: 325300, volume: 105493, mc: 44129, margem: 13.6, tkm: 3084, mcTon: 418, desconto: 19.3, clientes: 6, ncp: 0, retidos: 0, novos: 6, reativados: 0, perdas: 0 },
      { mes: 'FEV', faturamento: 276604, volume: 81999, mc: 50101, margem: 18.1, tkm: 3373, mcTon: 611, desconto: 12.4, clientes: 7, ncp: 0, retidos: 3, novos: 4, reativados: 0, perdas: 3 },
      { mes: 'MAR', faturamento: 150968, volume: 45330, mc: 46755, margem: 31.0, tkm: 3330, mcTon: 1031, desconto: 7.8, clientes: 8, ncp: 12750, retidos: 3, novos: 3, reativados: 2, perdas: 4 },
      { mes: 'ABR', faturamento: 296196, volume: 87500, mc: 47974, margem: 16.2, tkm: 3385, mcTon: 548, desconto: 12.3, clientes: 7, ncp: 20795, retidos: 3, novos: 3, reativados: 1, perdas: 5 },
      { mes: 'MAI', faturamento: 212302, volume: 76350, mc: 50684, margem: 23.9, tkm: 2781, mcTon: 664, desconto: 12.1, clientes: 7, ncp: 74700, retidos: 3, novos: 3, reativados: 1, perdas: 4 },
      { mes: 'JUN', faturamento: 213881, volume: 53420, mc: 51580, margem: 24.1, tkm: 4004, mcTon: 966, desconto: 10.9, clientes: 4, ncp: 49198, retidos: 2, novos: 0, reativados: 2, perdas: 5 },
    ],
    clientesUnicos: 19,
    recorrentes: 8,
    compraUnica: 11,
    recorrencia: 42.0,
    concentracaoTop3: 69.4,
    comissao: 15139.7,
    topClients: [
      { nome: 'Ronnei Frolich Pereira', faturamento: 426264, participacao: 28.9, leitura: 'Recorrente, com evolução de MIN para RA, PE e NCP.' },
      { nome: 'Caio Monteiro', faturamento: 305589, participacao: 20.7, leitura: 'Compra todos os meses e ampliou o mix para NCP.' },
      { nome: 'Luis Augusto Rosa Valim', faturamento: 291636, participacao: 19.8, leitura: 'Grande concentração no início do ano e ausência após fevereiro.' },
    ],
    pontosFortes: [
      'Evolução relevante da MC por tonelada.',
      'Redução do desconto médio ao longo do semestre.',
      'Entrada progressiva de NCP a partir de março.',
      'Capacidade de gerar volume em clientes estratégicos.',
    ],
    riscos: [
      '69,4% do faturamento concentrado nos três maiores clientes.',
      '58% dos clientes identificados compraram apenas uma vez.',
      'Volume de junho ficou 49,4% abaixo de janeiro.',
      'Margem de março possui distorção por ajustes contábeis.',
    ],
    prioridades: [
      'Garantir segunda compra dos 11 clientes pontuais.',
      'Recuperar Luis Augusto, Izilda e clientes de maior ticket inativos.',
      'Replicar o avanço de mix observado em Ronnei e Caio.',
      'Reduzir dependência dos três maiores clientes.',
    ],
    diagnostico:
      'O principal avanço foi financeiro: Demitrio gera mais contribuição por tonelada e concede menos desconto. A evolução ainda não é estrutural, porque a carteira ativa caiu, o volume recuou e o resultado permanece muito concentrado.',
  },
  {
    id: 'renata',
    nome: 'Renata Botelho',
    perfil: 'Relacionamento e sustentação comercial',
    status: 'Estável, boa margem e retenção moderada',
    statusTone: 'blue',
    resumo:
      'Mantém boa rentabilidade e carteira relativamente distribuída, mas precisa converter aquisição e reativação em continuidade mensal.',
    monthly: [
      { mes: 'JAN', faturamento: 214278, volume: 62015, mc: 49014, margem: 22.9, tkm: 3455, mcTon: 790, desconto: 7.9, clientes: 11, ncp: 40300, retidos: 0, novos: 11, reativados: 0, perdas: 0 },
      { mes: 'FEV', faturamento: 196752, volume: 50920, mc: 44597, margem: 22.7, tkm: 3864, mcTon: 876, desconto: 5.9, clientes: 8, ncp: 82453, retidos: 3, novos: 5, reativados: 0, perdas: 8 },
      { mes: 'MAR', faturamento: 158504, volume: 51435, mc: 29042, margem: 18.3, tkm: 3082, mcTon: 565, desconto: 6.4, clientes: 10, ncp: 30038, retidos: 3, novos: 5, reativados: 2, perdas: 5 },
      { mes: 'ABR', faturamento: 213564, volume: 58825, mc: 49224, margem: 23.0, tkm: 3630, mcTon: 837, desconto: 9.9, clientes: 10, ncp: 81435, retidos: 3, novos: 4, reativados: 3, perdas: 7 },
      { mes: 'MAI', faturamento: 290857, volume: 68560, mc: 65424, margem: 22.5, tkm: 4242, mcTon: 954, desconto: 9.5, clientes: 12, ncp: 86137, retidos: 3, novos: 2, reativados: 7, perdas: 7 },
      { mes: 'JUN', faturamento: 205834, volume: 60960, mc: 44016, margem: 21.4, tkm: 3377, mcTon: 722, desconto: 11.2, clientes: 10, ncp: 24269, retidos: 5, novos: 3, reativados: 2, perdas: 7 },
    ],
    clientesUnicos: 30,
    recorrentes: 14,
    compraUnica: 16,
    recorrencia: 46.7,
    concentracaoTop3: 51.3,
    comissao: 15779.8,
    topClients: [
      { nome: 'Iara Aparecida Costa Esteves', faturamento: 242542, participacao: 19.0, leitura: 'Melhor caso de ampliação de mix: MIN, PE e NCP.' },
      { nome: 'Marcos Antonio Guedes', faturamento: 218143, participacao: 17.0, leitura: 'Alto valor, mas baixa frequência entre os pedidos.' },
      { nome: 'Claudia Junqueira', faturamento: 196264, participacao: 15.3, leitura: 'Recorrente em PE e com forte retomada em junho.' },
    ],
    pontosFortes: [
      'Maior margem acumulada entre os vendedores analisados.',
      'Boa diversificação entre MIN, PE e NCP.',
      'Iara e Rafael apresentam evolução consistente de relacionamento.',
      'Boa capacidade de reativação de clientes.',
    ],
    riscos: [
      '53,3% dos clientes identificados compraram apenas uma vez.',
      'Retenção direta mensal próxima de 33%.',
      'Desconto subiu de 5,9% em fevereiro para 11,2% em junho.',
      'Tecnificação ainda concentrada em poucos clientes.',
    ],
    prioridades: [
      'Aumentar a segunda compra dos 16 clientes pontuais.',
      'Transformar reativações de maio em recorrência.',
      'Desconcentrar NCP e replicar o caso de Iara.',
      'Controlar desconto por cliente, produto e margem.',
    ],
    diagnostico:
      'Renata opera com boa qualidade de receita e margem, mas o crescimento ainda é oscilante. Maio demonstrou o melhor equilíbrio entre carteira, volume e mix. O próximo salto depende de aumentar frequência e consolidar novos compradores.',
  },
  {
    id: 'luana',
    nome: 'Luana Biana',
    perfil: 'Prospecção e potencial consultivo',
    status: 'Tecnificada, porém pontual e instável',
    statusTone: 'purple',
    resumo:
      'Mostra capacidade de vender soluções tecnificadas e negócios de alto valor, mas a carteira ainda é pequena e pouco recorrente.',
    monthly: [
      { mes: 'JAN', faturamento: 76248, volume: 26700, mc: 15137, margem: 19.9, tkm: 2856, mcTon: 567, desconto: 12.9, clientes: 3, ncp: 0, retidos: 0, novos: 3, reativados: 0, perdas: 0 },
      { mes: 'FEV', faturamento: 34272, volume: 9340, mc: 9739, margem: 28.4, tkm: 3669, mcTon: 1043, desconto: 3.2, clientes: 3, ncp: 31472, retidos: 0, novos: 3, reativados: 0, perdas: 3 },
      { mes: 'MAR', faturamento: 55738, volume: 19190, mc: 9649, margem: 17.3, tkm: 2905, mcTon: 503, desconto: 12.4, clientes: 4, ncp: 0, retidos: 1, novos: 2, reativados: 1, perdas: 2 },
      { mes: 'ABR', faturamento: 43439, volume: 9390, mc: 10794, margem: 24.8, tkm: 4626, mcTon: 1149, desconto: 4.0, clientes: 4, ncp: 36663, retidos: 1, novos: 2, reativados: 1, perdas: 3 },
      { mes: 'MAI', faturamento: 232297, volume: 29778, mc: 37205, margem: 16.0, tkm: 7801, mcTon: 1249, desconto: 18.0, clientes: 8, ncp: 142837, retidos: 0, novos: 5, reativados: 3, perdas: 4 },
      { mes: 'JUN', faturamento: 31990, volume: 7950, mc: 7622, margem: 23.8, tkm: 4024, mcTon: 959, desconto: 7.6, clientes: 4, ncp: 12301, retidos: 1, novos: 2, reativados: 1, perdas: 7 },
    ],
    clientesUnicos: 17,
    recorrentes: 7,
    compraUnica: 10,
    recorrencia: 41.2,
    concentracaoTop3: 55.6,
    comissao: 5496.1,
    topClients: [
      { nome: 'Maria Elisa Borges', faturamento: 126963, participacao: 26.8, leitura: 'Grande operação de NCP, desconto elevado e sem recompra até junho.' },
      { nome: 'Maria Consuelo Rocha', faturamento: 86441, participacao: 18.2, leitura: 'Mais recorrente, mas com deterioração de margem na migração para RA.' },
      { nome: 'Frutop Agropecuária', faturamento: 50070, participacao: 10.6, leitura: 'Venda pontual de MPR, TKM elevado e margem percentual baixa.' },
    ],
    pontosFortes: [
      'Maior participação de NCP da equipe: 47,1% do faturamento.',
      'Capacidade de abrir oportunidades de alto valor.',
      'Boa margem e MC por tonelada em fevereiro e abril.',
      'Potencial para atuação consultiva em NCP.',
    ],
    riscos: [
      'Retenção direta mensal próxima de 14%.',
      '58,8% dos clientes compraram apenas uma vez.',
      'Dois clientes responderam por 76% do faturamento de maio.',
      'Maior mês teve desconto de 18% e margem de 16%.',
    ],
    prioridades: [
      'Garantir segunda compra de Maria Elisa, Frutop e clientes pontuais.',
      'Desenvolver os sete clientes que já apresentaram recorrência.',
      'Preservar margem em operações de alto faturamento.',
      'Transformar venda de NCP em relacionamento recorrente.',
    ],
    diagnostico:
      'Luana tem capacidade técnica e comercial para operações de valor elevado, mas ainda não construiu previsibilidade. A prioridade é converter prospecção e grandes pedidos em uma carteira recorrente, menos concentrada e com disciplina de margem.',
  },
  {
    id: 'wanderson',
    nome: 'Wanderson Silva',
    perfil: 'Equilíbrio e sustentação operacional',
    status: 'Melhor evolução estrutural',
    statusTone: 'green',
    resumo:
      'Apresentou crescimento real de volume, faturamento, MC e clientes, com a melhor recorrência e maior pulverização da equipe.',
    monthly: [
      { mes: 'JAN', faturamento: 169723, volume: 52740, mc: 40193, margem: 23.7, tkm: 3218, mcTon: 762, desconto: 4.5, clientes: 16, ncp: 66435, retidos: 0, novos: 16, reativados: 0, perdas: 0 },
      { mes: 'FEV', faturamento: 266737, volume: 80205, mc: 51084, margem: 19.2, tkm: 3326, mcTon: 637, desconto: 7.7, clientes: 17, ncp: 131119, retidos: 6, novos: 11, reativados: 0, perdas: 10 },
      { mes: 'MAR', faturamento: 204242, volume: 72180, mc: 35368, margem: 17.3, tkm: 2830, mcTon: 490, desconto: 7.3, clientes: 11, ncp: 27652, retidos: 5, novos: 3, reativados: 3, perdas: 12 },
      { mes: 'ABR', faturamento: 289123, volume: 80660, mc: 57022, margem: 19.7, tkm: 3584, mcTon: 707, desconto: 9.4, clientes: 16, ncp: 106263, retidos: 5, novos: 4, reativados: 7, perdas: 6 },
      { mes: 'MAI', faturamento: 144312, volume: 50520, mc: 23643, margem: 16.4, tkm: 2857, mcTon: 468, desconto: 7.9, clientes: 15, ncp: 8257, retidos: 8, novos: 2, reativados: 5, perdas: 8 },
      { mes: 'JUN', faturamento: 418587, volume: 115900, mc: 92115, margem: 22.0, tkm: 3612, mcTon: 795, desconto: 9.4, clientes: 19, ncp: 61905, retidos: 8, novos: 4, reativados: 7, perdas: 7 },
    ],
    clientesUnicos: 40,
    recorrentes: 24,
    compraUnica: 16,
    recorrencia: 60.0,
    concentracaoTop3: 48.6,
    comissao: 16991.4,
    topClients: [
      { nome: 'FREC Agropecuária', faturamento: 389164, participacao: 26.1, leitura: 'Maior cliente, alta recorrência e volume, mas margem abaixo das linhas tecnificadas.' },
      { nome: 'Gvinah Ltda', faturamento: 180628, participacao: 12.1, leitura: 'Cliente tecnificado e rentável, porém com forte oscilação entre pedidos.' },
      { nome: 'Henrique Andrade', faturamento: 156325, participacao: 10.5, leitura: 'Melhor caso de crescimento recorrente, volume e ampliação de mix.' },
    ],
    pontosFortes: [
      '60% dos clientes apresentaram recorrência.',
      'Base acumulada de 40 clientes, a maior da equipe.',
      'Junho combinou recorde de faturamento, volume, MC e clientes.',
      'Crescimento de janeiro a junho veio majoritariamente de volume.',
    ],
    riscos: [
      'FREC representa 26,1% do faturamento acumulado.',
      'Margens reduzidas em parte das vendas de PE e RA.',
      'Desconto médio subiu de 4,5% para 9,4%.',
      'Gvinah apresentou forte redução de pedido em junho.',
    ],
    prioridades: [
      'Desenvolver FREC com foco em margem e ampliação de mix.',
      'Consolidar o crescimento de Henrique Andrade.',
      'Recuperar frequência e volume da Gvinah.',
      'Transformar os novos clientes de junho em recorrentes.',
    ],
    diagnostico:
      'Wanderson é o principal motor da evolução atual. A carteira cresceu em escala e recorrência, e junho apresentou resultado distribuído entre mais clientes. O próximo passo é elevar a margem dos clientes de grande volume e consolidar as aquisições recentes.',
  },
]

const executiveTotals = {
  faturamento: 4721748,
  volume: 1357360,
  mc: 962111,
  margem: 20.4,
  tkm: 3479,
  mcTon: 709,
  clientesCarteira: 106,
  recorrentes: 53,
  compraUnica: 53,
  ncp: 1126979,
  ncpShare: 23.9,
}

const comparableTotals = {
  faturamentoComKam: 4233973,
  faturamentoSemKam: 3459723,
  faturamento2026: 3851456,
  volumeComKam: 1313620,
  volumeSemKam: 1110390,
  volume2026: 1119130,
  crescimentoOrganicoValor: 11.3,
  gapComKamValor: -9.0,
  recuperacaoKamValor: 50.6,
  crescimentoOrganicoVolume: 0.8,
  gapComKamVolume: -14.8,
  recuperacaoKamVolume: 4.3,
  margemComKam: 15.6,
  margemSemKam: 14.7,
  margem2026: 19.9,
}

const acquisitionChannels = [
  { canal: 'Indicação estruturada', peso: 30 },
  { canal: 'Outbound segmentado', peso: 25 },
  { canal: 'Parcerias regionais', peso: 20 },
  { canal: 'Diagnóstico via tráfego', peso: 15 },
  { canal: 'Reativação', peso: 10 },
]

const channelColors = ['#1d7a46', '#2f80ed', '#7b61ff', '#f2994a', '#d35454']

const css = `
  :root {
    --cd-green-950: #062b1d;
    --cd-green-900: #0a3d28;
    --cd-green-800: #0f5738;
    --cd-green-700: #147347;
    --cd-green-600: #1d8f56;
    --cd-green-100: #daf3e4;
    --cd-bg: #f3f6f8;
    --cd-card: #ffffff;
    --cd-border: #dfe7e2;
    --cd-text: #13211a;
    --cd-muted: #68766e;
    --cd-blue: #2f80ed;
    --cd-purple: #7b61ff;
    --cd-amber: #f2994a;
    --cd-red: #d35454;
  }

  * { box-sizing: border-box; }
  body { margin: 0; }

  .cd-app {
    min-height: 100vh;
    background: var(--cd-bg);
    color: var(--cd-text);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .cd-shell { display: flex; min-height: 100vh; }

  .cd-sidebar {
    width: 274px;
    position: fixed;
    inset: 0 auto 0 0;
    z-index: 40;
    display: flex;
    flex-direction: column;
    padding: 22px 16px;
    color: #fff;
    background:
      radial-gradient(circle at 20% 5%, rgba(54, 185, 111, .28), transparent 30%),
      linear-gradient(180deg, var(--cd-green-900), var(--cd-green-950));
    transition: transform .25s ease;
  }

  .cd-logo-wrap {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 10px 20px;
    border-bottom: 1px solid rgba(255,255,255,.12);
    margin-bottom: 16px;
  }

  .cd-logo {
    width: 56px;
    height: 56px;
    object-fit: contain;
    background: #fff;
    border-radius: 14px;
    padding: 7px;
  }

  .cd-brand strong { display: block; font-size: 19px; letter-spacing: .02em; }
  .cd-brand span { color: rgba(255,255,255,.66); font-size: 12px; }

  .cd-nav-label {
    margin: 18px 12px 8px;
    color: rgba(255,255,255,.5);
    font-size: 10px;
    font-weight: 800;
    letter-spacing: .14em;
    text-transform: uppercase;
  }

  .cd-nav { display: flex; flex-direction: column; gap: 6px; }
  .cd-nav button {
    width: 100%;
    border: 0;
    background: transparent;
    color: rgba(255,255,255,.82);
    border-radius: 13px;
    padding: 11px 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    font: inherit;
    text-align: left;
    transition: .2s ease;
  }

  .cd-nav button:hover { background: rgba(255,255,255,.08); color: #fff; }
  .cd-nav button.cd-active {
    color: #fff;
    background: linear-gradient(135deg, rgba(47, 184, 103, .95), rgba(24, 134, 77, .95));
    box-shadow: 0 10px 24px rgba(0,0,0,.18);
  }

  .cd-avatar {
    width: 30px;
    height: 30px;
    border-radius: 9px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,.12);
    font-size: 12px;
    font-weight: 800;
  }

  .cd-sidebar-note {
    margin-top: auto;
    border: 1px solid rgba(255,255,255,.14);
    border-radius: 16px;
    padding: 14px;
    background: rgba(255,255,255,.06);
    font-size: 12px;
    line-height: 1.55;
    color: rgba(255,255,255,.72);
  }

  .cd-main { width: 100%; margin-left: 274px; min-width: 0; }

  .cd-topbar {
    position: sticky;
    top: 0;
    z-index: 25;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    padding: 18px 28px;
    background: rgba(243, 246, 248, .9);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(208, 220, 213, .82);
  }

  .cd-topbar h1 { margin: 0; font-size: clamp(22px, 2.2vw, 32px); letter-spacing: -.035em; }
  .cd-topbar p { margin: 5px 0 0; color: var(--cd-muted); font-size: 13px; }
  .cd-period {
    display: flex;
    align-items: center;
    gap: 9px;
    background: #fff;
    border: 1px solid var(--cd-border);
    border-radius: 14px;
    padding: 10px 13px;
    color: var(--cd-muted);
    font-size: 12px;
    white-space: nowrap;
  }
  .cd-period strong { color: var(--cd-green-800); }

  .cd-menu-btn { display: none; border: 0; background: transparent; padding: 7px; }
  .cd-close-btn { display: none; margin-left: auto; border: 0; color: #fff; background: transparent; }

  .cd-content { padding: 26px 28px 44px; }
  .cd-dashboard { display: flex; flex-direction: column; gap: 22px; max-width: 1720px; margin: 0 auto; }

  .cd-section-head {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 12px;
  }
  .cd-section-head h2 { margin: 0; font-size: 20px; letter-spacing: -.025em; }
  .cd-section-head p { margin: 5px 0 0; color: var(--cd-muted); font-size: 13px; }
  .cd-kicker { color: var(--cd-green-700); font-size: 10px; font-weight: 900; letter-spacing: .14em; text-transform: uppercase; }

  .cd-grid { display: grid; gap: 16px; }
  .cd-grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .cd-grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .cd-grid-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .cd-grid-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }

  .cd-card {
    background: var(--cd-card);
    border: 1px solid var(--cd-border);
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(14, 55, 35, .055);
  }

  .cd-metric { padding: 18px; min-width: 0; position: relative; overflow: hidden; }
  .cd-metric::after {
    content: '';
    position: absolute;
    width: 84px;
    height: 84px;
    right: -34px;
    top: -34px;
    border-radius: 50%;
    background: var(--metric-soft, #e7f4ec);
  }
  .cd-metric-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
  .cd-metric-label { color: var(--cd-muted); font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .07em; }
  .cd-metric-icon { width: 34px; height: 34px; display: grid; place-items: center; border-radius: 10px; color: var(--metric, var(--cd-green-700)); background: var(--metric-soft, #e7f4ec); }
  .cd-metric-value { margin-top: 13px; font-size: clamp(21px, 1.8vw, 29px); line-height: 1.05; font-weight: 850; letter-spacing: -.045em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .cd-metric-sub { margin-top: 9px; color: var(--cd-muted); font-size: 12px; line-height: 1.45; }
  .cd-metric-comparisons { margin-top: 12px; display: flex; flex-direction: column; gap: 6px; }
  .cd-comparison { display: flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 750; }
  .cd-positive { color: #148449; }
  .cd-negative { color: #c24b4b; }
  .cd-neutral { color: var(--cd-muted); }

  .cd-chart { padding: 20px 18px 10px; min-width: 0; }
  .cd-chart-head { padding: 0 4px 10px; }
  .cd-chart-head h3 { margin: 0; font-size: 16px; letter-spacing: -.02em; }
  .cd-chart-head p { margin: 5px 0 0; color: var(--cd-muted); font-size: 12px; }

  .cd-insight-card { padding: 20px; }
  .cd-insight-card h3 { margin: 0; font-size: 17px; }
  .cd-insight-card p { margin: 10px 0 0; color: #46554d; line-height: 1.7; font-size: 13px; }

  .cd-progress { height: 10px; border-radius: 999px; background: #e8eeea; overflow: hidden; margin: 14px 0 7px; }
  .cd-progress span { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #1d8f56, #3db874); }
  .cd-progress-meta { display: flex; justify-content: space-between; color: var(--cd-muted); font-size: 11px; }

  .cd-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border-radius: 999px;
    padding: 6px 10px;
    font-size: 11px;
    font-weight: 800;
  }
  .cd-badge-green { color: #11663a; background: #dff5e7; }
  .cd-badge-blue { color: #215fa9; background: #e2efff; }
  .cd-badge-purple { color: #6042c4; background: #ebe7ff; }
  .cd-badge-amber { color: #9a641f; background: #fff0d8; }
  .cd-badge-red { color: #a54040; background: #ffe2e2; }
  .cd-badge-slate { color: #52605a; background: #edf1ef; }

  .cd-table-wrap { overflow: auto; }
  .cd-table { width: 100%; border-collapse: collapse; min-width: 850px; font-size: 12px; }
  .cd-table th { text-align: left; padding: 12px 13px; color: var(--cd-muted); background: #f7faf8; font-size: 10px; text-transform: uppercase; letter-spacing: .065em; border-bottom: 1px solid var(--cd-border); white-space: nowrap; }
  .cd-table td { padding: 13px; border-bottom: 1px solid #edf1ef; vertical-align: middle; }
  .cd-table tr:last-child td { border-bottom: 0; }
  .cd-table tbody tr:hover { background: #fbfdfc; }
  .cd-seller-cell { display: flex; align-items: center; gap: 10px; }
  .cd-seller-cell .cd-avatar { background: var(--cd-green-100); color: var(--cd-green-800); }

  .cd-mini-bar { min-width: 110px; }
  .cd-mini-bar-track { height: 6px; border-radius: 999px; background: #e9efec; overflow: hidden; margin-top: 5px; }
  .cd-mini-bar-track span { display: block; height: 100%; background: var(--cd-green-600); border-radius: inherit; }

  .cd-diagnosis {
    padding: 22px;
    border-left: 5px solid var(--cd-green-600);
    background: linear-gradient(135deg, #ffffff, #f3fbf6);
  }
  .cd-diagnosis h3 { margin: 0; font-size: 18px; }
  .cd-diagnosis p { margin: 10px 0 0; line-height: 1.75; color: #3f5047; font-size: 13px; }
  .cd-diagnosis strong { color: var(--cd-green-800); }

  .cd-list { list-style: none; padding: 0; margin: 14px 0 0; display: flex; flex-direction: column; gap: 9px; }
  .cd-list li { display: flex; gap: 9px; align-items: flex-start; color: #425047; font-size: 13px; line-height: 1.5; }
  .cd-list-icon { flex: 0 0 auto; width: 22px; height: 22px; display: grid; place-items: center; border-radius: 7px; background: var(--cd-green-100); color: var(--cd-green-700); }
  .cd-list-risk .cd-list-icon { background: #ffe8e5; color: var(--cd-red); }
  .cd-list-priority .cd-list-icon { background: #fff0d8; color: #a66a1f; }

  .cd-seller-hero {
    padding: 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    background:
      radial-gradient(circle at 95% 10%, rgba(50, 171, 101, .14), transparent 28%),
      #fff;
  }
  .cd-seller-hero h2 { margin: 5px 0 0; font-size: 27px; letter-spacing: -.035em; }
  .cd-seller-hero p { margin: 8px 0 0; max-width: 860px; color: var(--cd-muted); line-height: 1.65; font-size: 13px; }

  .cd-kam-context { padding: 14px 18px; display: flex; align-items: center; gap: 12px; border: 1px dashed #a9cbb7; background: #f6fbf8; }
  .cd-kam-context p { margin: 0; color: #405148; font-size: 12px; line-height: 1.55; }

  .cd-stat-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 13px; }
  .cd-stat-box { border: 1px solid var(--cd-border); background: #f9fbfa; border-radius: 12px; padding: 11px; }
  .cd-stat-box span { display: block; color: var(--cd-muted); font-size: 10px; text-transform: uppercase; font-weight: 800; }
  .cd-stat-box strong { display: block; margin-top: 5px; font-size: 16px; }

  .cd-icon-button { border: 0; background: #edf5f0; color: var(--cd-green-800); width: 34px; height: 34px; border-radius: 10px; display: inline-grid; place-items: center; cursor: pointer; }
  .cd-icon-button:hover { background: var(--cd-green-100); }

  .cd-client-name { font-weight: 800; color: #24342b; }
  .cd-client-reading { margin-top: 4px; color: var(--cd-muted); font-size: 11px; line-height: 1.45; max-width: 460px; }

  .cd-acquisition-row { display: grid; grid-template-columns: 1.3fr .7fr; gap: 18px; }
  .cd-targets { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 14px; }
  .cd-target { padding: 12px; border: 1px solid var(--cd-border); border-radius: 13px; background: #f8fbf9; }
  .cd-target strong { display: block; font-size: 18px; color: var(--cd-green-800); }
  .cd-target span { display: block; margin-top: 4px; color: var(--cd-muted); font-size: 10px; line-height: 1.35; }

  .recharts-default-tooltip { border-radius: 12px !important; border-color: #dce5df !important; box-shadow: 0 10px 25px rgba(0,0,0,.08) !important; font-size: 12px !important; }

  @media (max-width: 1400px) {
    .cd-grid-6 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .cd-grid-4 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  @media (max-width: 1100px) {
    .cd-grid-3, .cd-grid-2, .cd-acquisition-row { grid-template-columns: 1fr; }
    .cd-main { margin-left: 0; }
    .cd-sidebar { transform: translateX(-100%); box-shadow: 18px 0 40px rgba(0,0,0,.25); }
    .cd-sidebar.cd-open { transform: translateX(0); }
    .cd-menu-btn, .cd-close-btn { display: inline-flex; }
    .cd-topbar { padding: 15px 18px; }
    .cd-content { padding: 20px 18px 38px; }
  }

  @media (max-width: 720px) {
    .cd-grid-6, .cd-grid-4 { grid-template-columns: 1fr; }
    .cd-topbar { align-items: flex-start; }
    .cd-period { display: none; }
    .cd-seller-hero { align-items: flex-start; flex-direction: column; }
    .cd-stat-row, .cd-targets { grid-template-columns: 1fr; }
    .cd-chart { padding-inline: 10px; }
  }
`

function sum(values: number[]) {
  return values.reduce((acc, value) => acc + value, 0)
}

function variation(current: number, base: number) {
  if (!base) return 0
  return ((current - base) / base) * 100
}

function formatCurrency(value: number, compact = true) {
  if (compact && Math.abs(value) >= 1_000_000) {
    return `R$ ${(value / 1_000_000).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} Mi`
  }
  if (compact && Math.abs(value) >= 1_000) {
    return `R$ ${(value / 1_000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} mil`
  }
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

function formatKg(value: number, compact = true) {
  if (compact && Math.abs(value) >= 1_000_000) {
    return `${(value / 1_000_000).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} mi kg`
  }
  if (compact && Math.abs(value) >= 1_000) {
    return `${(value / 1_000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} mil kg`
  }
  return `${value.toLocaleString('pt-BR')} kg`
}

function formatNumber(value: number, digits = 0) {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: digits, maximumFractionDigits: digits })
}

function formatPercent(value: number, digits = 1) {
  return `${formatNumber(value, digits)}%`
}

function toneVars(tone: Tone) {
  const map: Record<Tone, { main: string; soft: string }> = {
    green: { main: '#1d8f56', soft: '#e1f5e9' },
    blue: { main: '#2f80ed', soft: '#e5f0ff' },
    amber: { main: '#d98a2f', soft: '#fff0dd' },
    red: { main: '#d35454', soft: '#ffe8e8' },
    purple: { main: '#7b61ff', soft: '#ece8ff' },
    slate: { main: '#64756b', soft: '#edf2ef' },
  }
  return { '--metric': map[tone].main, '--metric-soft': map[tone].soft } as CSSProperties
}

function badgeClass(tone: Tone) {
  return `cd-badge cd-badge-${tone}`
}

function Delta({ value, label }: { value: number; label: string }) {
  const positive = value > 0
  const Icon = positive ? ArrowUpRight : ArrowDownRight
  return (
    <div className={`cd-comparison ${value === 0 ? 'cd-neutral' : positive ? 'cd-positive' : 'cd-negative'}`}>
      {value !== 0 && <Icon size={13} />}
      <span>{formatPercent(value)} {label}</span>
    </div>
  )
}

function MetricCard({
  label,
  value,
  subtitle,
  tone = 'green',
  icon,
  deltas,
}: {
  label: string
  value: string
  subtitle?: string
  tone?: Tone
  icon: ReactNode
  deltas?: { value: number; label: string }[]
}) {
  return (
    <div className="cd-card cd-metric" style={toneVars(tone)}>
      <div className="cd-metric-head">
        <div className="cd-metric-label">{label}</div>
        <div className="cd-metric-icon">{icon}</div>
      </div>
      <div className="cd-metric-value">{value}</div>
      {subtitle && <div className="cd-metric-sub">{subtitle}</div>}
      {deltas && (
        <div className="cd-metric-comparisons">
          {deltas.map((item) => <Delta key={item.label} {...item} />)}
        </div>
      )}
    </div>
  )
}

function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="cd-card cd-chart">
      <div className="cd-chart-head">
        <h3>{title}</h3>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

function SectionHeader({ kicker, title, subtitle }: { kicker: string; title: string; subtitle: string }) {
  return (
    <div className="cd-section-head">
      <div>
        <div className="cd-kicker">{kicker}</div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
  )
}

function RecoveryCard({ title, recovery, organic, gap, text }: { title: string; recovery: number; organic: number; gap: number; text: string }) {
  return (
    <div className="cd-card cd-insight-card">
      <div className="cd-metric-head">
        <h3>{title}</h3>
        <span className={badgeClass(recovery >= 50 ? 'green' : recovery >= 20 ? 'amber' : 'red')}>{formatPercent(recovery)} recuperado</span>
      </div>
      <div className="cd-progress"><span style={{ width: `${Math.min(100, recovery)}%` }} /></div>
      <div className="cd-progress-meta"><span>Crescimento orgânico: {formatPercent(organic)}</span><span>Gap c/KAM: {formatPercent(gap)}</span></div>
      <p>{text}</p>
    </div>
  )
}

function ExecutiveDashboard({ onSelectSeller }: { onSelectSeller: (id: SellerId) => void }) {
  const ranking = useMemo(() => {
    return sellers
      .map((seller) => {
        const faturamento = sum(seller.monthly.map((item) => item.faturamento))
        const volume = sum(seller.monthly.map((item) => item.volume))
        const mc = sum(seller.monthly.map((item) => item.mc))
        const ncp = sum(seller.monthly.map((item) => item.ncp))
        return {
          ...seller,
          faturamento,
          volume,
          mc,
          margem: (mc / faturamento) * 100,
          tkm: faturamento / (volume / 1000),
          mcTon: mc / (volume / 1000),
          ncpShare: (ncp / faturamento) * 100,
          crescimento: variation(seller.monthly[5].faturamento, seller.monthly[0].faturamento),
        }
      })
      .sort((a, b) => b.faturamento - a.faturamento)
  }, [])

  const ncpBySeller = ranking.map((seller) => ({ nome: seller.nome.split(' ')[0], participacao: Number(seller.ncpShare.toFixed(1)) }))

  return (
    <div className="cd-dashboard">
      <section>
        <SectionHeader
          kicker="Visão consolidada"
          title="Resultado atual da operação"
          subtitle="Janeiro a junho de 2026; junho ainda é parcial. A análise cobre Demitrio, Renata, Luana e Wanderson."
        />
        <div className="cd-grid cd-grid-6">
          <MetricCard label="Faturamento" value={formatCurrency(executiveTotals.faturamento)} subtitle="Acumulado Jan–Jun" tone="green" icon={<CircleDollarSign size={18} />} />
          <MetricCard label="Volume" value={formatKg(executiveTotals.volume)} subtitle="Acumulado Jan–Jun" tone="blue" icon={<Boxes size={18} />} />
          <MetricCard label="MC Gerencial" value={formatCurrency(executiveTotals.mc)} subtitle="20,4% sobre o faturamento" tone="purple" icon={<WalletCards size={18} />} />
          <MetricCard label="TKM / Ton" value={formatCurrency(executiveTotals.tkm, false)} subtitle="Valor médio por tonelada" tone="amber" icon={<Gauge size={18} />} />
          <MetricCard label="MC / Ton" value={formatCurrency(executiveTotals.mcTon, false)} subtitle="Contribuição por tonelada" tone="green" icon={<Activity size={18} />} />
          <MetricCard label="Clientes nas carteiras" value={formatNumber(executiveTotals.clientesCarteira)} subtitle="53 recorrentes e 53 de compra única" tone="slate" icon={<Users size={18} />} />
        </div>
      </section>

      <section>
        <SectionHeader
          kicker="Comparação histórica obrigatória"
          title="2025 com KAM × 2025 sem KAM × 2026"
          subtitle="Período comparável fechado de janeiro a maio. Junho de 2026 permanece na leitura operacional, mas não entra nos cards históricos por ausência do recorte sem KAM de junho/2025."
        />
        <div className="cd-grid cd-grid-4">
          <MetricCard
            label="Faturamento 2026 comparável"
            value={formatCurrency(comparableTotals.faturamento2026)}
            subtitle="Janeiro a maio"
            tone="green"
            icon={<CircleDollarSign size={18} />}
            deltas={[
              { value: comparableTotals.crescimentoOrganicoValor, label: 'vs. 2025 sem KAM' },
              { value: comparableTotals.gapComKamValor, label: 'vs. 2025 com KAM' },
            ]}
          />
          <MetricCard
            label="Volume 2026 comparável"
            value={formatKg(comparableTotals.volume2026)}
            subtitle="Janeiro a maio"
            tone="blue"
            icon={<Boxes size={18} />}
            deltas={[
              { value: comparableTotals.crescimentoOrganicoVolume, label: 'vs. 2025 sem KAM' },
              { value: comparableTotals.gapComKamVolume, label: 'vs. 2025 com KAM' },
            ]}
          />
          <MetricCard
            label="Margem 2026 comparável"
            value={formatPercent(comparableTotals.margem2026)}
            subtitle={`2025 s/KAM: ${formatPercent(comparableTotals.margemSemKam)} · c/KAM: ${formatPercent(comparableTotals.margemComKam)}`}
            tone="purple"
            icon={<ShieldCheck size={18} />}
            deltas={[
              { value: comparableTotals.margem2026 - comparableTotals.margemSemKam, label: 'p.p. vs. 2025 sem KAM' },
              { value: comparableTotals.margem2026 - comparableTotals.margemComKam, label: 'p.p. vs. 2025 com KAM' },
            ]}
          />
          <MetricCard
            label="Participação de NCP"
            value={formatPercent(executiveTotals.ncpShare)}
            subtitle={`${formatCurrency(executiveTotals.ncp)} em faturamento tecnificado`}
            tone="amber"
            icon={<PackageSearch size={18} />}
          />
        </div>
      </section>

      <section className="cd-grid cd-grid-2">
        <RecoveryCard
          title="Recuperação financeira do efeito KAM"
          recovery={comparableTotals.recuperacaoKamValor}
          organic={comparableTotals.crescimentoOrganicoValor}
          gap={comparableTotals.gapComKamValor}
          text="A equipe recuperou aproximadamente metade do faturamento que as contas KAM acrescentavam ao período comparável de 2025. Ainda existe um gap de 9,0% para a operação total anterior."
        />
        <RecoveryCard
          title="Recuperação de volume do efeito KAM"
          recovery={comparableTotals.recuperacaoKamVolume}
          organic={comparableTotals.crescimentoOrganicoVolume}
          gap={comparableTotals.gapComKamVolume}
          text="A recuperação física foi mínima: apenas 4,3% do volume associado ao efeito KAM foi recomposto. Isso confirma que o avanço atual vem muito mais de preço/mix e margem do que de escala."
        />
      </section>

      <section className="cd-grid cd-grid-2">
        <ChartCard title="Faturamento mensal comparável" subtitle="Janeiro a maio · valores em reais">
          <ResponsiveContainer width="100%" height={330}>
            <BarChart data={historicalComparison} margin={{ top: 10, right: 8, left: 4, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7ece9" />
              <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k`} tick={{ fontSize: 10 }} />
              <Tooltip formatter={(value) => formatCurrency(Number(value), false)} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="comKam2025" name="2025 c/ KAM" fill="#7b61ff" radius={[6, 6, 0, 0]} />
              <Bar dataKey="semKam2025" name="2025 s/ KAM" fill="#2f80ed" radius={[6, 6, 0, 0]} />
              <Bar dataKey="atual2026" name="2026" fill="#1d8f56" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Volume mensal comparável" subtitle="Janeiro a maio · quilos vendidos">
          <ResponsiveContainer width="100%" height={330}>
            <LineChart data={historicalComparison} margin={{ top: 10, right: 8, left: 4, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7ece9" />
              <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k`} tick={{ fontSize: 10 }} />
              <Tooltip formatter={(value) => formatKg(Number(value), false)} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="volumeComKam2025" name="2025 c/ KAM" stroke="#7b61ff" strokeWidth={3} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="volumeSemKam2025" name="2025 s/ KAM" stroke="#2f80ed" strokeWidth={3} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="volumeAtual2026" name="2026" stroke="#1d8f56" strokeWidth={3} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section className="cd-grid cd-grid-2">
        <ChartCard title="Margem comercial comparável" subtitle="2026 supera os dois referenciais históricos">
          <ResponsiveContainer width="100%" height={310}>
            <LineChart data={historicalComparison} margin={{ top: 10, right: 8, left: 4, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7ece9" />
              <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 30]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 10 }} />
              <Tooltip formatter={(value) => formatPercent(Number(value))} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="margemComKam2025" name="2025 c/ KAM" stroke="#7b61ff" strokeWidth={3} />
              <Line type="monotone" dataKey="margemSemKam2025" name="2025 s/ KAM" stroke="#2f80ed" strokeWidth={3} />
              <Line type="monotone" dataKey="margemAtual2026" name="2026" stroke="#1d8f56" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Evolução operacional de 2026" subtitle="Faturamento, MC Gerencial e volume; junho parcial">
          <ResponsiveContainer width="100%" height={310}>
            <ComposedChart data={teamMonthly} margin={{ top: 10, right: 8, left: 4, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7ece9" />
              <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k`} tick={{ fontSize: 10 }} />
              <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k kg`} tick={{ fontSize: 10 }} />
              <Tooltip formatter={(value, name) => name === 'Volume' ? formatKg(Number(value), false) : formatCurrency(Number(value), false)} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar yAxisId="left" dataKey="faturamento" name="Faturamento" fill="#1d8f56" radius={[6, 6, 0, 0]} />
              <Line yAxisId="left" type="monotone" dataKey="mc" name="MC Gerencial" stroke="#7b61ff" strokeWidth={3} dot={{ r: 3 }} />
              <Line yAxisId="right" type="monotone" dataKey="volume" name="Volume" stroke="#2f80ed" strokeWidth={3} dot={{ r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section>
        <SectionHeader
          kicker="Performance individual"
          title="Comparativo dos vendedores"
          subtitle="O consolidado cresce, mas a evolução está distribuída de forma desigual."
        />
        <div className="cd-card cd-table-wrap">
          <table className="cd-table">
            <thead>
              <tr>
                <th>Vendedor</th>
                <th>Faturamento</th>
                <th>Volume</th>
                <th>MC</th>
                <th>Margem</th>
                <th>Clientes únicos</th>
                <th>Recorrência</th>
                <th>Top 3</th>
                <th>NCP</th>
                <th>Jan × Jun</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((seller) => (
                <tr key={seller.id}>
                  <td>
                    <div className="cd-seller-cell">
                      <span className="cd-avatar">{seller.nome.charAt(0)}</span>
                      <div>
                        <div className="cd-client-name">{seller.nome}</div>
                        <span className={badgeClass(seller.statusTone)}>{seller.status}</span>
                      </div>
                    </div>
                  </td>
                  <td><strong>{formatCurrency(seller.faturamento)}</strong></td>
                  <td>{formatKg(seller.volume)}</td>
                  <td>{formatCurrency(seller.mc)}</td>
                  <td>{formatPercent(seller.margem)}</td>
                  <td>{seller.clientesUnicos}</td>
                  <td>
                    <div className="cd-mini-bar">
                      <strong>{formatPercent(seller.recorrencia)}</strong>
                      <div className="cd-mini-bar-track"><span style={{ width: `${seller.recorrencia}%` }} /></div>
                    </div>
                  </td>
                  <td>{formatPercent(seller.concentracaoTop3)}</td>
                  <td>{formatPercent(seller.ncpShare)}</td>
                  <td className={seller.crescimento >= 0 ? 'cd-positive' : 'cd-negative'}><strong>{formatPercent(seller.crescimento)}</strong></td>
                  <td><button className="cd-icon-button" onClick={() => onSelectSeller(seller.id)} aria-label={`Abrir ${seller.nome}`}><ChevronRight size={18} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="cd-grid cd-grid-2">
        <ChartCard title="Clientes ativos por mês" subtitle="O pico de maio não se sustentou integralmente em junho">
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={teamMonthly} margin={{ top: 10, right: 8, left: 4, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7ece9" />
              <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 50]} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="clientes" name="Clientes ativos" fill="#2f80ed" radius={[7, 7, 0, 0]} />
              <Line type="monotone" dataKey="margem" name="Margem %" stroke="#1d8f56" strokeWidth={3} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Participação de NCP por vendedor" subtitle="Tecnificação acumulada no faturamento de janeiro a junho">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ncpBySeller} layout="vertical" margin={{ top: 8, right: 28, left: 12, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7ece9" />
              <XAxis type="number" domain={[0, 55]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="nome" width={74} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(value) => formatPercent(Number(value))} />
              <Bar dataKey="participacao" name="NCP no faturamento" fill="#7b61ff" radius={[0, 7, 7, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section className="cd-grid cd-grid-3">
        <div className="cd-card cd-insight-card">
          <div className="cd-kicker">Leitura de crescimento</div>
          <h3>Evolução financeira, não de escala</h3>
          <p>Entre janeiro e junho, o faturamento cresceu 10,8% e a MC avançou 31,6%, enquanto o volume caiu 3,5% e os clientes ativos passaram de 36 para 37.</p>
        </div>
        <div className="cd-card cd-insight-card">
          <div className="cd-kicker">Dependência da equipe</div>
          <h3>Crescimento concentrado no Wanderson</h3>
          <p>Wanderson cresceu 146,6% entre janeiro e junho. Os outros três vendedores, juntos, recuaram aproximadamente 26,7% no mesmo comparativo.</p>
        </div>
        <div className="cd-card cd-insight-card">
          <div className="cd-kicker">Gargalo estrutural</div>
          <h3>Primeira compra não vira recorrência</h3>
          <p>Nas quatro carteiras foram identificados 106 registros de clientes únicos: 53 recorrentes e 53 de compra única. A segunda compra precisa virar o principal indicador de aquisição.</p>
        </div>
      </section>

      <section className="cd-acquisition-row">
        <ChartCard title="Motor de aquisição recomendado" subtitle="Distribuição sugerida do esforço comercial">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={acquisitionChannels} dataKey="peso" nameKey="canal" cx="50%" cy="48%" innerRadius={65} outerRadius={105} paddingAngle={3}>
                {acquisitionChannels.map((entry, index) => <Cell key={entry.canal} fill={channelColors[index % channelColors.length]} />)}
              </Pie>
              <Tooltip formatter={(value) => formatPercent(Number(value), 0)} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="cd-card cd-insight-card">
          <div className="cd-kicker">Meta por vendedor / mês</div>
          <h3>Aquisição consultiva e remota</h3>
          <p>Como a operação não visita clientes, a entrada deve ser baseada em indicação, diagnóstico nutricional remoto e prospecção altamente segmentada.</p>
          <div className="cd-targets">
            <div className="cd-target"><strong>30</strong><span>novos contatos qualificados</span></div>
            <div className="cd-target"><strong>15</strong><span>conversas efetivas</span></div>
            <div className="cd-target"><strong>8</strong><span>diagnósticos remotos</span></div>
            <div className="cd-target"><strong>4</strong><span>propostas comerciais</span></div>
            <div className="cd-target"><strong>2</strong><span>primeiras compras</span></div>
            <div className="cd-target"><strong>1</strong><span>cliente com segunda compra</span></div>
          </div>
        </div>
      </section>

      <section className="cd-card cd-diagnosis">
        <h3>Diagnóstico executivo da operação</h3>
        <p>
          <strong>Houve evolução real, mas ainda não uma evolução estrutural completa.</strong> No período comparável de janeiro a maio, a equipe cresceu 11,3% em faturamento contra 2025 sem KAM e ficou 9,0% abaixo do resultado com KAM. Em volume, o crescimento orgânico foi de apenas 0,8% e o gap para 2025 com KAM permanece em 14,8%. A operação está mais rentável, mais tecnificada e gera maior contribuição por tonelada, porém ainda depende de poucos clientes, de negócios pontuais e principalmente do desempenho do Wanderson. O próximo ciclo deve priorizar segunda compra, expansão de volume e distribuição do crescimento entre os quatro vendedores.
        </p>
      </section>
    </div>
  )
}

function SellerDashboard({ seller }: { seller: Seller }) {
  const totals = useMemo(() => {
    const faturamento = sum(seller.monthly.map((item) => item.faturamento))
    const volume = sum(seller.monthly.map((item) => item.volume))
    const mc = sum(seller.monthly.map((item) => item.mc))
    const ncp = sum(seller.monthly.map((item) => item.ncp))
    return {
      faturamento,
      volume,
      mc,
      margem: (mc / faturamento) * 100,
      tkm: faturamento / (volume / 1000),
      mcTon: mc / (volume / 1000),
      ncp,
      ncpShare: (ncp / faturamento) * 100,
      crescimentoFaturamento: variation(seller.monthly[5].faturamento, seller.monthly[0].faturamento),
      crescimentoVolume: variation(seller.monthly[5].volume, seller.monthly[0].volume),
      crescimentoMc: variation(seller.monthly[5].mc, seller.monthly[0].mc),
    }
  }, [seller])

  const carteiraPie = [
    { nome: 'Recorrentes', valor: seller.recorrentes },
    { nome: 'Compra única', valor: seller.compraUnica },
  ]

  return (
    <div className="cd-dashboard">
      <section className="cd-card cd-seller-hero">
        <div>
          <div className="cd-kicker">Análise individual</div>
          <h2>{seller.nome}</h2>
          <p>{seller.resumo}</p>
        </div>
        <span className={badgeClass(seller.statusTone)}>{seller.status}</span>
      </section>

      <section className="cd-card cd-kam-context">
        <ShieldCheck size={22} color="#1d8f56" />
        <p><strong>Contexto corporativo KAM:</strong> no período comparável Jan–Mai, 2026 está 11,3% acima de 2025 sem KAM e 9,0% abaixo de 2025 com KAM. O recorte histórico por vendedor não está disponível; por isso, a tela individual utiliza somente dados verificados de 2026.</p>
      </section>

      <section className="cd-grid cd-grid-4">
        <MetricCard label="Faturamento" value={formatCurrency(totals.faturamento)} subtitle="Jan–Jun" tone="green" icon={<CircleDollarSign size={18} />} deltas={[{ value: totals.crescimentoFaturamento, label: 'Jan × Jun' }]} />
        <MetricCard label="Volume" value={formatKg(totals.volume)} subtitle="Jan–Jun" tone="blue" icon={<Boxes size={18} />} deltas={[{ value: totals.crescimentoVolume, label: 'Jan × Jun' }]} />
        <MetricCard label="MC Gerencial" value={formatCurrency(totals.mc)} subtitle={formatPercent(totals.margem)} tone="purple" icon={<WalletCards size={18} />} deltas={[{ value: totals.crescimentoMc, label: 'Jan × Jun' }]} />
        <MetricCard label="Clientes únicos" value={formatNumber(seller.clientesUnicos)} subtitle={`${seller.recorrentes} recorrentes · ${seller.compraUnica} compra única`} tone="slate" icon={<Users size={18} />} />
        <MetricCard label="TKM / Ton" value={formatCurrency(totals.tkm, false)} subtitle="Valor médio acumulado" tone="amber" icon={<Gauge size={18} />} />
        <MetricCard label="MC / Ton" value={formatCurrency(totals.mcTon, false)} subtitle="Contribuição média" tone="green" icon={<Activity size={18} />} />
        <MetricCard label="Recorrência" value={formatPercent(seller.recorrencia)} subtitle="Clientes com compra em mais de um mês" tone={seller.recorrencia >= 55 ? 'green' : seller.recorrencia >= 45 ? 'blue' : 'amber'} icon={<UserCheck size={18} />} />
        <MetricCard label="Participação NCP" value={formatPercent(totals.ncpShare)} subtitle={formatCurrency(totals.ncp)} tone="purple" icon={<PackageSearch size={18} />} />
      </section>

      <section className="cd-grid cd-grid-2">
        <ChartCard title="Evolução mensal" subtitle="Faturamento, MC e volume; junho parcial">
          <ResponsiveContainer width="100%" height={330}>
            <ComposedChart data={seller.monthly} margin={{ top: 10, right: 8, left: 4, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7ece9" />
              <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k`} tick={{ fontSize: 10 }} />
              <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k kg`} tick={{ fontSize: 10 }} />
              <Tooltip formatter={(value, name) => name === 'Volume' ? formatKg(Number(value), false) : formatCurrency(Number(value), false)} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar yAxisId="left" dataKey="faturamento" name="Faturamento" fill="#1d8f56" radius={[6, 6, 0, 0]} />
              <Line yAxisId="left" type="monotone" dataKey="mc" name="MC Gerencial" stroke="#7b61ff" strokeWidth={3} dot={{ r: 3 }} />
              <Line yAxisId="right" type="monotone" dataKey="volume" name="Volume" stroke="#2f80ed" strokeWidth={3} dot={{ r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Qualidade mensal" subtitle="Margem, desconto e clientes ativos">
          <ResponsiveContainer width="100%" height={330}>
            <ComposedChart data={seller.monthly} margin={{ top: 10, right: 8, left: 4, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7ece9" />
              <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="percent" domain={[0, 35]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 10 }} />
              <YAxis yAxisId="clients" orientation="right" allowDecimals={false} tick={{ fontSize: 10 }} />
              <Tooltip formatter={(value, name) => name === 'Clientes ativos' ? Number(value) : formatPercent(Number(value))} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar yAxisId="clients" dataKey="clientes" name="Clientes ativos" fill="#d6e8ff" radius={[6, 6, 0, 0]} />
              <Line yAxisId="percent" type="monotone" dataKey="margem" name="Margem" stroke="#1d8f56" strokeWidth={3} />
              <Line yAxisId="percent" type="monotone" dataKey="desconto" name="Desconto" stroke="#d35454" strokeWidth={3} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section className="cd-grid cd-grid-2">
        <ChartCard title="Movimentação da carteira" subtitle="Novos, retidos, reativados e saídas mensais">
          <ResponsiveContainer width="100%" height={310}>
            <BarChart data={seller.monthly} margin={{ top: 10, right: 8, left: 4, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7ece9" />
              <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="retidos" name="Retidos" stackId="positive" fill="#2f80ed" />
              <Bar dataKey="novos" name="Novos" stackId="positive" fill="#1d8f56" />
              <Bar dataKey="reativados" name="Reativados" stackId="positive" fill="#7b61ff" />
              <Bar dataKey="perdas" name="Saíram da ativa" fill="#d35454" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="cd-card cd-chart">
          <div className="cd-chart-head">
            <h3>Saúde da carteira</h3>
            <p>Recorrência e concentração acumuladas</p>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <PieChart>
              <Pie data={carteiraPie} dataKey="valor" nameKey="nome" cx="50%" cy="48%" innerRadius={52} outerRadius={82} paddingAngle={4}>
                <Cell fill="#1d8f56" />
                <Cell fill="#d9e2dd" />
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="cd-stat-row">
            <div className="cd-stat-box"><span>Top 3 clientes</span><strong>{formatPercent(seller.concentracaoTop3)}</strong></div>
            <div className="cd-stat-box"><span>Compra única</span><strong>{formatPercent((seller.compraUnica / seller.clientesUnicos) * 100)}</strong></div>
            <div className="cd-stat-box"><span>Comissão</span><strong>{formatCurrency(seller.comissao)}</strong></div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader kicker="Detalhamento" title="Indicadores mensais" subtitle="Leitura completa de valor, volume, margem, preço, desconto e carteira." />
        <div className="cd-card cd-table-wrap">
          <table className="cd-table">
            <thead>
              <tr>
                <th>Mês</th>
                <th>Faturamento</th>
                <th>Volume</th>
                <th>MC</th>
                <th>Margem</th>
                <th>TKM/Ton</th>
                <th>MC/Ton</th>
                <th>Desconto</th>
                <th>Clientes</th>
                <th>NCP</th>
              </tr>
            </thead>
            <tbody>
              {seller.monthly.map((item) => (
                <tr key={item.mes}>
                  <td><strong>{item.mes}</strong>{item.mes === 'JUN' && <div className="cd-client-reading">Parcial</div>}</td>
                  <td>{formatCurrency(item.faturamento, false)}</td>
                  <td>{formatKg(item.volume, false)}</td>
                  <td>{formatCurrency(item.mc, false)}</td>
                  <td>{formatPercent(item.margem)}</td>
                  <td>{formatCurrency(item.tkm, false)}</td>
                  <td>{formatCurrency(item.mcTon, false)}</td>
                  <td>{formatPercent(item.desconto)}</td>
                  <td>{item.clientes}</td>
                  <td>{formatCurrency(item.ncp, false)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <SectionHeader kicker="Pareto" title="Principais clientes" subtitle="Clientes que mais influenciam o resultado acumulado da carteira." />
        <div className="cd-card cd-table-wrap">
          <table className="cd-table">
            <thead><tr><th>Cliente</th><th>Faturamento</th><th>Participação</th><th>Leitura gerencial</th></tr></thead>
            <tbody>
              {seller.topClients.map((client) => (
                <tr key={client.nome}>
                  <td><div className="cd-client-name">{client.nome}</div></td>
                  <td><strong>{formatCurrency(client.faturamento, false)}</strong></td>
                  <td>
                    <div className="cd-mini-bar">
                      <strong>{formatPercent(client.participacao)}</strong>
                      <div className="cd-mini-bar-track"><span style={{ width: `${Math.min(100, client.participacao * 2.5)}%` }} /></div>
                    </div>
                  </td>
                  <td><div className="cd-client-reading">{client.leitura}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="cd-grid cd-grid-3">
        <div className="cd-card cd-insight-card">
          <h3>Pontos fortes</h3>
          <ul className="cd-list">
            {seller.pontosFortes.map((item) => <li key={item}><span className="cd-list-icon"><ShieldCheck size={13} /></span><span>{item}</span></li>)}
          </ul>
        </div>
        <div className="cd-card cd-insight-card">
          <h3>Riscos da carteira</h3>
          <ul className="cd-list cd-list-risk">
            {seller.riscos.map((item) => <li key={item}><span className="cd-list-icon"><AlertTriangle size={13} /></span><span>{item}</span></li>)}
          </ul>
        </div>
        <div className="cd-card cd-insight-card">
          <h3>Prioridades comerciais</h3>
          <ul className="cd-list cd-list-priority">
            {seller.prioridades.map((item) => <li key={item}><span className="cd-list-icon"><Target size={13} /></span><span>{item}</span></li>)}
          </ul>
        </div>
      </section>

      <section className="cd-card cd-diagnosis">
        <h3>Diagnóstico individual</h3>
        <p>{seller.diagnostico}</p>
      </section>
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>('executivo')
  const [menuOpen, setMenuOpen] = useState(false)

  const selectedSeller = page === 'executivo' ? null : sellers.find((seller) => seller.id === page) ?? sellers[0]

  function navigate(nextPage: Page) {
    setPage(nextPage)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="cd-app">
      <style>{css}</style>
      <div className="cd-shell">
        <aside className={`cd-sidebar ${menuOpen ? 'cd-open' : ''}`}>
          <button className="cd-close-btn" onClick={() => setMenuOpen(false)} aria-label="Fechar menu"><X size={22} /></button>
          <div className="cd-logo-wrap">
            <img src="/logo-campo.png" alt="Campo Nutrição Animal" className="cd-logo" />
            <div className="cd-brand"><strong>CAMPO</strong><span>Nutrição Animal</span></div>
          </div>

          <div className="cd-nav-label">Executivo</div>
          <nav className="cd-nav">
            <button className={page === 'executivo' ? 'cd-active' : ''} onClick={() => navigate('executivo')}>
              <BarChart3 size={18} />
              Dashboard Executivo
            </button>
          </nav>

          <div className="cd-nav-label">Análises individuais</div>
          <nav className="cd-nav">
            {sellers.map((seller) => (
              <button key={seller.id} className={page === seller.id ? 'cd-active' : ''} onClick={() => navigate(seller.id)}>
                <span className="cd-avatar">{seller.nome.charAt(0)}</span>
                <span>{seller.nome}</span>
              </button>
            ))}
          </nav>

          <div className="cd-sidebar-note">
            <strong>Critério de leitura</strong><br />
            2025 c/KAM mostra o tamanho total anterior. 2025 s/KAM é a base comparável. 2026 mede a evolução orgânica da operação interna.
          </div>
        </aside>

        <main className="cd-main">
          <header className="cd-topbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <button className="cd-menu-btn" onClick={() => setMenuOpen(true)} aria-label="Abrir menu"><Menu size={22} /></button>
              <div>
                <h1>{page === 'executivo' ? 'Dashboard Executivo Comercial' : selectedSeller?.nome}</h1>
                <p>{page === 'executivo' ? 'Visão macro da operação, carteira, mix e comparação histórica' : selectedSeller?.perfil}</p>
              </div>
            </div>
            <div className="cd-period"><Activity size={15} /><span>Atualização: <strong>Junho/2026 parcial</strong></span></div>
          </header>

          <div className="cd-content">
            {page === 'executivo' ? (
              <ExecutiveDashboard onSelectSeller={(id) => navigate(id)} />
            ) : (
              selectedSeller && <SellerDashboard seller={selectedSeller} />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
