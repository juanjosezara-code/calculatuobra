export type TipoObra = 'Quincho' | 'Cobertizo' | 'Cocina' | 'Ampliación' | 'Local comercial' | 'Baño';
export type Terminacion = 'Básico' | 'Medio' | 'Alto';

export interface Desglose {
  obraGruesa: number;
  terminaciones: number;
  instalaciones: number;
}

export interface ResultadoCalculo {
  costoMin: number;
  costoMax: number;
  valorM2: number;
  desglose: Desglose;
}

// Precios por m² en pesos chilenos
const PRECIOS: Record<TipoObra, Record<Terminacion, number>> = {
  'Quincho':          { Básico: 350_000, Medio: 500_000, Alto: 700_000 },
  'Cobertizo':        { Básico: 220_000, Medio: 320_000, Alto: 480_000 },
  'Cocina':           { Básico: 400_000, Medio: 600_000, Alto: 900_000 },
  'Ampliación':       { Básico: 450_000, Medio: 650_000, Alto: 900_000 },
  'Local comercial':  { Básico: 400_000, Medio: 600_000, Alto: 850_000 },
  'Baño':             { Básico: 400_000, Medio: 650_000, Alto: 1_000_000 },
};

// Distribución entre categorías según tipo de proyecto (obraGruesa, terminaciones, instalaciones)
const SPLITS: Record<TipoObra, [number, number, number]> = {
  'Quincho':         [0.50, 0.30, 0.20],
  'Cobertizo':       [0.60, 0.28, 0.12],
  'Cocina':          [0.35, 0.45, 0.20],
  'Ampliación':      [0.55, 0.30, 0.15],
  'Local comercial': [0.45, 0.35, 0.20],
  'Baño':            [0.30, 0.50, 0.20],
};

export function calcular(
  tipo: TipoObra,
  superficieM2: number,
  terminacion: Terminacion
): ResultadoCalculo {
  const valorM2 = PRECIOS[tipo][terminacion];
  const totalMedio = PRECIOS[tipo]['Medio'] * superficieM2;
  const [ogPct, tPct, iPct] = SPLITS[tipo];

  return {
    costoMin: Math.round(superficieM2 * valorM2 * 0.90),
    costoMax: Math.round(superficieM2 * valorM2 * 1.15),
    valorM2,
    desglose: {
      obraGruesa:    Math.round(totalMedio * ogPct),
      terminaciones: Math.round(totalMedio * tPct),
      instalaciones: Math.round(totalMedio * iPct),
    },
  };
}

// Formatea número como $12.500.000
export function formatearPesos(numero: number): string {
  return '$' + numero.toLocaleString('es-CL', { maximumFractionDigits: 0 });
}

export const TIPOS_OBRA: TipoObra[] = [
  'Quincho',
  'Cobertizo',
  'Cocina',
  'Ampliación',
  'Local comercial',
  'Baño',
];

export const TERMINACIONES: Terminacion[] = ['Básico', 'Medio', 'Alto'];

export interface Partida {
  nombre: string;
  porcentaje: number; // % dentro de su categoría
}

export interface PartidasCategoria {
  obraGruesa:    Partida[];
  terminaciones: Partida[];
  instalaciones: Partida[];
}

