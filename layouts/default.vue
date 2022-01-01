<template>
  <div class="page__container">
    <Navbar />
    <Nuxt />
    <Footer />
  </div>
</template>
<script>
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default {
  name: 'Default',
  components: {
    Navbar,
    Footer
  }
};
</script>
