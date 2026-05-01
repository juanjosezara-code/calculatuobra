import jsPDF from 'jspdf';
import {
  formatearPesos,
  PARTIDAS_POR_TIPO,
  type TipoObra,
  type Terminacion,
} from './calculos';

export interface DatosPresupuesto {
  tipo:        TipoObra;
  superficie:  number;
  terminacion: Terminacion;
  costoMin:    number;
  costoMax:    number;
  valorM2:     number;
  desglose: {
    obraGruesa:    number;
    terminaciones: number;
    instalaciones: number;
  };
}

function fechaActual(): string {
  return new Date().toLocaleDateString('es-CL', {
    day: '2-digit', month: 'long', year: 'numeric',
  });
}

const NARANJA  = [249, 115, 22]  as const;
const GRIS     = [120, 120, 120] as const;
const NEGRO    = [20,  20,  20]  as const;
const LINEA    = [225, 225, 225] as const;
const NARANJA_LIGHT = [255, 247, 237] as const;
const W        = 210;
const MARGEN   = 16;
const CONTENIDO = W - MARGEN * 2;

export function generarPDF(datos: DatosPresupuesto): void {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  let y = 0;

  // ── HEADER ──────────────────────────────────────────────────────────────────
  doc.setFillColor(...NARANJA);
  doc.rect(0, 0, W, 30, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(17);
  doc.setTextColor(255, 255, 255);
  doc.text('CalculaTuObra.cl', MARGEN, 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Informe de Presupuesto Referencial', MARGEN, 21);

  doc.setFontSize(8.5);
  doc.text(fechaActual(), W - MARGEN, 13, { align: 'right' });
  doc.text('Valores en pesos chilenos (CLP)', W - MARGEN, 21, { align: 'right' });

  y = 38;

  // ── DATOS DEL PROYECTO ───────────────────────────────────────────────────────
  seccionTitulo(doc, 'Datos del proyecto', y);
  y += 8;

  const filasDatos: [string, string][] = [
    ['Tipo de proyecto',     datos.tipo],
    ['Superficie',           `${datos.superficie} m²`],
    ['Nivel de terminación', datos.terminacion],
  ];

  doc.setFontSize(9.5);
  for (const [etiqueta, valor] of filasDatos) {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...GRIS);
    doc.text(etiqueta, MARGEN, y);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...NEGRO);
    doc.text(valor, MARGEN + 52, y);
    y += 7;
  }

  y += 4;

  // ── ESTIMACIÓN ───────────────────────────────────────────────────────────────
  doc.setFillColor(...NARANJA_LIGHT);
  doc.setDrawColor(...NARANJA);
  doc.setLineWidth(0.4);
  doc.roundedRect(MARGEN, y, CONTENIDO, 28, 3, 3, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...GRIS);
  doc.text('RANGO ESTIMADO TOTAL', MARGEN + 5, y + 7);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...NEGRO);
  doc.text(
    `${formatearPesos(datos.costoMin)}  —  ${formatearPesos(datos.costoMax)}`,
    MARGEN + 5, y + 18,
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...GRIS);
  doc.text(
    `Valor referencial por m²: ${formatearPesos(datos.valorM2)}`,
    W - MARGEN - 4, y + 25, { align: 'right' },
  );

  y += 36;

  // ── TABLA DE DESGLOSE DETALLADA ──────────────────────────────────────────────
  seccionTitulo(doc, 'Desglose por partidas', y);
  y += 8;

  const partidas = PARTIDAS_POR_TIPO[datos.tipo];

  const totalDesglose = datos.desglose.obraGruesa + datos.desglose.terminaciones + datos.desglose.instalaciones;
  const pctOG = Math.round(datos.desglose.obraGruesa    / totalDesglose * 100);
  const pctT  = Math.round(datos.desglose.terminaciones / totalDesglose * 100);
  const pctI  = 100 - pctOG - pctT;

  const categorias: { label: string; total: number; items: typeof partidas.obraGruesa; pct: number }[] = [
    { label: 'Obra Gruesa',    total: datos.desglose.obraGruesa,    items: partidas.obraGruesa,    pct: pctOG },
    { label: 'Terminaciones',  total: datos.desglose.terminaciones,  items: partidas.terminaciones,  pct: pctT },
    { label: 'Instalaciones',  total: datos.desglose.instalaciones,  items: partidas.instalaciones,  pct: pctI },
  ];

  for (const cat of categorias) {
    // Cabecera de categoría
    doc.setFillColor(245, 245, 245);
    doc.rect(MARGEN, y, CONTENIDO, 8, 'F');
    doc.setDrawColor(...LINEA);
    doc.setLineWidth(0.2);
    doc.rect(MARGEN, y, CONTENIDO, 8, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...NEGRO);
    doc.text(`${cat.label}  ·  ${cat.pct}% del total`, MARGEN + 3, y + 5.5);
    doc.text(formatearPesos(cat.total), W - MARGEN - 3, y + 5.5, { align: 'right' });
    y += 8;

    // Filas de partidas
    for (let i = 0; i < cat.items.length; i++) {
      const p = cat.items[i];
      const monto = Math.round(cat.total * p.porcentaje / 100);

      doc.setFillColor(i % 2 === 0 ? 255 : 250, i % 2 === 0 ? 255 : 250, i % 2 === 0 ? 255 : 250);
      doc.rect(MARGEN, y, CONTENIDO, 7.5, 'F');
      doc.setDrawColor(...LINEA);
      doc.setLineWidth(0.1);
      doc.line(MARGEN, y + 7.5, MARGEN + CONTENIDO, y + 7.5);

      // Barra naranja lateral
      doc.setFillColor(...NARANJA);
      doc.rect(MARGEN, y, 1.5, 7.5, 'F');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...NEGRO);
      doc.text(p.nombre, MARGEN + 5, y + 5);

      doc.setTextColor(...GRIS);
      doc.text(`${p.porcentaje}%`, MARGEN + CONTENIDO * 0.62, y + 5, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...NEGRO);
      doc.text(formatearPesos(monto), W - MARGEN - 3, y + 5, { align: 'right' });

      y += 7.5;
    }

    y += 4;
  }

  y += 2;

  // ── TEXTO PARA EL CONTRATISTA ─────────────────────────────────────────────
  seccionTitulo(doc, 'Texto para enviar a tu contratista', y);
  y += 8;

  doc.setFillColor(...NARANJA_LIGHT);
  doc.setDrawColor(249, 200, 160);
  doc.setLineWidth(0.3);

  const parrafo =
    `Estimado contratista, le solicito presupuesto formal para la construcción ` +
    `de ${datos.tipo.toLowerCase()} de ${datos.superficie} m² con terminación ` +
    `${datos.terminacion.toLowerCase()}. Según estimación referencial obtenida en ` +
    `CalculaTuObra.cl, el rango de costo del proyecto se encuentra entre ` +
    `${formatearPesos(datos.costoMin)} y ${formatearPesos(datos.costoMax)}, ` +
    `con un valor referencial de ${formatearPesos(datos.valorM2)} por m². ` +
    `Quedo atento a su cotización detallada con desglose por partidas. Saludos cordiales.`;

  const lineas = doc.splitTextToSize(parrafo, CONTENIDO - 10);
  const altoCuadro = lineas.length * 5.2 + 10;
  doc.roundedRect(MARGEN, y, CONTENIDO, altoCuadro, 3, 3, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...NEGRO);
  doc.text(lineas, MARGEN + 5, y + 7);

  y += altoCuadro + 4;

  // ── FOOTER ────────────────────────────────────────────────────────────────
  const pageH = 297;
  doc.setDrawColor(...LINEA);
  doc.setLineWidth(0.3);
  doc.line(MARGEN, pageH - 14, W - MARGEN, pageH - 14);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(...GRIS);
  doc.text(
    'Valores referenciales. Consultar con profesional habilitado antes de tomar decisiones.',
    W / 2, pageH - 8, { align: 'center' },
  );
  doc.text('CalculaTuObra.cl', MARGEN, pageH - 8);
  doc.text(fechaActual(), W - MARGEN, pageH - 8, { align: 'right' });

  // ── DESCARGA ──────────────────────────────────────────────────────────────
  const nombre = `presupuesto-${datos.tipo.toLowerCase().replace(/\s+/g, '-')}-${datos.superficie}m2.pdf`;
  doc.save(nombre);
}

function seccionTitulo(doc: jsPDF, texto: string, y: number) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...NEGRO);
  doc.text(texto, MARGEN, y);
  doc.setDrawColor(...NARANJA);
  doc.setLineWidth(0.7);
  doc.line(MARGEN, y + 1.5, MARGEN + doc.getTextWidth(texto), y + 1.5);
}
