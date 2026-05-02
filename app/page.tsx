import Link from 'next/link';

const pasos = [
  {
    num: '01',
    titulo: 'Elige tu proyecto',
    desc: 'Quincho, cocina, baño, ampliación, cobertizo o local comercial. Selecciona el tipo y la superficie estimada.',
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

const precios = [
  { tipo: 'Quincho',          rango: '$350.000 – $700.000 / m²' },
  { tipo: 'Cobertizo',        rango: '$220.000 – $480.000 / m²' },
  { tipo: 'Cocina',           rango: '$280.000 – $540.000 / m²' },
  { tipo: 'Ampliación',       rango: '$320.000 – $600.000 / m²' },
  { tipo: 'Baño',             rango: '$400.000 – $800.000 / m²' },
  { tipo: 'Local comercial',  rango: '$380.000 – $750.000 / m²' },
];

const faqs = [
  {
    q: '¿Cuánto cuesta construir un quincho en Chile?',
    a: 'El costo de un quincho en Chile varía entre $350.000 y $700.000 por m², según el nivel de terminación. Un quincho de 30 m² con terminación media puede costar entre $12.000.000 y $16.000.000 CLP. Usa nuestra calculadora para obtener un presupuesto exacto según tu superficie y materiales.',
  },
  {
    q: '¿Cuánto cuesta ampliar una casa en Chile?',
    a: 'Una ampliación de casa en Chile tiene un valor referencial de $320.000 a $600.000 por m². Para una ampliación de 20 m² con terminación media, el presupuesto estimado es de $8.000.000 a $12.000.000 CLP. El precio final depende del diseño, los materiales y las condiciones del terreno.',
  },
  {
    q: '¿Cuánto vale el metro cuadrado de construcción en Chile?',
    a: 'El valor del m² de construcción en Chile en 2025 varía según el tipo de obra y nivel de terminación: desde $200.000/m² para construcciones básicas hasta $800.000/m² para proyectos de alto estándar. Los valores más frecuentes para obras residenciales en Santiago están entre $350.000 y $600.000 por m².',
  },
  {
    q: '¿Cuánto cuesta remodelar o construir un baño en Chile?',
    a: 'Construir o remodelar un baño en Chile cuesta entre $400.000 y $800.000 por m². Un baño de 4 m² con terminación media tiene un costo referencial de $1.800.000 a $2.800.000 CLP, incluyendo instalaciones sanitarias, revestimientos y artefactos.',
  },
  {
    q: '¿Cuánto cuesta construir un cobertizo?',
    a: 'Un cobertizo metálico o de estructura liviana en Chile cuesta entre $220.000 y $480.000 por m². Para un cobertizo de 20 m², el presupuesto va de $4.400.000 a $9.600.000 CLP según materiales. Es el tipo de construcción más económico por metro cuadrado.',
  },
  {
    q: '¿Qué incluye el informe PDF de CalculaTuObra.cl?',
    a: 'El informe incluye el rango de costo total del proyecto, el desglose por partidas (obra gruesa, terminaciones e instalaciones), el porcentaje de cada partida y un texto profesional listo para enviar a tu contratista o presentar a un banco.',
  },
  {
    q: '¿Para qué sirve saber el presupuesto antes de contratar?',
    a: 'Conocer el rango de costo antes de hablar con un contratista te permite negociar con más información, detectar presupuestos inflados, planificar el financiamiento y evitar las sorpresas más comunes que elevan el costo final de una obra entre un 20% y un 40%.',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="hero-pattern pt-36 pb-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-medium px-4 py-1.5 rounded-full mb-8 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] inline-block" />
            Basado en experiencia real en proyectos construidos en Chile
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6 text-balance">
            ¿Cuánto cuesta construir tu{' '}
            <span className="text-[#f97316]">proyecto</span> en Chile?
          </h1>

          <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto leading-relaxed">
            Calcula el presupuesto de tu quincho, ampliación, cocina, baño o cobertizo en segundos, con precios actuales del mercado chileno.
          </p>

          <Link
            href="/calculadora"
            className="inline-block bg-[#f97316] hover:bg-[#ea6c0a] active:bg-[#dc5c03] text-white font-semibold text-lg px-10 py-4 rounded-xl transition-colors shadow-lg shadow-orange-500/30"
          >
            Calcular ahora →
          </Link>

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

      {/* ── PRECIOS DE REFERENCIA ────────────────────────────────────────── */}
      <section className="bg-white px-6 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-[#f97316] uppercase text-center mb-3">
            Valores referenciales 2025
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-3">
            Costo de construcción por m² en Chile
          </h2>
          <p className="text-sm text-slate-500 text-center mb-10 max-w-lg mx-auto">
            Rangos orientativos según tipo de obra y nivel de terminación. Usa la calculadora para obtener el presupuesto exacto de tu proyecto.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {precios.map(({ tipo, rango }) => (
              <div key={tipo} className="border border-slate-100 rounded-xl p-5 flex flex-col gap-1.5 hover:border-[#f97316]/40 transition-colors">
                <span className="text-sm font-semibold text-slate-900">{tipo}</span>
                <span className="text-xs text-[#f97316] font-medium">{rango}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 text-center mt-5">
            Valores en pesos chilenos (CLP). Precios de referencia para obras en la Región Metropolitana.
          </p>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ────────────────────────────────────────────────── */}
      <section className="bg-slate-50 px-6 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-[#f97316] uppercase text-center mb-3">
            Cómo funciona
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-14">
            Tu presupuesto de construcción en 3 pasos
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
      <section className="bg-white px-6 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-[#f97316] uppercase text-center mb-3">
            Por qué usarlo
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-14">
            Evita sorpresas antes de comenzar tu obra
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

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 px-6 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-[#f97316] uppercase text-center mb-3">
            Preguntas frecuentes
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
            Todo sobre costos de construcción en Chile
          </h2>
          <div className="flex flex-col divide-y divide-slate-200">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group py-5 cursor-pointer list-none">
                <summary className="flex items-center justify-between gap-4 font-semibold text-slate-900 text-sm md:text-base select-none list-none">
                  {q}
                  <svg
                    width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden
                    className="flex-shrink-0 transition-transform group-open:rotate-180"
                  >
                    <path d="M3 6l5 5 5-5" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm text-slate-500 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────────────── */}
      <section className="hero-pattern px-6 py-24 md:py-32">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Calcula el costo de tu obra ahora
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
