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

      <section className="profile-card">
        <h2>Análise e Plano de Ação — Médio Prazo</h2>

        <p>{vendedor.diagnosticoDesenvolvimento}</p>

        <ul className="pill-list">
          {vendedor.planoAcaoMedioPrazo.map((acao: string) => (
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
