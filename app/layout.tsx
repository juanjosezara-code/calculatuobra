import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from './components/Navbar';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const SITE_URL = 'https://www.calculatuobra.cl';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'CalculaTuObra.cl — Presupuesto de construcción en Chile',
    template: '%s | CalculaTuObra.cl',
  },
  description:
    'Calcula el costo de tu quincho, cocina, ampliación, baño o local comercial en Chile. Presupuesto referencial en pesos chilenos con informe PDF profesional descargable.',
  keywords: [
    'presupuesto construcción Chile',
    'cuánto cuesta un quincho',
    'cuánto cuesta construir',
    'presupuesto quincho',
    'presupuesto ampliación',
    'presupuesto cocina',
    'presupuesto baño',
    'presupuesto cobertizo',
    'calculadora presupuesto obra',
    'costo construcción Santiago',
    'presupuesto obra Chile',
    'valor m2 construcción Chile',
  ],
  authors: [{ name: 'CalculaTuObra.cl' }],
  creator: 'CalculaTuObra.cl',
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: SITE_URL,
    siteName: 'CalculaTuObra.cl',
    title: 'CalculaTuObra.cl — Presupuesto de construcción en Chile',
    description:
      'Calcula el costo de tu quincho, cocina, ampliación o baño en Chile. Presupuesto referencial instantáneo con informe PDF profesional.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CalculaTuObra.cl — Presupuesto de construcción en Chile',
    description:
      'Calcula el costo de tu quincho, cocina, ampliación o baño en Chile. Presupuesto referencial instantáneo con informe PDF profesional.',
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} antialiased`}
        style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'WebApplication',
                name: 'CalculaTuObra.cl',
                url: 'https://www.calculatuobra.cl',
                description: 'Calculadora de presupuesto de construcción para Chile.',
                applicationCategory: 'FinanceApplication',
                operatingSystem: 'Web',
                inLanguage: 'es-CL',
                offers: {
                  '@type': 'Offer',
                  price: '5990',
                  priceCurrency: 'CLP',
                  description: 'Informe PDF profesional de presupuesto de construcción',
                },
                provider: {
                  '@type': 'Organization',
                  name: 'CalculaTuObra.cl',
                  url: 'https://www.calculatuobra.cl',
                },
              },
              {
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                  { '@type': 'Question', name: '¿Cuánto cuesta construir un quincho en Chile?', acceptedAnswer: { '@type': 'Answer', text: 'El costo de un quincho en Chile varía entre $350.000 y $700.000 por m², según el nivel de terminación. Un quincho de 30 m² con terminación media puede costar entre $12.000.000 y $16.000.000 CLP.' } },
                  { '@type': 'Question', name: '¿Cuánto cuesta ampliar una casa en Chile?', acceptedAnswer: { '@type': 'Answer', text: 'Una ampliación de casa en Chile tiene un valor referencial de $320.000 a $600.000 por m². Para una ampliación de 20 m² con terminación media, el presupuesto estimado es de $8.000.000 a $12.000.000 CLP.' } },
                  { '@type': 'Question', name: '¿Cuánto vale el metro cuadrado de construcción en Chile?', acceptedAnswer: { '@type': 'Answer', text: 'El valor del m² de construcción en Chile varía entre $200.000 y $800.000 según el tipo de obra y nivel de terminación. Los valores más frecuentes en Santiago están entre $350.000 y $600.000 por m².' } },
                  { '@type': 'Question', name: '¿Cuánto cuesta construir un cobertizo?', acceptedAnswer: { '@type': 'Answer', text: 'Un cobertizo en Chile cuesta entre $220.000 y $480.000 por m². Para un cobertizo de 20 m², el presupuesto va de $4.400.000 a $9.600.000 CLP según materiales.' } },
                  { '@type': 'Question', name: '¿Cuánto cuesta remodelar un baño en Chile?', acceptedAnswer: { '@type': 'Answer', text: 'Construir o remodelar un baño en Chile cuesta entre $400.000 y $800.000 por m². Un baño de 4 m² con terminación media tiene un costo referencial de $1.800.000 a $2.800.000 CLP.' } },
                ],
              },
            ]),
          }}
        />
        <Navbar />
        {children}
        <footer className="border-t border-slate-100 py-10 px-6">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-slate-400">
              © 2025{' '}
              <span className="text-slate-500 font-medium">CalculaTuObra.cl</span>
              {' '}· Desarrollado por un equipo profesional en arquitectura y construcción
            </p>
            <p className="text-xs text-slate-400 text-center sm:text-right max-w-sm">
              Valores referenciales. No reemplaza un presupuesto formal con profesional habilitado.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
