import bcrypt from 'bcrypt';
import connectDB from '../../DB/conect.js';
import User from '../../DB/sct/user.js';

async function parseBody(request) {
  const contentType = request.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return await request.json();
  }
  const form = await request.formData();
  return Object.fromEntries(form);
}

export async function POST({ request }) {
  try {
    await connectDB();
    const body = await parseBody(request);
    const email = (body.email || '').trim().toLowerCase();
    const password = body.password || '';

    if (!email || !password) {
      return new Response('Credenciales inválidas', { status: 400 });
    }

    const user = await User.findOne({ email }).lean();
    if (!user || !user.password) {
      return new Response('Credenciales inválidas', { status: 401 });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return new Response('Credenciales inválidas', { status: 401 });
    }

    // Set a very simple admin cookie (para este panel). En producción, usar JWT/sesiones reales.
    const headers = new Headers();
    headers.set(
      'Set-Cookie',
      'admin=1; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400'
    );
    headers.set('Location', '/admin-formularios');

    return new Response(null, {
      status: 303,
      headers,
    });
  } catch (err) {
    console.error('Error en login', err);
    return new Response('Error interno en login', { status: 500 });
  }
}
