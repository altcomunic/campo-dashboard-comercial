import { useMemo, useState } from 'react'
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts'
import { BarChart3, Users, TrendingUp, Settings, Target, FileDown } from 'lucide-react'
import { Card, ChartCard, ListCard } from './components/Cards'
import { carteiraEquipe, equipeComparativo, margemEquipe, mixEquipe2026, vendedores } from './data/dashboardData'

function formatCurrency(v: number) {
  return `R$ ${Number(v).toLocaleString('pt-BR')}`
}

export default function App() {
  const [visao, setVisao] = useState<'equipe' | 'individual'>('equipe')
  const [selecionado, setSelecionado] = useState('renata')
  const vendedor = useMemo(() => vendedores.find((v) => v.id === selecionado) ?? vendedores[0], [selecionado])
  const clientesAtivosMaio = vendedor.carteira[vendedor.carteira.length - 1].ativos

  return (
    <div className="app">
      <aside className="sidebar">
        <img src="/logo-campo.png" className="logo" />
        <nav className="nav">
          <button onClick={() => setVisao('equipe')} className={visao === 'equipe' ? 'active' : ''}><BarChart3 size={18}/> Visão Geral</button>
          <button onClick={() => setVisao('individual')} className={visao === 'individual' ? 'active' : ''}><Users size={18}/> Equipe Comercial</button>
          {vendedores.map((v) => (
            <button key={v.id} onClick={() => { setVisao('individual'); setSelecionado(v.id) }} className={visao === 'individual' && selecionado === v.id ? 'active seller' : 'seller'}>
              <span className="avatar-mini">{v.nome[0]}</span> {v.nome}
            </button>
          ))}
          <button><TrendingUp size={18}/> Comparativo 2025 x 2026</button>
          <button><Target size={18}/> Plano de Ação</button>
          <button><FileDown size={18}/> Exportar PDF</button>
          <button><Settings size={18}/> Configurações</button>
        </nav>
        <div className="sidebar-footer">CAMPO<br/><span>Nutrição Animal</span></div>
      </aside>

      <main className="content">
        <header className="topbar">
          <div>
            <h1>Dashboard Executivo Comercial</h1>
            <p>{visao === 'equipe' ? 'Visão Geral da Operação' : `Análise Individual — ${vendedor.nome}`}</p>
          </div>
          <div className="filters">
            <span>Período: <b>Maio/2026 (Parcial)</b></span>
            <button className="export">Exportar</button>
          </div>
        </header>

        {visao === 'equipe' ? <EquipeDashboard /> : <IndividualDashboard vendedor={vendedor} clientesAtivosMaio={clientesAtivosMaio} />}
      </main>
    </div>
  )
}

