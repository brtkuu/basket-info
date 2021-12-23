<template>
  <div class="matches__container">
    <DatePicker
        @changeDate="changeDate"
    />
    <h1 class="matches__title">
      Matches
    </h1>
    <div class="matches__body">
      <div
          v-for="match in matches"
          :key="match.id"
          class="matches__single-match"
      >
        <div>
          <nuxt-link :to="`/team/${match.hTeam.id}`">
            <img
                class="matches__team-logo"
                :src="match.hTeam.logo"
            >
          </nuxt-link>
          <p>{{ match.hTeam.shortName }}</p>
        </div>
        <div>
          <nuxt-link :to="`/team/${match.vTeam.id}`">
            <img
                class="matches__team-logo"
                :src="match.vTeam.logo"
            >
          </nuxt-link>
          <p>
            {{ match.vTeam.shortName }}
          </p>
        </div>
        <p class="matches__status">
          {{ match.status }}
        </p>
        <p class="matches__points">
          {{ match.hTeam.points }} - {{ match.vTeam.points }}
        </p>
        <nuxt-link
            v-if="match.status === 'Finished'"
            :to="`/game/details/${match.id}`"
            class="matches__details"
        >
          Details
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import DatePicker from '@/components/molecules/DatePicker';

class Match {
  constructor (data) {
    this.id = data?.gameId || '';
    this.hTeam = new Team(data?.hTeam);
    this.vTeam = new Team(data?.vTeam);
    this.status = data?.statusGame || '';
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
  name: 'Matches',
  components: {
    DatePicker
  },
  data () {
    return {
      selectedDate: new Date(),
      matches: []
    };
  },
  mounted () {
    this.getMatches();
  },
  methods: {
    async getMatches () {
      try {
        const res = await this.$axios.get(`/games/date/${this.selectedDate.toISOString().split('T')[0]}`);
        this.matches = res.data.api.games.map(match => new Match(match));
      } catch (e) {
        // eslint-disable-next-line
        console.log(e);
      }
    },
    changeDate (date) {
      this.selectedDate = date;
      this.getMatches();
    }
  }
};
</script>
