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
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'CalculaTuObra.cl',
              url: 'https://www.calculatuobra.cl',
              description:
                'Calculadora de presupuesto de construcción para Chile. Calcula el costo de quinchos, cocinas, ampliaciones, baños, cobertizos y locales comerciales.',
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
            }),
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
