<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Alumno {
  _id: string;
  nombre: string;
  matricula: string;
  calificacion: number;
}

const alumnos = ref<Alumno[]>([]);
const loading = ref(false);
const error = ref('');
const formData = ref({ nombre: '', matricula: '', calificacion: 0 });

const fetchAlumnos = async () => {
  loading.value = true;
  try {
    const res = await fetch('/api/alumnos');
    const data = await res.json();
    if (data.success) {
      alumnos.value = data.data;
      error.value = '';
    } else {
      error.value = data.error || 'Error desconocido';
    }
  } catch (e) {
    error.value = 'Error de conexión (Revisa IP en MongoDB Atlas)';
  } finally {
    loading.value = false;
  }
};

const addAlumno = async () => {
  loading.value = true;
  try {
    await fetch('/api/alumnos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData.value)
    });
    await fetchAlumnos();
    formData.value = { nombre: '', matricula: '', calificacion: 0 };
  } catch (e) {
    error.value = 'Error al guardar';
  } finally {
    loading.value = false;
  }
};

const deleteAlumno = async (id: string) => {
  if(!confirm('¿Eliminar?')) return;
  loading.value = true;
  try {
    await fetch('/api/alumnos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    await fetchAlumnos();
  } catch (e) {
    error.value = 'Error al eliminar';
  } finally {
    loading.value = false;
  }
};

onMounted(() => fetchAlumnos());
</script>

<template>
  <div class="w-full">
    <div v-if="error" class="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
      <p class="font-bold">Error:</p>
      <p>{{ error }}</p>
    </div>

    <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-8 border border-gray-200">
      <div class="bg-[#002b15] px-6 py-4">
        <h2 class="text-white font-bold text-xl uppercase tracking-wider">Gestión Escolar - Agregar Alumno</h2>
      </div>
      <div class="p-6">
        <form @submit.prevent="addAlumno" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-gray-700 font-bold mb-2">Nombre</label>
            <input v-model="formData.nombre" type="text" class="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-[#007a33] focus:outline-none" required placeholder="Nombre Completo" />
          </div>
          <div>
            <label class="block text-gray-700 font-bold mb-2">Matrícula</label>
            <input v-model="formData.matricula" type="text" class="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-[#007a33] focus:outline-none" required placeholder="TIC-..." />
          </div>
          <div>
            <label class="block text-gray-700 font-bold mb-2">Calificación</label>
            <input v-model="formData.calificacion" type="number" min="0" max="100" class="w-full bg-white text-gray-900 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-[#007a33] focus:outline-none" required />
          </div>
          <div class="md:col-span-3 flex justify-end">
            <button type="submit" class="bg-[#007a33] hover:bg-[#005c26] text-white font-bold py-2 px-6 rounded shadow transition-colors">
              {{ loading ? 'Guardando...' : 'Guardar Alumno' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <table class="min-w-full">
        <thead class="bg-[#002b15] text-white">
          <tr>
            <th class="px-6 py-3 text-left uppercase font-bold text-sm">Nombre</th>
            <th class="px-6 py-3 text-left uppercase font-bold text-sm">Matrícula</th>
            <th class="px-6 py-3 text-left uppercase font-bold text-sm">Calif.</th>
            <th class="px-6 py-3 text-right uppercase font-bold text-sm">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="alumno in alumnos" :key="alumno._id" class="hover:bg-gray-50">
            <td class="px-6 py-4 text-gray-900 font-medium">{{ alumno.nombre }}</td>
            <td class="px-6 py-4 text-gray-600 font-mono text-sm">{{ alumno.matricula }}</td>
            <td class="px-6 py-4">
              <span :class="alumno.calificacion >= 80 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'" class="px-2 py-1 rounded-full text-xs font-bold">
                {{ alumno.calificacion }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <button @click="deleteAlumno(alumno._id)" class="text-red-600 hover:text-red-900 font-bold text-sm">Eliminar</button>
            </td>
          </tr>
          <tr v-if="alumnos.length === 0">
            <td colspan="4" class="px-6 py-8 text-center text-gray-500">No hay registros.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>