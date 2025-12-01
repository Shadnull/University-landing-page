// @ts-nocheck
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST({ request }) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, email, password, role } = body || {};
    if (!name || !email || !password) {
      return new Response(JSON.stringify({ message: 'Campos requeridos' }), { status: 400 });
    }
    const existing = await User.findOne({ email }).lean();
    if (existing) {
      return new Response(JSON.stringify({ message: 'Usuario ya registrado' }), { status: 400 });
    }
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({ name, email, password: hash, role: role || 'user' });
    return new Response(JSON.stringify({ message: 'Usuario registrado', user: { id: newUser._id, email: newUser.email, name: newUser.name } }), { status: 201 });
  } catch (err) {
    console.error('register error', err);
    return new Response(JSON.stringify({ message: 'Error interno del servidor', error: err.message }), { status: 500 });
  }
}