function EquipeDashboard() {
  return (
    <div className="dashboard">
      <section className="kpi-grid">
        <Card titulo="Faturamento 2026" valor="R$ 3,77 Mi" subtitulo="Resultado parcial atualizado" />
        <Card titulo="Venda Gerada" valor="R$ 4,21 Mi" subtitulo="Capacidade comercial real" />
        <Card titulo="Margem Média" valor="18,2%" subtitulo="+4,5 p.p vs 2025" />
        <Card titulo="Clientes Mov." valor="40" subtitulo="Maior patamar do ano" />
        <Card titulo="Novos Clientes" valor="7" subtitulo="Maio parcial" />
      </section>

      <section className="grid-2">
        <ChartCard titulo="Comparativo de Faturamento — Com KAM x Sem KAM">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={equipeComparativo}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" /><YAxis /><Tooltip formatter={(v) => formatCurrency(Number(v))} /><Legend />
              <Bar dataKey="comKam2025" name="2025 c/ KAM" fill="#7c3aed" radius={[8,8,0,0]} />
              <Bar dataKey="semKam2025" name="2025 s/ KAM" fill="#2563eb" radius={[8,8,0,0]} />
              <Bar dataKey="atual2026" name="2026 atual" fill="#15803d" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard titulo="Evolução da Carteira — 2026">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={carteiraEquipe}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" /><YAxis /><Tooltip /><Legend />
              <Line type="monotone" dataKey="ativos" name="Ativos" stroke="#2563eb" strokeWidth={3} />
              <Line type="monotone" dataKey="novos" name="Novos" stroke="#16a34a" strokeWidth={3} />
              <Line type="monotone" dataKey="reativados" name="Reativados" stroke="#9333ea" strokeWidth={3} />
              <Line type="monotone" dataKey="total" name="Total" stroke="#064e3b" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section className="grid-2">
        <ChartCard titulo="Mix Estratégico da Equipe — 2026">
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={mixEquipe2026}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" /><YAxis /><Tooltip formatter={(v) => formatCurrency(Number(v))} /><Legend />
              <Area type="monotone" dataKey="MIN" stackId="1" stroke="#2563eb" fill="#2563eb" />
              <Area type="monotone" dataKey="NCP" stackId="1" stroke="#7c3aed" fill="#7c3aed" />
              <Area type="monotone" dataKey="PE" stackId="1" stroke="#16a34a" fill="#16a34a" />
              <Area type="monotone" dataKey="RA" stackId="1" stroke="#f97316" fill="#f97316" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard titulo="Margem Comercial — 2025 s/ KAM x 2026">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={margemEquipe}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" /><YAxis /><Tooltip formatter={(v) => `${v}%`} /><Legend />
              <Line type="monotone" dataKey="semKam2025" name="2025 s/ KAM" stroke="#2563eb" strokeWidth={3} />
              <Line type="monotone" dataKey="atual2026" name="2026 atual" stroke="#15803d" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section className="diagnosis">
        <h3>Diagnóstico Executivo</h3>
        <p>A operação de 2026 demonstra evolução estrutural relevante, mantendo competitividade de faturamento mesmo sem uma carteira dedicada de KAM. Maio ainda não está totalmente fechado, mas já apresenta o maior patamar de clientes movimentados do ano, com 40 clientes. A evolução está na qualidade comercial da receita: maior participação de linhas estratégicas, menor dependência relativa de ração e evolução consistente de margem.</p>
      </section>
    </div>
  )
}

function IndividualDashboard({ vendedor, clientesAtivosMaio }: any) {
  return (
    <div className="dashboard">
      <section className="kpi-grid">
        <Card titulo="Vendedor" valor={vendedor.nome} subtitulo={vendedor.perfil} />
        <Card titulo="Meta Maio" valor={formatCurrency(vendedor.dados[4].meta)} />
        <Card titulo="Realizado Maio" valor={formatCurrency(vendedor.dados[4].realizado)} />
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
              <XAxis dataKey="mes" /><YAxis /><Tooltip formatter={(v) => formatCurrency(Number(v))} /><Legend />
              <Bar dataKey="venda" name="Venda Gerada" fill="#15803d" radius={[8,8,0,0]} />
              <Bar dataKey="faturado" name="Faturado" fill="#2563eb" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard titulo="Volume x Valor (% de atingimento)">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={vendedor.dados}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" /><YAxis /><Tooltip formatter={(v) => `${v}%`} /><Legend />
              <Line type="monotone" dataKey="volume" name="% Volume" stroke="#15803d" strokeWidth={3} />
              <Line type="monotone" dataKey="valor" name="% Valor" stroke="#f97316" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section className="grid-2">
        <ChartCard titulo="Evolução da Carteira">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vendedor.carteira}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" /><YAxis /><Tooltip /><Legend />
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
              <XAxis dataKey="mes" /><YAxis /><Tooltip formatter={(v) => formatCurrency(Number(v))} /><Legend />
              <Bar dataKey="MIN" stackId="a" fill="#2563eb" />
              <Bar dataKey="NCP" stackId="a" fill="#7c3aed" />
              <Bar dataKey="PE" stackId="a" fill="#16a34a" />
              <Bar dataKey="RA" stackId="a" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section className="grid-2">
        <ListCard titulo="Pontos Fortes" itens={vendedor.pontosFortes} tipo="forte" />
        <ListCard titulo="Pontos de Desenvolvimento" itens={vendedor.desenvolvimento} tipo="desenvolvimento" />
      </section>
    </div>
  )
}
