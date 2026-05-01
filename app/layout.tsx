import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from './components/Navbar';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'CalculaTuObra.cl — Presupuesto de construcción en Chile',
  description:
    'Calcula el costo de tu quincho, cocina, ampliación, baño o local comercial en pesos chilenos. Presupuesto referencial instantáneo con informe PDF profesional.',
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
