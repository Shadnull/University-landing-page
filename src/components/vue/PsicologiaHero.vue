<template>
  <section class="relative h-full flex items-center justify-center overflow-hidden bg-gray-900">
    <div class="absolute inset-0 z-0">
      <img src="https://images.pexels.com/photos/4101133/pexels-photo-4101133.jpeg" alt="Atención psicológica" class="w-full h-full object-cover opacity-70" />
    </div>
    <div class="absolute inset-0 bg-black/55 z-10"></div>
    <transition name="swipe-up">
      <div v-if="isVisible" class="relative z-20 container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <div class="md:w-1/2 text-left mb-8 md:mb-0">
          <h1 class="text-4xl md:text-6xl font-bold text-white leading-tight">
            Psicología UTNay
          </h1>
        </div>
        <div class="md:w-1/2 text-right">
          <p class="text-lg md:text-2xl text-green-200 leading-relaxed">
            Acompañamos tu bienestar emocional con orientación profesional, talleres y acciones preventivas dentro de la comunidad universitaria.
          </p>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isVisible = ref(false);

onMounted(() => {
  isVisible.value = true;
});
</script>

<style scoped>
.swipe-up-enter-active {
  transition: all 1s ease-out;
}
.swipe-up-enter-from {
  opacity: 0;
  transform: translateY(100px);
}
.swipe-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
