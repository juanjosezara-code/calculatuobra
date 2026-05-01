# CalculaTuObra.cl

Calculadora de presupuesto de construcción para Chile. Genera un rango de costo estimado y un informe PDF profesional con desglose de partidas y texto listo para enviar al contratista.

---

## Configurar las claves de Stripe

1. Crea una cuenta en [stripe.com](https://stripe.com) (o inicia sesión).
2. Ve a **Developers → API keys** en el dashboard de Stripe.
3. Copia tu **Publishable key** (empieza con `pk_test_...`) y tu **Secret key** (empieza con `sk_test_...`).
4. Abre el archivo `.env.local` en la raíz del proyecto y pega los valores:

```
STRIPE_SECRET_KEY=sk_test_TU_CLAVE_AQUI
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_TU_CLAVE_AQUI
```

> Usa las claves de **test** (`pk_test_` / `sk_test_`) mientras desarrollas.
> Para producción, reemplázalas por las claves live (`pk_live_` / `sk_live_`).

---

## Correr el proyecto en local

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

---

## Deploy en Vercel (paso a paso)

### 1. Sube el código a GitHub
- Crea un repositorio nuevo en [github.com](https://github.com).
- Sube el proyecto: `git init`, `git add .`, `git commit -m "init"`, `git remote add origin <url>`, `git push`.

### 2. Importa el proyecto en Vercel
- Ve a [vercel.com](https://vercel.com) e inicia sesión (puedes usar tu cuenta de GitHub).
- Haz clic en **Add New → Project**.
- Selecciona el repositorio que acabas de subir.
- Haz clic en **Import**.

### 3. Configura las variables de entorno
- Antes de hacer deploy, Vercel muestra una pantalla de configuración.
- Abre la sección **Environment Variables**.
- Agrega las dos variables con sus valores de producción (claves `live`):
  - `STRIPE_SECRET_KEY`
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### 4. Despliega
- Haz clic en **Deploy**.
- Vercel construye el proyecto automáticamente (tarda 1-2 minutos).
- Al terminar, recibirás una URL del tipo `https://calculatuobra.vercel.app`.

### 5. Configura el dominio personalizado (opcional)
- En el dashboard del proyecto, ve a **Settings → Domains**.
- Haz clic en **Add Domain** e ingresa tu dominio (ej: `calculatuobra.cl`).
- Vercel te dará los registros DNS que debes agregar en tu proveedor de dominios.

### 6. Actualizaciones futuras
- Cada vez que hagas `git push` a la rama principal, Vercel redesplegará automáticamente.

---

## Estructura del proyecto

```
app/
  page.tsx                  → Landing page
  calculadora/page.tsx      → Formulario + resultado + pago
  gracias/page.tsx          → Confirmación post-pago + descarga PDF
  api/create-checkout/
    route.ts                → Endpoint POST que crea la Checkout Session de Stripe
lib/
  calculos.ts               → Lógica de cálculo y tabla de precios
  generarPDF.ts             → Generación del PDF con jsPDF
.env.local                  → Claves de Stripe (no subir a Git)
```
