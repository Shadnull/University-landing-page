<script setup lang="ts">
import { ref } from 'vue';

const formData = ref({
  name: '',
  email: '',
  role: 'Estudiante',
  messageType: 'Sugerencia',
  area: '',
  message: '',
  wantsResponse: 'no'
});

const loading = ref(false);
const error = ref('');
const success = ref('');

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  error.value = '';
  success.value = '';
  if (!formData.value.message.trim()) {
    error.value = 'El mensaje es requerido.';
    return;
  }
  loading.value = true;
  try {
    const res = await fetch('/api/quejas-sugerencias', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData.value)
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      if (res.status >= 500) {
        error.value = 'Error del servidor: posible timeout. Intenta más tarde.';
      } else {
        error.value = body?.error || `Error: ${res.status}`;
      }
      return;
    }
    success.value = 'Mensaje enviado correctamente. Gracias por colaborar.';
    formData.value = {
      name: '',
      email: '',
      role: 'Estudiante',
      messageType: 'Sugerencia',
      area: '',
      message: '',
      wantsResponse: 'no'
    };
  } catch (err) {
    console.error(err);
    error.value = 'Error de conexión. Revisa tu red e intenta de nuevo.';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section class="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 text-gray-900">
    <div class="max-w-5xl mx-auto grid gap-10 md:grid-cols-[2fr,1.3fr] items-start">
      <form
        @submit.prevent="handleSubmit"
        class="space-y-6 bg-white rounded-3xl border border-gray-200 p-8 shadow-lg"
        aria-label="Envía tu comentario - Buzón de quejas y sugerencias"
      >
        <header class="mb-2">
          <h2 class="text-2xl font-bold text-[#002b15]">Envía tu comentario</h2>
          <p class="text-sm text-gray-600">Tu mensaje será canalizado al área correspondiente. Puedes decidir si deseas recibir respuesta.</p>
        </header>

        <div v-if="error" class="rounded-md bg-red-50 border-l-4 border-red-600 p-3 text-red-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-semibold">Error</p>
              <p class="text-sm">{{ error }}</p>
            </div>
            <div>
              <button type="button" @click="error = ''" class="text-sm text-red-600 hover:underline">Cerrar</button>
            </div>
          </div>
        </div>

        <div v-if="success" class="rounded-md bg-green-50 border-l-4 border-green-600 p-3 text-green-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-semibold">Enviado</p>
              <p class="text-sm">{{ success }}</p>
            </div>
            <div>
              <button type="button" @click="success = ''" class="text-sm text-green-700 hover:underline">Cerrar</button>
            </div>
          </div>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <label for="qs-name" class="block text-xs font-bold text-gray-700 mb-1">Nombre completo</label>
            <input id="qs-name" v-model="formData.name" name="name" type="text"
              class="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#007a33]" placeholder="Opcional" />
          </div>

          <div>
            <label for="qs-email" class="block text-xs font-bold text-gray-700 mb-1">Correo electrónico</label>
            <input id="qs-email" v-model="formData.email" name="email" type="email"
              class="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#007a33]" placeholder="Opcional" />
          </div>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <label for="qs-role" class="block text-xs font-bold text-gray-700 mb-1">Rol en la UTNay</label>
            <select id="qs-role" v-model="formData.role" name="role"
              class="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#007a33]">
              <option>Estudiante</option>
              <option>Docente</option>
              <option>Personal administrativo</option>
              <option>Visitante</option>
            </select>
          </div>

          <div>
            <label for="qs-type" class="block text-xs font-bold text-gray-700 mb-1">Tipo de mensaje</label>
            <select id="qs-type" v-model="formData.messageType" name="messageType"
              class="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#007a33]">
              <option>Sugerencia</option>
              <option>Queja</option>
              <option>Reconocimiento</option>
              <option>Otro</option>
            </select>
          </div>
        </div>

        <div>
          <label for="qs-area" class="block text-xs font-bold text-gray-700 mb-1">Área o servicio relacionado</label>
          <input id="qs-area" v-model="formData.area" name="area" type="text"
            class="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#007a33]" placeholder="Ej. biblioteca, servicios escolares, laboratorio..." />
        </div>

        <div>
          <label for="qs-message" class="block text-xs font-bold text-gray-700 mb-1">Mensaje</label>
          <textarea id="qs-message" v-model="formData.message" name="message" rows="4" required
            class="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#007a33] placeholder:text-gray-400" placeholder="Describe con claridad tu situación..."></textarea>
        </div>

        <div>
          <label for="qs-response" class="block text-xs font-bold text-gray-700 mb-1">Deseo recibir respuesta</label>
          <select id="qs-response" v-model="formData.wantsResponse" name="wantsResponse"
            class="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#007a33]">
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
        </div>

        <div class="flex justify-end">
          <button :disabled="loading" type="submit"
            class="inline-flex items-center justify-center rounded-full bg-[#007a33] hover:bg-[#005c26] px-5 py-2 text-xs md:text-sm font-semibold text-white shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007a33] disabled:opacity-50">
            <span v-if="loading">Enviando...</span>
            <span v-else>Enviar mensaje</span>
          </button>
        </div>
      </form>

      <aside class="space-y-4 text-xs md:text-sm text-gray-700">
        <div class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 class="font-semibold mb-2">Uso responsable</h3>
          <p>Utiliza este medio para expresar de forma respetuosa y clara situaciones que puedan mejorar la universidad.</p>
        </div>

        <div class="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-5 shadow-sm">
          <h3 class="font-semibold mb-2">Anonimato</h3>
          <p class="text-sm mb-2">Puedes elegir compartir o no tus datos. Sin embargo, proporcionarlos facilita el seguimiento.</p>
          <p class="text-sm text-gray-500">Para denuncias formales, consulta los protocolos en la sección de transparencia.</p>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
/* Diseño institucional: no neon, tonos sobrios */
</style>
