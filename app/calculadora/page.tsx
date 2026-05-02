'use client';

import { useState } from 'react';
import {
  calcular,
  formatearPesos,
  TIPOS_OBRA,
  TERMINACIONES,
  type TipoObra,
  type Terminacion,
  type ResultadoCalculo,
} from '@/lib/calculos';

const TERMINACION_DESC: Record<Terminacion, string> = {
  'Básico':  'Materiales estándar, funcional',
  'Medio':   'Buena calidad, acabados cuidados',
  'Alto':    'Premium, materiales de diseño',
};

export default function CalculadoraPage() {
  const [tipo, setTipo]             = useState<TipoObra>(TIPOS_OBRA[0]);
  const [superficie, setSuperficie] = useState<string>('');
  const [terminacion, setTerminacion] = useState<Terminacion>('Medio');
  const [resultado, setResultado]   = useState<ResultadoCalculo | null>(null);
  const [error, setError]           = useState<string>('');
  const [pagando, setPagando]       = useState(false);

  function handleCalcular() {
    const m2 = parseFloat(superficie);
    if (!m2 || m2 < 5)  { setError('Ingresa una superficie mínima de 5 m².'); return; }
    if (m2 > 2000)      { setError('La superficie máxima permitida es 2.000 m².'); return; }
    setError('');
    const res = calcular(tipo, m2, terminacion);
    setResultado(res);
    localStorage.setItem(
      'calculadora_resultado',
      JSON.stringify({ tipo, superficie: m2, terminacion, ...res }),
    );
  }

  async function handlePagar() {
    if (!resultado) return;
    setPagando(true);
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo, superficie: parseFloat(superficie), terminacion }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) { setPagando(false); return; }
      window.location.href = data.url;
    } catch {
      setPagando(false);
    }
  }

  const totalDesglose = resultado
    ? resultado.desglose.obraGruesa + resultado.desglose.terminaciones + resultado.desglose.instalaciones
    : 0;

  const desglose = resultado
    ? [
        {
          label: 'Obra gruesa',
          key: 'obraGruesa' as const,
          pct: Math.round(resultado.desglose.obraGruesa / totalDesglose * 100),
        },
        {
          label: 'Terminaciones',
          key: 'terminaciones' as const,
          pct: Math.round(resultado.desglose.terminaciones / totalDesglose * 100),
        },
        {
          label: 'Instalaciones',
          key: 'instalaciones' as const,
          pct: 100 - Math.round(resultado.desglose.obraGruesa / totalDesglose * 100) - Math.round(resultado.desglose.terminaciones / totalDesglose * 100),
        },
      ]
    : [];

  return (
    <main className="min-h-screen bg-slate-50 px-6 pt-28 pb-20">
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-widest text-[#f97316] uppercase mb-2">
            Presupuesto referencial
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            Calcula el costo de tu proyecto
          </h1>
        </div>

        {/* Card formulario */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex flex-col gap-7">

          {/* Tipo de proyecto */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">Tipo de proyecto</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TIPOS_OBRA.map((t) => (
                <button
                  key={t}
                  onClick={() => { setTipo(t); setResultado(null); }}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-colors text-center ${
                    tipo === t
                      ? 'bg-[#f97316] border-[#f97316] text-white'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-[#f97316] hover:text-[#f97316]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Superficie */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">Superficie (m²)</label>
            <input
              type="number"
              min={5}
              max={2000}
              value={superficie}
              onChange={(e) => { setSuperficie(e.target.value); setError(''); setResultado(null); }}
              placeholder="Ej: 40"
              className="border border-slate-200 rounded-xl px-4 py-3 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#f97316] transition"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          {/* Terminación — pills */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">Nivel de terminación</label>
            <div className="grid grid-cols-3 gap-2">
              {TERMINACIONES.map((t) => (
                <button
                  key={t}
                  onClick={() => { setTerminacion(t); setResultado(null); }}
                  className={`flex flex-col items-center px-3 py-3 rounded-xl text-sm border transition-colors ${
                    terminacion === t
                      ? 'bg-[#f97316] border-[#f97316] text-white'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-[#f97316] hover:text-[#f97316]'
                  }`}
                >
                  <span className="font-semibold">{t}</span>
                  <span className={`text-[10px] mt-0.5 leading-tight text-center ${terminacion === t ? 'text-white/80' : 'text-slate-400'}`}>
                    {TERMINACION_DESC[t]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleCalcular}
            className="bg-[#f97316] hover:bg-[#ea6c0a] active:bg-[#dc5c03] text-white font-semibold text-base px-8 py-4 rounded-xl transition-colors"
          >
            Calcular presupuesto
          </button>
        </div>

        {/* Resultado */}
        {resultado && (
          <div className="mt-6 bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex flex-col gap-8">

            {/* Rango */}
            <div>
              <p className="text-xs font-semibold tracking-widest text-[#f97316] uppercase mb-3">
                Rango estimado total
              </p>
              <p className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                {formatearPesos(resultado.costoMin)}{' '}
                <span className="text-slate-300">—</span>{' '}
                {formatearPesos(resultado.costoMax)}
              </p>
              <p className="text-sm text-slate-500 mt-2">
                Valor referencial por m²:{' '}
                <span className="font-semibold text-slate-700">{formatearPesos(resultado.valorM2)}</span>
              </p>
            </div>

            {/* Desglose dinámico */}
            <div className="flex flex-col gap-5">
              <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                Distribución estimada del presupuesto
              </p>
              {desglose.map(({ label, pct }) => (
                <div key={label}>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      {label}
                    </span>
                    <span className="text-sm font-semibold text-slate-500">{pct}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-[#f97316] h-2 rounded-full transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* PDF CTA */}
            <div className="flex flex-col items-center gap-3 pt-1">
              <p className="text-xs font-semibold text-slate-700 text-center uppercase tracking-wide">
                Un error en esta etapa puede costarte millones en la obra
              </p>
              <button
                onClick={handlePagar}
                disabled={pagando}
                className="w-full bg-[#f97316] hover:bg-[#ea6c0a] active:bg-[#dc5c03] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-base px-8 py-4 rounded-xl transition-colors"
              >
                {pagando ? 'Redirigiendo…' : 'Desbloquear presupuesto completo'}
              </button>
              <p className="text-xs text-slate-400 text-center">
                Recibirás un informe profesional descargable en PDF
              </p>
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-slate-400 line-through">$18.990</span>
                  <span className="font-bold text-slate-900">$8.990</span>
                  <span className="text-[#f97316] font-semibold">hoy</span>
                </div>
                <p className="text-[11px] text-slate-400">Precio de lanzamiento por tiempo limitado</p>
              </div>
              <ul className="flex flex-col gap-1.5 w-full">
                <li className="text-xs text-slate-500">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wide block mb-1">Incluye</span>
                </li>
                {[
                  'Desglose completo por partidas',
                  'Costos reales por etapa de obra',
                  'Base clara para cotizar con constructor',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-slate-500">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M2 6l2.5 2.5L10 4" stroke="#f97316" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}
