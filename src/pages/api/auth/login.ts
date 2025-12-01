// @ts-nocheck
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST({ request }) {
  try {
    await dbConnect();
    const { email, password } = await request.json();
    if (!email || !password) {
      return new Response(JSON.stringify({ message: 'Email y contraseña son requeridos' }), { status: 400 });
    }
    const user = await User.findOne({ email }).lean();
    if (!user) {
      return new Response(JSON.stringify({ message: 'Credenciales inválidas' }), { status: 401 });
    }
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return new Response(JSON.stringify({ message: 'Credenciales inválidas' }), { status: 401 });
    }
    // Simulated session response: return user data (in prod, return JWT or session cookie)
    return new Response(JSON.stringify({ message: 'Login exitoso', user: { id: user._id, name: user.name, email: user.email } }), { status: 200 });
  } catch (err) {
    console.error('login error', err);
    return new Response(JSON.stringify({ message: 'Error interno del servidor', error: err.message }), { status: 500 });
  }
}