export const PARTIDAS_POR_TIPO: Record<TipoObra, PartidasCategoria> = {
  'Quincho': {
    obraGruesa: [
      { nombre: 'Obras previas, trazados y excavación',           porcentaje: 14 },
      { nombre: 'Cadena de fundación y radier H20 e=15cm',        porcentaje: 24 },
      { nombre: 'Muros exteriores y tabique cortafuegos (HA)',     porcentaje: 30 },
      { nombre: 'Estructura de techo (metalcon + OSB + fieltro)',  porcentaje: 32 },
    ],
    terminaciones: [
      { nombre: 'Cubierta de zinc emballetado o membrana asfáltica',          porcentaje: 17 },
      { nombre: 'Cielo (terciado / volcanita / palillaje pino oregón)',        porcentaje: 18 },
      { nombre: 'Revestimiento de muros (fachaleta / coverlam / Neolith)',     porcentaje: 13 },
      { nombre: 'Porcelanato de piso y zócalos',                              porcentaje: 17 },
      { nombre: 'Mesón parrilla, mobiliario y módulos (melamina / granítico)', porcentaje: 30 },
      { nombre: 'Pintura, lucarnas y canal aguas lluvias',                    porcentaje:  5 },
    ],
    instalaciones: [
      { nombre: 'Instalación eléctrica, focos embutidos y cinta LED',   porcentaje: 48 },
      { nombre: 'Campana extractora rectangular y parrilla a gas inox',  porcentaje: 22 },
      { nombre: 'Habilitación de agua potable y alcantarillado',         porcentaje: 20 },
      { nombre: 'Canal aguas lluvias y bajadas exteriores',              porcentaje: 10 },
    ],
  },

  'Cobertizo': {
    obraGruesa: [
      { nombre: 'Obras previas, trazados y excavación',              porcentaje: 12 },
      { nombre: 'Dados o cadena de fundación hormigón H20',          porcentaje: 22 },
      { nombre: 'Estructura tubular o metalcon (pilares y vigas)',    porcentaje: 38 },
      { nombre: 'Correas metálicas y estructura de cubierta',        porcentaje: 28 },
    ],
    terminaciones: [
      { nombre: 'Cubierta de zinc emballetado o policarbonato alveolar', porcentaje: 40 },
      { nombre: 'Radier H20 e=10cm con malla electrosoldada',            porcentaje: 30 },
      { nombre: 'Canal aguas lluvias, bajadas y remates',                porcentaje: 18 },
      { nombre: 'Pintura anticorrosiva y terminaciones generales',       porcentaje: 12 },
    ],
    instalaciones: [
      { nombre: 'Instalación eléctrica: focos y enchufes exteriores', porcentaje: 65 },
      { nombre: 'Canal aguas lluvias exterior y conexión a red',       porcentaje: 35 },
    ],
  },

  'Cocina': {
    obraGruesa: [
      { nombre: 'Demolición: retiro de piso, muebles, cerámicos y artefactos existentes', porcentaje: 18 },
      { nombre: 'Gasfitería: gas, agua fría/caliente, desagüe y llaves de paso',          porcentaje: 30 },
      { nombre: 'Tabiques nuevos y obras de albañilería',                                  porcentaje: 22 },
      { nombre: 'Empaste y pintura de muros y cielos',                                     porcentaje: 30 },
    ],
    terminaciones: [
      { nombre: 'Muebles de cocina en melamina con cubierta de cuarzo blanco',  porcentaje: 38 },
      { nombre: 'Artefactos: encimera, campana, lavaplatos y grifería',          porcentaje: 22 },
      { nombre: 'Porcelanato de piso y zócalos',                                 porcentaje: 18 },
      { nombre: 'Revestimiento de muro: porcelanato o energy teak',              porcentaje: 15 },
      { nombre: 'Puertas, ventanales y espejo bajo cubierta',                    porcentaje:  7 },
    ],
    instalaciones: [
      { nombre: 'Eléctrica: canalización, puntos de luz y enchufes',                 porcentaje: 45 },
      { nombre: 'Cinta LED bajo muebles, rieles y luminarias de cielo',              porcentaje: 30 },
      { nombre: 'Instalación de artefactos (encimera, campana, lavaplatos, horno)',  porcentaje: 25 },
    ],
  },

  'Ampliación': {
    obraGruesa: [
      { nombre: 'Obras previas, trazados y excavación',                 porcentaje: 10 },
      { nombre: 'Cadena de fundación y radier H20 (interior/exterior)', porcentaje: 22 },
      { nombre: 'Muros exteriores metalcon + fibrocemento + OSB',       porcentaje: 28 },
      { nombre: 'Tabiques interiores volcanita ST / RH',                porcentaje: 15 },
      { nombre: 'Estructura de techo (metalcon + OSB + fieltro)',       porcentaje: 25 },
    ],
    terminaciones: [
      { nombre: 'Cubierta de zinc emballetado o membrana asfáltica', porcentaje: 18 },
      { nombre: 'Cielo de volcanita ST y cornisas',                   porcentaje: 14 },
      { nombre: 'Porcelanato de piso interior y exterior',            porcentaje: 18 },
      { nombre: 'Empaste y pintura de muros y cielos',                porcentaje: 18 },
      { nombre: 'Puertas, ventanas termopanel y lucarnas',            porcentaje: 32 },
    ],
    instalaciones: [
      { nombre: 'Instalación eléctrica, puntos y luminarias',     porcentaje: 45 },
      { nombre: 'Red de agua fría, caliente, desagüe y llaves',   porcentaje: 40 },
      { nombre: 'Canal aguas lluvias, bajadas y certificaciones', porcentaje: 15 },
    ],
  },

  'Local comercial': {
    obraGruesa: [
      { nombre: 'Obras preliminares, faenas y elementos de seguridad', porcentaje:  9 },
      { nombre: 'Impermeabilización de losa y sobrelosa hormigón',     porcentaje: 18 },
      { nombre: 'Tabiques metalcon + volcanita RH / RF',               porcentaje: 27 },
      { nombre: 'Cielos (volcanita / americano lavable / fondo losa)', porcentaje: 23 },
      { nombre: 'Tarima metálica o estructura de piso especial',       porcentaje: 23 },
    ],
    terminaciones: [
      { nombre: 'Porcelanato de piso (distintos tipos y formatos)',     porcentaje: 17 },
      { nombre: 'Revestimiento de muros (MDF pulse / cerámico)',        porcentaje: 22 },
      { nombre: 'Empaste y pintura de muros y cielos',                  porcentaje: 13 },
      { nombre: 'Puertas interiores MDF enchapado y accesos vidriados', porcentaje: 20 },
      { nombre: 'Baños (artefactos, porcelanato, mueble vanitorio)',    porcentaje: 28 },
    ],
    instalaciones: [
      { nombre: 'Instalación eléctrica (tablero, canalización, puntos, luminarias)', porcentaje: 48 },
      { nombre: 'Instalaciones sanitarias (agua, desagüe, artefactos)',              porcentaje: 37 },
      { nombre: 'Certificaciones TE1, SEC y planimetría',                            porcentaje: 15 },
    ],
  },

  'Baño': {
    obraGruesa: [
      { nombre: 'Demolición: retiro de cerámicas, artefactos existentes y tina',  porcentaje: 18 },
      { nombre: 'Gasfitería: cañerías cobre, desagüe, bloqueos y llaves de paso', porcentaje: 32 },
      { nombre: 'Receptáculo en obra e impermeabilización',                        porcentaje: 25 },
      { nombre: 'Tabiques volcanita RH, empaste de remates y pintura de cielo',   porcentaje: 25 },
    ],
    terminaciones: [
      { nombre: 'Porcelanato de piso 60×60 y perfiles de remate inox',         porcentaje: 20 },
      { nombre: 'Porcelanato de muro (piso a cielo)',                           porcentaje: 28 },
      { nombre: 'Mueble vanitorio a medida con cubierta de cuarzo',            porcentaje: 28 },
      { nombre: 'Mampara de vidrio templado 10mm y espejo a medida',           porcentaje: 16 },
      { nombre: 'Pintura de cielo (esmalte al agua) y puerta (óleo semibrillo)', porcentaje: 8 },
    ],
    instalaciones: [
      { nombre: 'Instalación de artefactos: WC, grifería, ducha y vanitorio', porcentaje: 45 },
      { nombre: 'Eléctrica: focos embutidos LED GU10, enchufes e interruptores', porcentaje: 40 },
      { nombre: 'Accesorios sanitarios: percha, toallero, portarrollo y sifón', porcentaje: 15 },
    ],
  },
};
