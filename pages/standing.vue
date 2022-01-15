<template>
  <div class="standing__container">
    <v-app>
      <v-tabs
          v-model="tab"
          color="#fff"
          slider-color="#fff"
          background-color="rgb(200, 16, 46)"
      >
        <v-tab>All</v-tab>
        <v-tab>West</v-tab>
        <v-tab>East</v-tab>
      </v-tabs>
      <v-data-table
          :headers="headers"
          :items="filterTeams(tab)"
          :dark="true"
          class="white--text red darken-3"
          hide-default-footer
          :items-per-page="30"
      />
    </v-app>
  </div>
</template>
<script>

class Team {
  constructor (standing, team) {
    this.id = team?.teamId || '';
    this.logo = team?.logo || '';
    this.name = team?.fullName || '';
    this.wins = standing?.win || '';
    this.loses = standing?.loss || '';
    this.lastTen = `${standing?.lastTenWin} - ${standing?.lastTenLoss}`;
    this.winStreak = standing?.winStreak || '';
    this.gamesBehind = standing?.gamesBehind || '';
    this.winPerc = standing?.winPercentage || '';
    this.lossPerc = standing?.lossPercentage || '';
    this.home = new DetailsStats(standing?.home);
    this.away = new DetailsStats(standing?.away);
    this.conference = standing?.conference?.name || '';
  }
}

class DetailsStats {
  constructor (data) {
    this.win = data?.win || '';
    this.loss = data?.loss || '';
    this.record = `${data?.win}-${data.loss}`;
  }
}

export default {
  name: 'Standing',
  data () {
    return {
      tab: 0,
      teams: [],
      headers: [
        { text: 'Name', value: 'name', sortable: true },
        { text: 'Wins', value: 'wins', sortable: true },
        { text: 'Loses', value: 'loses', sortable: true },
        { text: 'Win %', value: 'winPerc', sortable: true },
        { text: 'Gamse behind', value: 'gamesBehind', sortable: true },
        { text: 'Home', value: 'home.record', sortable: false },
        { text: 'Away', value: 'away.record', sortable: false },
        { text: 'Last ten', value: 'lastTen', sortable: false }
      ]
    };
  },
  async mounted () {
    this.$store.commit('loader', true);
    await this.getStandings();
    this.$store.commit('loader', false);
  },
  methods: {
    filterTeams (filter) {
      if (filter === 0) {
        return this.teams;
      }

      if (filter === 1) {
        return this.teams.filter(team => team.conference === 'west');
      }

      if (filter === 2) {
        return this.teams.filter(team => team.conference === 'east');
      }
      return [];
    },
    async getStandings () {
      try {
        const standings = await this.$axios.get(`/standings/standard/${2021}`);
        const teams = await this.$axios.get('/teams/league/standard');

        this.teams = standings.data.api.standings.map((standing) => {
          return new Team(standing, teams.data.api.teams.find(team => standing.teamId === team.teamId));
        }).sort((a, b) => {
          return b.winPerc - a.winPerc;
        });
      } catch (e) {
        // eslint-disable-next-line
console.error(e);
      }
    }
  }
};
</script>
