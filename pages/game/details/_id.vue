<template>
  <div class="game-details__container">
    <div
        class="game-details__match-container"
    >
      <div>
        <nuxt-link :to="`/team/${game.hTeam.id}`">
          <img
              :src="game.hTeam.logo"
              class="game-details__image"
          >
        </nuxt-link>
        <p class="game-details__team-name">
          {{ game.hTeam.shortName }}
        </p>
      </div>
      <div>
        <nuxt-link :to="`/team/${game.vTeam.id}`">
          <img
              :src="game.vTeam.logo"
              class="game-details__image"
          >
        </nuxt-link>
        <p class="game-details__team-name">
          {{ game.vTeam.shortName }}
        </p>
      </div>
      <p class="game-details__score">
        {{ game.hTeam.points }} - {{ game.vTeam.points }}
      </p>
    </div>
    <v-app>
      <h2 class="game-details__players-title">
        Players stats
      </h2>
      <v-tabs
          v-model="tab"
          color="#fff"
          slider-color="#fff"
          background-color="rgb(200, 16, 46)"
          @change="filterTeams()"
      >
        <v-tab>{{ game.hTeam.shortName }}</v-tab>
        <v-tab>{{ game.vTeam.shortName }}</v-tab>
      </v-tabs>
      <v-data-table
          :headers="headers"
          :items="tableData"
          :dark="true"
          class="white--text red darken-3"
          hide-default-footer
          :items-per-page="30"
          :mobile-breakpoint="350"
      />
    </v-app>
  </div>
</template>
<script>
class PlayerStats {
  constructor (stats, player) {
    this.firstName = player?.firstName || '';
    this.lastName = player?.lastName || '';
    this.points = stats?.points || 0;
    this.min = stats?.min || '';
    this.pos = stats?.pos || '';
    this.fga = stats?.fga || 0;
    this.fgm = stats?.fgm || 0;
    this.fgp = stats?.fgp || 0;
    this.fta = stats?.fta || 0;
    this.ftm = stats?.ftm || 0;
    this.ftp = stats?.ftp || 0;
    this.tpa = stats?.tpa || 0;
    this.tpm = stats?.tpm || 0;
    this.tpp = stats?.tpp || 0;
    this.offReb = stats?.offReb || 0;
    this.defReb = stats?.defReb || 0;
    this.totReb = stats?.totReb || 0;
    this.assists = stats?.assists || 0;
    this.tov = stats?.turnovers || 0;
    this.stl = stats?.steals || 0;
    this.blk = stats?.blocks || 0;
    this.pf = stats?.pFouls || 0;
    this.teamId = stats?.teamId || '';
    this.fullName = `${player?.firstName || ''} ${player?.lastName || ''} ${stats?.pos ? `(${stats.pos})` : ''}`;
  }
}

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
  name: 'GameDetails',
  data () {
    return {
      players: [],
      game: new Match(),
      tab: 0,
      tableData: [],
      headers: [
        { text: 'Player', value: 'fullName', sortable: true },
        { text: 'Min', value: 'min', sortable: true },
        { text: 'Points', value: 'points', sortable: true },
        { text: 'FGM', value: 'fgm', sortable: true },
        { text: 'FGA', value: 'fga', sortable: true },
        { text: 'FG%', value: 'fgp', sortable: true },
        { text: '3PM', value: 'tpm', sortable: true },
        { text: '3PA', value: 'tpa', sortable: true },
        { text: '3P%', value: 'tpp', sortable: true },
        { text: 'ORB', value: 'offReb', sortable: true },
        { text: 'DRB', value: 'defReb', sortable: true },
        { text: 'TRB', value: 'totReb', sortable: true },
        { text: 'AST', value: 'assists', sortable: true },
        { text: 'STL', value: 'stl', sortable: true },
        { text: 'BLK', value: 'blk', sortable: true },
        { text: 'TOV', value: 'tov', sortable: true },
        { text: 'PF', value: 'pf', sortable: true }
      ]
    };
  },
  async mounted () {
    await this.getPlayers();
    await this.getGameDetails();
    this.filterTeams();
  },
  methods: {
    async getPlayers () {
      const stats = (await this.$axios.get(`/statistics/players/gameId/${this.$route.params.id}`)).data.api.statistics;
      let players = (await this.$axios.get(`/players/teamId/${stats[0].teamId}`)).data.api.players;
      players = players.concat((await this.$axios.get(`/players/teamId/${stats[stats.length - 1].teamId}`)).data.api.players);
      this.players = stats.map((stat) => {
        const playerFind = players.find(player => player.playerId === stat.playerId);
        return new PlayerStats(stat, playerFind);
      });
    },
    async getGameDetails () {
      const res = (await this.$axios.get(`/gameDetails/${this.$route.params.id}`)).data.api.game;
      this.game = new Match(res[0]);
    },
    filterTeams () {
      console.log(this.tab);
      if (this.tab === 0) {
        this.tableData = this.players.filter(player => player.teamId === this.game.hTeam.id);
      } else {
        this.tableData = this.players.filter(player => player.teamId === this.game.vTeam.id);
      }
    }
  }
};
</script>
