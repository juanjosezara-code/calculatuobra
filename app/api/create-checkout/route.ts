import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { tipo, superficie, terminacion } = body as {
      tipo: string;
      superficie: number;
      terminacion: string;
    };

    if (!tipo || !superficie || !terminacion) {
      return NextResponse.json(
        { error: 'Faltan datos del proyecto.' },
        { status: 400 },
      );
    }

    const origin = req.headers.get('origin') ?? 'http://localhost:3000';

    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: [
          {
            id: 'informe-pdf',
            title: 'Informe PDF — CalculaTuObra.cl',
            description: `${tipo} · ${superficie} m² · Terminación ${terminacion}`,
            quantity: 1,
            unit_price: 8990,
            currency_id: 'CLP',
          },
        ],
        back_urls: {
          success: `${origin}/gracias`,
          failure: `${origin}/calculadora`,
          pending: `${origin}/gracias`,
        },
        metadata: {
          tipo,
          superficie: String(superficie),
          terminacion,
        },
      },
    });

    const url = result.init_point ?? result.sandbox_init_point;
    return NextResponse.json({ url });
  } catch (err) {
    console.error('[create-checkout]', err);
    return NextResponse.json(
      { error: 'No se pudo crear la preferencia de pago.' },
      { status: 500 },
    );
  }
}
