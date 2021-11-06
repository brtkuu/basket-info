<template>
  <div>Hello world</div>
</template>
<script>
export default {
  name: 'MainPage',
  async mounted () {
    try {
      await this.$axios.get('/games/date/2021-11-05')
    } catch (e) {
      console.log(e)
    }
  }
}
</script>
