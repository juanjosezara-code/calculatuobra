'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const path = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#f97316] rounded-lg flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L1 7V14H6V10H10V14H15V7L8 2Z" fill="white" />
            </svg>
          </div>
          <span className="font-bold text-slate-900 tracking-tight">
            CalculaTuObra<span className="text-[#f97316]">.cl</span>
          </span>
        </Link>

        {path === '/' && (
          <Link
            href="/calculadora"
            className="bg-[#f97316] hover:bg-[#ea6c0a] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors hidden sm:block"
          >
            Calcular ahora →
          </Link>
        )}
      </div>
    </header>
  );
}
