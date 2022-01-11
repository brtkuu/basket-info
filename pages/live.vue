<template>
  <!--  <template v-if="{{result}} != 0"> -->
  <div class="live__container">
    <div
        v-if="!liveGames.length"
    >
      <h1
          class="live__title"
      >
        There are currently no live games but below are games from the last 24 hours
      </h1>
      <div class="live__body">
        <div
            v-for="match in lastGames"
            :key="match.id"
        >
          <MatchCard
              :match="match"
          />
        </div>
      </div>
    </div>
    <div
        v-else
    >
      <div class="live__body">
        <div
            v-for="match in liveGames"
            :key="match.id"
        >
          <MatchCard
              :match="match"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MatchCard from '@/components/molecules/MatchCard';

class Match {
  constructor (data) {
    this.id = data?.gameId || '';
    this.hTeam = new Team(data?.hTeam);
    this.vTeam = new Team(data?.vTeam);
    this.status = data?.statusGame || '';
    this.start = data?.startTimeUTC || '';
  }
}

class Team {
  constructor (data) {
    this.id = data?.teamId || '';
    this.fullName = data?.fullName || '';
    this.logo = data?.logo || '';
    this.shortName = data?.shortName || '';
    this.points = data?.score.points || '';
  }
}

export default {
  name: 'Live',
  components: {
    MatchCard
  },
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
