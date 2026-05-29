import React from 'react'

export function Card({ titulo, valor, subtitulo }: { titulo: string; valor: string | number; subtitulo?: string }) {
  return (
    <div className="card">
      <p className="card-title">{titulo}</p>
      <h3 className="card-value">{valor}</h3>
      {subtitulo && <p className="card-subtitle">{subtitulo}</p>}
    </div>
  )
}

export function ChartCard({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="chart-card">
      <h3 className="chart-title">{titulo}</h3>
      {children}
    </div>
  )
}

export function ListCard({ titulo, itens, tipo }: { titulo: string; itens: string[]; tipo: 'forte' | 'desenvolvimento' }) {
  return (
    <div className="chart-card">
      <h3 className="chart-title">{titulo}</h3>
      <ul className="pill-list">
        {itens.map((item) => (
          <li key={item} className={tipo === 'forte' ? 'pill pill-green' : 'pill pill-amber'}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
