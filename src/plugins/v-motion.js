import { MotionPlugin } from '@vueuse/motion';

// Registrar MotionPlugin de forma síncrona para que v-motion esté disponible
// antes de montar los componentes (p. ej. Hero.vue).
export default (app) => {
    app.use(MotionPlugin);
};
