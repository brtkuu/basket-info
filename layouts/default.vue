<template>
  <div class="page__container">
    <Loader />
    <Navbar />
    <Nuxt />
    <Footer />
  </div>
</template>
<script>
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Loader from '@/components/atoms/Loader';

export default {
  name: 'Default',
  components: {
    Navbar,
    Footer,
    Loader
  }
};
</script>
