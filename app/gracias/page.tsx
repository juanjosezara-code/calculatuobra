'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { generarPDF, type DatosPresupuesto } from '@/lib/generarPDF';
import { formatearPesos } from '@/lib/calculos';

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '56912345678';

function buildWaUrl(d: DatosPresupuesto): string {
  const rango = `${formatearPesos(d.costoMin)} — ${formatearPesos(d.costoMax)}`;
  const msg =
    `Hola, acabo de generar un informe en CalculaTuObra.\n\n` +
    `Mi proyecto es un ${d.tipo} de ${d.superficie} m², nivel ${d.terminacion}.\n\n` +
    `El rango estimado fue ${rango}.\n\n` +
    `Me gustaría avanzar con una evaluación más precisa.`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

const INCLUYE = [
  'Ajuste real del presupuesto según tu proyecto',
  'Definición de materiales y terminaciones',
  'Alcance claro para construir sin sorpresas',
  'Base profesional para cotizar y ejecutar',
];

const EMAIL_INCLUYE = [
  'Acceso directo a tu informe',
  'Link para continuar con tu proyecto',
];

export default function GraciasPage() {
  const [datos, setDatos]             = useState<DatosPresupuesto | null>(null);
  const [descargando, setDescargando] = useState(false);
  const [errorDesc, setErrorDesc]     = useState('');
  const [email, setEmail]             = useState('');
  const [enviando, setEnviando]       = useState(false);
  const [enviado, setEnviado]         = useState(false);
  const [errorEmail, setErrorEmail]   = useState('');

  useEffect(() => {
    const raw = sessionStorage.getItem('calculadora_resultado');
    if (raw) {
      try { setDatos(JSON.parse(raw) as DatosPresupuesto); } catch { /* ignore */ }
    }
  }, []);

  function handleDescargar() {
    setErrorDesc('');
    if (!datos) {
      setErrorDesc('No se encontraron los datos. Vuelve a la calculadora y repite el proceso.');
      return;
    }
    setDescargando(true);
    generarPDF(datos);
    setDescargando(false);
  }

  async function handleEnviarEmail() {
    if (!email || !datos) return;
    setEnviando(true);
    setErrorEmail('');
    try {
      const waUrl = buildWaUrl(datos);
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, datos, waUrl }),
      });
      if (!res.ok) throw new Error();
      setEnviado(true);
    } catch {
      setErrorEmail('No se pudo enviar. Intenta de nuevo.');
    } finally {
      setEnviando(false);
    }
  }

  const waUrl = datos ? buildWaUrl(datos) : '#';

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-sm w-full flex flex-col gap-4">

        {/* ── Confirmación + descarga ─────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 flex flex-col items-center text-center gap-6">
          <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
              <path d="M6 14l6 6L22 8" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-slate-900">¡Tu informe está listo!</h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              Descarga el PDF con el desglose completo y el texto para tu contratista.
            </p>
          </div>
          <button
            onClick={handleDescargar}
            disabled={descargando}
            className="w-full bg-[#f97316] hover:bg-[#ea6c0a] active:bg-[#dc5c03] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-base px-8 py-4 rounded-xl transition-colors"
          >
            {descargando ? 'Generando PDF…' : 'Descargar PDF →'}
          </button>
          {errorDesc && <p className="text-sm text-red-500">{errorDesc}</p>}
          <Link
            href="/calculadora"
            className="text-sm text-slate-400 hover:text-slate-600 transition-colors underline underline-offset-4"
          >
            Volver a la calculadora
          </Link>
        </div>

        {/* ── Siguiente paso ──────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex flex-col gap-6">
          <div>
            <p className="text-xs font-semibold tracking-widest text-[#f97316] uppercase mb-2">
              Siguiente paso recomendado
            </p>
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Lleva este presupuesto a un proyecto real
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Este informe es una base referencial. Para evitar desviaciones en costos,
              es necesario ajustarlo a tu proyecto real, considerando diseño, materiales
              y condiciones del terreno.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Incluye
            </p>
            <ul className="flex flex-col gap-2.5">
              {INCLUYE.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="mt-0.5 flex-shrink-0">
                    <path d="M2.5 7l3 3 6-6" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 bg-[#25d366] hover:bg-[#1ebe5d] text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9 1C4.582 1 1 4.582 1 9c0 1.49.39 2.888 1.07 4.1L1 17l3.985-1.045A7.958 7.958 0 0 0 9 17c4.418 0 8-3.582 8-8s-3.582-8-8-8Zm-2.53 4.5c-.178 0-.468.067-.713.334-.244.267-.934.912-.934 2.223s.956 2.578 1.09 2.756c.133.178 1.868 2.99 4.6 4.09 2.268.894 2.733.716 3.228.672.494-.045 1.602-.656 1.826-1.29.223-.634.223-1.178.156-1.29-.067-.112-.245-.178-.512-.312-.267-.133-1.602-.79-1.85-.879-.245-.09-.423-.134-.601.133-.178.267-.69.879-.845 1.057-.156.178-.312.2-.579.067-.267-.134-1.127-.415-2.147-1.324-.794-.707-1.33-1.58-1.486-1.847-.155-.267-.017-.412.117-.545.12-.12.267-.312.4-.467.134-.156.179-.267.268-.445.089-.178.044-.334-.023-.467-.067-.133-.59-1.468-.823-2.001-.212-.49-.434-.49-.601-.49Z"
                  fill="white"
                />
              </svg>
              Quiero evaluar mi proyecto
            </a>
            <p className="text-xs text-slate-400 text-center">
              Ideal si estás evaluando construir en los próximos meses.
            </p>
          </div>
        </div>

        {/* ── Captura de email ────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-800 mb-1">
              Guarda tu presupuesto y recíbelo por email
            </p>
            <p className="text-xs text-slate-400 mb-3">
              Te enviamos el detalle y el acceso a tu evaluación para revisarlo cuando quieras.
            </p>
            <ul className="flex flex-col gap-1.5">
              {EMAIL_INCLUYE.map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-slate-500">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2 6l2.5 2.5L10 4" stroke="#f97316" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {enviado ? (
            <p className="text-sm text-green-600 font-medium flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M2.5 7l3 3 6-6" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Email enviado correctamente
            </p>
          ) : (
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleEnviarEmail()}
                placeholder="tu@email.com"
                className="flex-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#f97316] transition"
              />
              <button
                onClick={handleEnviarEmail}
                disabled={enviando || !email}
                className="bg-slate-900 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap"
              >
                {enviando ? '…' : 'Enviar'}
              </button>
            </div>
          )}

          {errorEmail && <p className="text-xs text-red-500">{errorEmail}</p>}
        </div>

      </div>
    </main>
  );
}
