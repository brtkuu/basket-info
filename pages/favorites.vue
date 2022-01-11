<template>
  <div class="favorites__container">
    <v-app>
      <v-tabs
          v-model="tab"
          color="#fff"
          slider-color="#fff"
          background-color="rgb(200, 16, 46)"
      >
        <v-tab>Players</v-tab>
        <v-tab>Teams</v-tab>
      </v-tabs>
    </v-app>
    <div
        v-if="players.length && tab === 0"
        class="team__players"
    >
      <PlayerCard
          v-for="player in players"
          :key="player.id"
          :player="player"
          :favorites="favPlayersIds.includes(player.id)"
          @removeFromFavorites="removeFromFavorites(player.id)"
      />
    </div>
    <div
        v-if="tab === 1"
        class="home__teams"
    >
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
  </div>
</template>
<script>
import PlayerCard from '@/components/molecules/PlayerCard';

class Player {
  constructor (data) {
    this.id = data?.playerId || '';
    this.firstName = data?.firstName || '';
    this.lastName = data?.lastName || '';
    this.country = data?.country || '';
    this.birthDate = data?.dateOfBirth || '';
    this.nbaStart = data?.startNba || '';
    this.height = data?.heightInMeters || '';
    this.weight = data?.weightInKilograms || '';
    this.yearsAsPro = data?.yearsPro || '';
    this.college = data?.collegeName || '';
  }
}

class Team {
  constructor (data) {
    this.id = data?.teamId || '';
    this.logo = data?.logo || '';
    this.name = data?.fullName || '';
  }
}

export default {
  name: 'Favorites',
  components: {
    PlayerCard
  },
  data () {
    return {
      favPlayersIds: [],
      favTeamsIds: [],
      players: [],
      teams: [],
      tab: 0
    };
  },
  mounted () {
    this.$store.commit('loader', true);
    if (localStorage.getItem('basketInfoFavoritesPlayers')) {
      this.favPlayersIds = JSON.parse(localStorage.getItem('basketInfoFavoritesPlayers'));
    }

    if (localStorage.getItem('basketInfoFavoritesTeams')) {
      this.favTeamsIds = JSON.parse(localStorage.getItem('basketInfoFavoritesTeams'));
    }

    this.favPlayersIds.forEach(async (playerId) => {
      this.players.push(await this.getPlayer(playerId));
    });

    this.favTeamsIds.forEach(async (teamId) => {
      this.teams.push(await this.getTeam(teamId));
    });
    this.$store.commit('loader', false);
  },
  methods: {
    async getPlayer (id) {
      try {
        const res = await this.$axios.get(`/players/playerId/${id}`);
        return new Player(res.data.api.players[0]);
      } catch (e) {
        // eslint-disable-next-line
console.error(e);
      }
    },
    async getTeam (id) {
      try {
        const res = await this.$axios.get(`/teams/teamId/${id}`);
        return new Team(res.data.api.teams[0]);
      } catch (e) {
        // eslint-disable-next-line
console.error(e);
      }
    },
    removeFromFavorites (id) {
      const indexFav = this.favPlayersIds.findIndex(playerId => playerId === id);
      const indexPlayer = this.players.findIndex(player => player.id === id);
      this.favPlayersIds.splice(indexFav, 1);
      this.players.splice(indexPlayer, 1);

      this.$forceUpdate();

      localStorage.setItem('basketInfoFavoritesPlayers', JSON.stringify(this.favPlayersIds));
    }
  }
};
</script>
