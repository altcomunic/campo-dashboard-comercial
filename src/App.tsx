import { useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { BarChart3, Users } from 'lucide-react'
import { Card, ChartCard, ListCard } from './components/Cards'
import {
  carteiraEquipe,
  equipeComparativo,
  margemEquipe,
  mixEquipe2026,
  vendedores,
} from './data/dashboardData'

function formatCurrency(v: number) {
  return `R$ ${Number(v).toLocaleString('pt-BR')}`
}

export default function App() {
  const [visao, setVisao] = useState<'equipe' | 'individual'>('equipe')
  const [selecionado, setSelecionado] = useState('renata')

  const vendedor = useMemo(
    () => vendedores.find((v) => v.id === selecionado) ?? vendedores[0],
    [selecionado],
  )

  const clientesAtivosMaio =
    vendedor.carteira[vendedor.carteira.length - 1].ativos

  return (
    <div className="app">
      <aside className="sidebar">
        <img src="/logo-campo.png" className="logo" />

        <nav className="nav">
          <button
            onClick={() => setVisao('equipe')}
            className={visao === 'equipe' ? 'active' : ''}
          >
            <BarChart3 size={18} />
            Visão Geral
          </button>

          <button
            onClick={() => setVisao('individual')}
            className={visao === 'individual' ? 'active' : ''}
          >
            <Users size={18} />
            Equipe Comercial
          </button>

          {vendedores.map((v) => (
            <button
              key={v.id}
              onClick={() => {
                setVisao('individual')
                setSelecionado(v.id)
              }}
              className={
                visao === 'individual' && selecionado === v.id
                  ? 'active seller'
                  : 'seller'
              }
            >
              <span className="avatar-mini">{v.nome[0]}</span>
              {v.nome}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          CAMPO
          <br />
          <span>Nutrição Animal</span>
        </div>
      </aside>

      <main className="content">
        <header className="topbar">
          <div>
            <h1>Dashboard Executivo Comercial</h1>
            <p>
              {visao === 'equipe'
                ? 'Visão Geral da Operação'
                : `Análise Individual — ${vendedor.nome}`}
            </p>
          </div>

          <div className="filters">
            <span>
              Período: <b>Maio/2026 Fechado</b>
            </span>
          </div>
        </header>

        {visao === 'equipe' ? (
          <EquipeDashboard />
        ) : (
          <IndividualDashboard
            vendedor={vendedor}
            clientesAtivosMaio={clientesAtivosMaio}
          />
        )}
      </main>
    </div>
  )
}

function EquipeDashboard() {
  return (
    <div className="dashboard">
      <section className="kpi-grid">
        <Card
          titulo="Faturamento 2026"
          valor="R$ 3,85 Mi"
          subtitulo="Jan a Mai fechado"
        />

        <Card
          titulo="Faturamento Maio"
          valor="R$ 879,8 mil"
          subtitulo="Vendas Internas"
        />

        <Card
          titulo="Margem Maio"
          valor="19,1%"
          subtitulo="Acima de 2025 c/ e s/ KAM"
        />

        <Card
          titulo="Clientes Mov."
          valor="42"
          subtitulo="Maior patamar do ano"
        />

        <Card
          titulo="Novos + Reativados"
          valor="12"
          subtitulo="7 novos e 5 reativados"
        />
      </section>

      <section className="grid-2">
        <ChartCard titulo="Comparativo de Faturamento — 2025 c/ KAM x 2025 s/ KAM x 2026">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={equipeComparativo}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip formatter={(v) => formatCurrency(Number(v))} />
              <Legend />

              <Bar
                dataKey="comKam2025"
                name="2025 c/ KAM"
                fill="#7c3aed"
                radius={[8, 8, 0, 0]}
              />

              <Bar
                dataKey="semKam2025"
                name="2025 s/ KAM"
                fill="#2563eb"
                radius={[8, 8, 0, 0]}
              />

              <Bar
                dataKey="atual2026"
                name="2026 atual"
                fill="#15803d"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard titulo="Evolução da Carteira — 2026">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={carteiraEquipe}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Line
                type="monotone"
                dataKey="ativos"
                name="Ativos"
                stroke="#2563eb"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="novos"
                name="Novos"
                stroke="#16a34a"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="reativados"
                name="Reativados"
                stroke="#9333ea"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="total"
                name="Total"
                stroke="#064e3b"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section className="grid-2">
        <ChartCard titulo="Mix Estratégico da Equipe — 2026">
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={mixEquipe2026}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip formatter={(v) => formatCurrency(Number(v))} />
              <Legend />

              <Area
                type="monotone"
                dataKey="MIN"
                stackId="1"
                stroke="#2563eb"
                fill="#2563eb"
              />

              <Area
                type="monotone"
                dataKey="NCP"
                stackId="1"
                stroke="#7c3aed"
                fill="#7c3aed"
              />

              <Area
                type="monotone"
                dataKey="PE"
                stackId="1"
                stroke="#16a34a"
                fill="#16a34a"
              />

              <Area
                type="monotone"
                dataKey="RA"
                stackId="1"
                stroke="#f97316"
                fill="#f97316"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard titulo="Margem Comercial — 2025 c/ KAM x 2025 s/ KAM x 2026">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={margemEquipe}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip formatter={(v) => `${v}%`} />
              <Legend />

              <Line
  type="monotone"
  dataKey="comKam2025"
  name="2025 c/ KAM"
  stroke="#7c3aed"
  strokeWidth={3}
  dot={{ r: 4 }}
/>

              <Line
                type="monotone"
                dataKey="semKam2025"
                name="2025 s/ KAM"
                stroke="#2563eb"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="atual2026"
                name="2026 atual"
                stroke="#15803d"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section className="diagnosis">
        <h3>Diagnóstico Executivo</h3>

        <p>
          A operação de Vendas Internas encerra maio com evolução estrutural
          relevante, atingindo R$ 879,8 mil em faturamento, 19,1% de margem
          comercial e 42 clientes movimentados, maior patamar do ano até o
          momento.
        </p>

        <p>
          O comparativo mais justo permanece sendo 2025 sem KAM versus 2026,
          pois a estrutura atual não conta com uma carteira dedicada de grandes
          contas. Mesmo assim, a equipe atual mantém competitividade superior em
          faturamento acumulado e apresenta melhora importante na qualidade da
          receita.
        </p>

        <p>
          O principal ganho estratégico está na composição do mix e na margem:
          maio mostra maior participação de NCP e PE, menor dependência relativa
          de ração e margem acima dos cenários históricos de 2025 com e sem KAM.
        </p>

        <p>
          A prioridade para o próximo ciclo é transformar essa movimentação de
          carteira em previsibilidade recorrente, reduzindo oscilações por
          vendedor, fortalecendo a disciplina de CRM e desenvolvendo planos de
          ação individuais focados em expansão, retenção e qualidade comercial.
        </p>
      </section>
    </div>
  )
}

function IndividualDashboard({
  vendedor,
  clientesAtivosMaio,
}: {
  vendedor: any
  clientesAtivosMaio: number
}) {
  return (
    <div className="dashboard">
      <section className="kpi-grid">
        <Card
          titulo="Vendedor"
          valor={vendedor.nome}
          subtitulo={vendedor.perfil}
        />

        <Card
          titulo="Meta Maio"
          valor={formatCurrency(vendedor.dados[4].meta)}
        />

        <Card
          titulo="Realizado Maio"
          valor={formatCurrency(vendedor.dados[4].realizado)}
        />

        <Card titulo="% Realizado" valor={`${vendedor.dados[4].valor}%`} />

        <Card titulo="Clientes Ativos" valor={clientesAtivosMaio} />
      </section>

      <section className="profile-card">
        <h2>{vendedor.perfil}</h2>
        <p>{vendedor.resumo}</p>
      </section>

      <section className="grid-2">
        <ChartCard titulo="Venda Gerada x Faturamento">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vendedor.vendaGerada}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip formatter={(v) => formatCurrency(Number(v))} />
              <Legend />

              <Bar
                dataKey="venda"
                name="Venda Gerada"
                fill="#15803d"
                radius={[8, 8, 0, 0]}
              />

              <Bar
                dataKey="faturado"
                name="Faturado"
                fill="#2563eb"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard titulo="Volume x Valor (% de atingimento)">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={vendedor.dados}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip formatter={(v) => `${v}%`} />
              <Legend />

              <Line
                type="monotone"
                dataKey="volume"
                name="% Volume"
                stroke="#15803d"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="valor"
                name="% Valor"
                stroke="#f97316"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section className="grid-2">
        <ChartCard titulo="Evolução da Carteira">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vendedor.carteira}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Bar dataKey="ativos" name="Ativos" fill="#2563eb" />
              <Bar dataKey="novos" name="Novos" fill="#16a34a" />
              <Bar dataKey="reativados" name="Reativados" fill="#9333ea" />
              <Bar dataKey="perdas" name="Perdas" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard titulo="Mix de Produtos">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vendedor.mix}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip formatter={(v) => formatCurrency(Number(v))} />
              <Legend />

              <Bar dataKey="MIN" stackId="a" fill="#2563eb" />
              <Bar dataKey="NCP" stackId="a" fill="#7c3aed" />
              <Bar dataKey="PE" stackId="a" fill="#16a34a" />
              <Bar dataKey="RA" stackId="a" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section className="development-grid">
  <div className="profile-card">
    <h2>Diagnóstico</h2>
    <p>{vendedor.desenvolvimentoProfissional?.diagnostico}</p>
  </div>

  <div className="profile-card">
    <h2>Objetivo de Curto Prazo</h2>
    <ul className="pill-list">
      {vendedor.desenvolvimentoProfissional?.objetivoCurtoPrazo?.map(
        (item: string) => (
          <li key={item} className="pill pill-green">
            {item}
          </li>
        ),
      )}
    </ul>
  </div>

  <div className="profile-card">
    <h2>Objetivo de Médio Prazo</h2>
    <ul className="pill-list">
      {vendedor.desenvolvimentoProfissional?.objetivoMedioPrazo?.map(
        (item: string) => (
          <li key={item} className="pill pill-amber">
            {item}
          </li>
        ),
      )}
    </ul>
  </div>

  <div className="profile-card">
    <h2>Plano de Ação</h2>
    <ul className="pill-list">
      {vendedor.desenvolvimentoProfissional?.planoAcao?.map(
        (item: string) => (
          <li key={item} className="pill pill-green">
            {item}
          </li>
        ),
      )}
    </ul>
  </div>
</section>

<ul className="pill-list">
  {(vendedor.planoAcaoMedioPrazo ?? []).map((acao: string) => (
    <li key={acao} className="pill pill-green">
      {acao}
    </li>
  ))}
</ul>
      </section>

      <section className="grid-2">
        <ListCard
          titulo="Pontos Fortes"
          itens={vendedor.pontosFortes}
          tipo="forte"
        />

        <ListCard
          titulo="Pontos de Desenvolvimento"
          itens={vendedor.desenvolvimento}
          tipo="desenvolvimento"
        />
      </section>
    </div>
  )
}
