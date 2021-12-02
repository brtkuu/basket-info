<template>
  <!--  <template v-if="{{result}} != 0"> -->
  <div class="live__container">
    <div class="live__liveContainer">
      <p v-if="!games.length">
        There are no games avaliable live at the moment
      </p>
    </div>
  </div>
</template>

<script>
class Match {
  constructor (data) {
    this.gameId = data?.gameId || '';
  }
}
export default {
  name: 'Live',
  data () {
    return {
      games: []
    };
  },
  async mounted () {
    await this.getLiveMatch();
  },
  methods: {
    async getLiveMatch () {
      try {
        const res = await this.$axios.get('/games/live/');
        this.games = res.data.api.games.map(game => new Match(game));
        console.log(this.games);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
