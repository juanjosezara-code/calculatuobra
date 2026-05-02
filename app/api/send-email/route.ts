import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { formatearPesos } from '@/lib/calculos';
import type { DatosPresupuesto } from '@/lib/generarPDF';

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { email, datos, waUrl, pdfBase64, filename } = (await req.json()) as {
      email: string;
      datos: DatosPresupuesto;
      waUrl: string;
      pdfBase64?: string;
      filename?: string;
    };

    if (!email || !datos) {
      return NextResponse.json({ error: 'Faltan datos.' }, { status: 400 });
    }

    const rango = `${formatearPesos(datos.costoMin)} — ${formatearPesos(datos.costoMax)}`;
    const from = process.env.RESEND_FROM ?? 'CalculaTuObra <onboarding@resend.dev>';

    await resend.emails.send({
      from,
      to: email,
      subject: `Tu informe de presupuesto — ${datos.tipo} ${datos.superficie} m²`,
      html: buildHtml({ datos, rango, waUrl }),
      ...(pdfBase64 && {
        attachments: [{
          filename: filename ?? 'presupuesto.pdf',
          content: pdfBase64,
        }],
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[send-email]', err);
    return NextResponse.json({ error: 'Error al enviar email.' }, { status: 500 });
  }
}

function buildHtml({
  datos,
  rango,
  waUrl,
}: {
  datos: DatosPresupuesto;
  rango: string;
  waUrl: string;
}) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:system-ui,sans-serif;color:#1e293b;">
  <div style="max-width:520px;margin:40px auto;background:#ffffff;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden;">

    <div style="background:#f97316;padding:24px 32px;">
      <p style="margin:0;font-size:18px;font-weight:700;color:#fff;">CalculaTuObra.cl</p>
      <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,.8);">Informe de presupuesto referencial</p>
    </div>

    <div style="padding:32px;">
      <p style="margin:0 0 20px;font-size:15px;color:#475569;">Hola,</p>
      <p style="margin:0 0 24px;font-size:15px;color:#475569;line-height:1.6;">
        Te dejamos el resumen de tu estimación. Este documento entrega una buena base para tu proyecto.
      </p>

      <div style="background:#f8fafc;border-radius:12px;padding:20px;margin-bottom:24px;">
        <p style="margin:0 0 12px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#94a3b8;">Tu proyecto</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:5px 0;font-size:13px;color:#94a3b8;">Tipo</td>
            <td style="padding:5px 0;font-size:13px;font-weight:600;color:#1e293b;text-align:right;">${datos.tipo}</td>
          </tr>
          <tr>
            <td style="padding:5px 0;font-size:13px;color:#94a3b8;">Superficie</td>
            <td style="padding:5px 0;font-size:13px;font-weight:600;color:#1e293b;text-align:right;">${datos.superficie} m²</td>
          </tr>
          <tr>
            <td style="padding:5px 0;font-size:13px;color:#94a3b8;">Terminación</td>
            <td style="padding:5px 0;font-size:13px;font-weight:600;color:#1e293b;text-align:right;">${datos.terminacion}</td>
          </tr>
          <tr style="border-top:1px solid #e2e8f0;">
            <td style="padding:12px 0 5px;font-size:13px;color:#94a3b8;">Rango estimado</td>
            <td style="padding:12px 0 5px;font-size:14px;font-weight:700;color:#f97316;text-align:right;">${rango}</td>
          </tr>
        </table>
      </div>

      <p style="margin:0 0 24px;font-size:14px;color:#475569;line-height:1.6;">
        Para avanzar con mayor precisión y evitar desviaciones en costos, lo ideal es ajustar
        este presupuesto según tu caso específico, considerando diseño, materiales y
        condiciones reales del terreno.
      </p>

      <a href="${waUrl}"
         style="display:block;background:#25d366;color:#fff;text-align:center;
                padding:14px 24px;border-radius:12px;font-size:14px;font-weight:600;
                text-decoration:none;margin-bottom:24px;">
        Solicitar evaluación del proyecto →
      </a>

      <p style="margin:0;font-size:13px;color:#94a3b8;line-height:1.6;">
        Quedo atento a cualquier consulta.
      </p>
    </div>

    <div style="border-top:1px solid #e2e8f0;padding:20px 32px;background:#f8fafc;">
      <p style="margin:0;font-size:11px;color:#94a3b8;text-align:center;">
        Valores referenciales. Consultar con profesional habilitado antes de tomar decisiones.
      </p>
    </div>

  </div>
</body>
</html>`;
}
