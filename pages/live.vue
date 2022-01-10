<template>
  <!--  <template v-if="{{result}} != 0"> -->
  <div class="live__container">
    <div
        class="live__body"
        v-if="!liveGames.length"
    >
      <h1 v-if="!liveGames.length">
        There are currently no live games but below are games from the last 24 hours
      </h1>
      <div
          v-for="match in lastGames"
          :key="match.id"
          class="live__single-match"
      >
        <p>
          {{match.hTeam.shortName}} {{match.hTeam.points}} : {{match.vTeam.points}} {{match.vTeam.shortName}}
        </p>
        <div>
          <nuxt-link :to="`/team/${match.hTeam.id}`">
            <img
                class="live__team-logo"
                :src="match.hTeam.logo"
            >
          </nuxt-link>
        </div>
        <div>
          <nuxt-link :to="`/team/${match.vTeam.id}`">
            <img
                class="live__team-logo"
                :src="match.vTeam.logo"
            >
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
class Match {
  constructor (data) {
    this.id = data?.gameId || '';
    this.hTeam = new Team(data?.hTeam);
    this.vTeam = new Team(data?.vTeam);
  }
}

class Team {
  constructor (data) {
    this.id = data?.teamId || '';
    this.shortName = data?.shortName || '';
    this.points = data?.score.points || '';
    this.logo = data?.logo || '';
  }
}
export default {
  name: 'Live',
  data () {
    return {
      lastGames: [],
      liveGames: [],
      today: new Date()
    };
  },
  async mounted () {
    await this.getLiveMatch();
    await this.getLastThreeMatches();
  },
  methods: {
    async getLiveMatch () {
      try {
        const res = await this.$axios.get('/games/live/');
        this.liveGames = res.data.api.games.map(game => new Match(game));
        console.log(this.liveGames);
      } catch (e) {
        console.log(e);
      }
    },
    async getLastThreeMatches () {
      try {
        const res = await this.$axios.get(`https://api-nba-v1.p.rapidapi.com/games/date/${this.today.toISOString().split('T')[0]}`);
        this.lastGames = res.data.api.games.map(match => new Match(match));
        console.log(this.lastGames);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
