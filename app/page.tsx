import Link from 'next/link';

const pasos = [
  {
    num: '01',
    titulo: 'Elige tu proyecto',
    desc: 'Quincho, cocina, baño, ampliación o local comercial. Selecciona el tipo y la superficie estimada.',
  },
  {
    num: '02',
    titulo: 'Define la terminación',
    desc: 'Básico, Medio o Alto. Cada nivel refleja materiales y acabados distintos con precios reales de mercado.',
  },
  {
    num: '03',
    titulo: 'Obtén tu presupuesto',
    desc: 'Rango de costo instantáneo con desglose por partidas. Descarga el PDF profesional para llevar a tu contratista.',
  },
];

const beneficios = [
  {
    titulo: 'Precios de mercado reales',
    desc: 'Calibrado con +500 presupuestos formales de obras ejecutadas en Santiago por un equipo profesional en arquitectura y construcción.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path d="M11 2L3 6v10l8 4 8-4V6L11 2Z" stroke="#f97316" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M11 2v14M3 6l8 4 8-4" stroke="#f97316" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    titulo: 'Resultado en segundos',
    desc: 'Sin formularios ni registro. Ingresa superficie y terminación, obtén el rango de costo al instante.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <circle cx="11" cy="11" r="8.5" stroke="#f97316" strokeWidth="1.8" />
        <path d="M11 7v4.5l3 1.5" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    titulo: 'Informe PDF profesional',
    desc: 'Desglose completo por partidas más texto listo para enviar a tu contratista o presentar a financistas.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <rect x="4" y="2" width="14" height="18" rx="2" stroke="#f97316" strokeWidth="1.8" />
        <path d="M8 7h6M8 11h6M8 15h4" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="hero-pattern pt-36 pb-28 px-6">
        <div className="max-w-3xl mx-auto text-center">

          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-medium px-4 py-1.5 rounded-full mb-8 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] inline-block" />
            Basado en experiencia real en proyectos construidos en Chile
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6 text-balance">
            ¿Cuánto cuesta construir tu{' '}
            <span className="text-[#f97316]">proyecto</span> en Chile?
          </h1>

          <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto leading-relaxed">
            Calcula un presupuesto realista en segundos, basado en costos actuales en Chile.
          </p>

          <Link
            href="/calculadora"
            className="inline-block bg-[#f97316] hover:bg-[#ea6c0a] active:bg-[#dc5c03] text-white font-semibold text-lg px-10 py-4 rounded-xl transition-colors shadow-lg shadow-orange-500/30"
          >
            Calcular ahora →
          </Link>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-10">
            {['Sin registro', 'Resultado inmediato', 'Informe profesional descargable'].map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-sm text-slate-400">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M2.5 7l3 3 6-6" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ────────────────────────────────────────────────── */}
      <section className="bg-white px-6 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-[#f97316] uppercase text-center mb-3">
            Cómo funciona
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-14">
            Tres pasos, resultado inmediato
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pasos.map((p) => (
              <div key={p.num} className="flex flex-col gap-4">
                <span className="text-5xl font-black text-slate-100 leading-none select-none">
                  {p.num}
                </span>
                <h3 className="text-base font-bold text-slate-900">{p.titulo}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFICIOS ───────────────────────────────────────────────────── */}
      <section className="bg-slate-50 px-6 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-[#f97316] uppercase text-center mb-3">
            Por qué usarlo
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-14">
            Evita sorpresas antes de comenzar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {beneficios.map((b) => (
              <div
                key={b.titulo}
                className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm flex flex-col gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                  {b.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900">{b.titulo}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────────────── */}
      <section className="hero-pattern px-6 py-24 md:py-32">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Comienza tu estimación ahora
          </h2>
          <p className="text-slate-300 mb-10 text-base">
            Gratis, sin registro. Resultado en menos de 30 segundos.
          </p>
          <Link
            href="/calculadora"
            className="inline-block bg-[#f97316] hover:bg-[#ea6c0a] active:bg-[#dc5c03] text-white font-semibold text-lg px-10 py-4 rounded-xl transition-colors shadow-lg shadow-orange-500/30"
          >
            Calcular ahora →
          </Link>
        </div>
      </section>

    </main>
  );
}
