<template>
  <div class="home__container">
    Hello world
  </div>
</template>
<script>
export default {
  name: 'MainPage',
  async mounted () {
    try {
      await this.$axios.get(`/games/date/${(new Date()).toISOString().split('T')[0]}`);
    } catch (e) {
      console.log(e);
    }
  }
};
</script>
