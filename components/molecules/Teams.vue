<template>
  <div class="home__teams">
    <div
        v-for="team in teams"
        :key="team.id"
        class="home__logo-block"
        @click="$router.push(`/team/${team.id}`)"
    >
      <div class="home__logo-container">
        <img
            :src="team.logo"
            class="home__logo"
        >
      </div>
      <p>{{ team.name }}</p>
    </div>
  </div>
</template>
<script>
class Team {
  constructor (data) {
    this.id = data?.teamId || '';
    this.logo = data?.logo || '';
    this.name = data?.fullName || '';
  }
}

export default {
  name: 'Teams',
  data () {
    return {
      teams: []
    };
  },
  async mounted () {
    this.$store.commit('loader', true);
    await this.getTeams();
    this.$store.commit('loader', false);
  },
  methods: {
    async getTeams () {
      try {
        const res = await this.$axios.get('/teams/league/standard');
        this.teams = res.data.api.teams.filter(team => parseInt(team.nbaFranchise) && team.logo).map(nbaTeam => new Team(nbaTeam));
      } catch (e) {
        // eslint-disable-next-line
        console.error(e);
      }
    }
  }
};
</script>
