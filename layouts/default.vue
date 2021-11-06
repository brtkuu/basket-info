<template>
  <div class="page__container">
    <Navbar />
    <Nuxt />
  </div>
</template>
<script>
import Navbar from '@/components/navbar';

export default {
  name: 'Default',
  components: {
    Navbar
  }
};
</script>
