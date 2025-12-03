import connectDB from '../../DB/conect.js';
import QuejaSugerencia from '../../DB/models/QuejaSugerencia.js';

// Este endpoint necesita ser 100% del lado del servidor (para aceptar POST)
export const prerender = false;

async function parseBody(request) {
  const contentType = request.headers.get('content-type') || '';

  // JSON (por ejemplo, peticiones desde fetch)
  if (contentType.includes('application/json')) {
    try {
      return await request.json();
    } catch {
      return {};
    }
  }

  // Formularios HTML clásicos
  if (
    contentType.includes('multipart/form-data') ||
    contentType.includes('application/x-www-form-urlencoded')
  ) {
    const form = await request.formData();
    return Object.fromEntries(form);
  }

  // Sin cuerpo o tipo de contenido no soportado (por ejemplo en prerender estático)
  return {};
}

export async function GET() {
  await connectDB();
  const items = await QuejaSugerencia.find().sort({ createdAt: -1 }).lean();
  return new Response(JSON.stringify(items), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST({ request }) {
  try {
    await connectDB();
    const body = await parseBody(request);

    const doc = await QuejaSugerencia.create({
      name: body.name || '',
      email: body.email || '',
      role: body.role || '',
      messageType: body.messageType || '',
      area: body.area || '',
      message: body.message || '',
      wantsResponse: body.wantsResponse === 'true' || body.wantsResponse === 'on' || body.wantsResponse === 'si',
    });

    const accept = request.headers.get('accept') || '';
    if (accept.includes('application/json')) {
      return new Response(JSON.stringify(doc), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(null, {
      status: 303,
      headers: { Location: '/quejas-sugerencias?success=1' },
    });
  } catch (err) {
    console.error('Error creating queja-sugerencia item', err);
    return new Response(JSON.stringify({ error: 'Error al enviar el mensaje' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
