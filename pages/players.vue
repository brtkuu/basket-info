<template>
  <div class="players__container">
    <div class="team__info-search-container">
      <label
          class="team__info-label"
      >
        Find player
        <input
            v-model="playerFind"
            type="text"
            class="team__info-search-input"
            @input="filterPlayers"
        >
      </label>
    </div>
    <div
        v-if="players.length"
        class="team__players"
    >
      <PlayerCard
          v-for="player in players"
          :key="player.id"
          :player="player"
          :favorites="favorites.includes(player.id)"
          @addToFavorites="addToFavorites"
          @removeFromFavorites="removeFromFavorites"
      />
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

export default {
  name: 'Players',
  components: {
    PlayerCard
  },
  data () {
    return {
      players: [],
      allPlayers: [],
      playerFind: ''
    };
  },
  computed: {
    favorites () {
      return JSON.parse(localStorage.getItem('basketInfoFavoritesPlayers')) || [];
    }
  },
  async mounted () {
    this.$store.commit('loader', true);
    await this.getPlayers();
    this.$store.commit('loader', false);
  },
  methods: {
    async getPlayers () {
      try {
        const res = await this.$axios.get('/players/league/standard');
        this.players = res.data.api.players.map(player => new Player(player));
        this.allPlayers = this.players;
      } catch (e) {
        // eslint-disable-next-line
        console.error(e);
      }
    },
    addToFavorites (id) {
      const favorites = this.favorites;
      favorites.push(id);

      this.$forceUpdate();

      localStorage.setItem('basketInfoFavoritesPlayers', JSON.stringify(favorites));
    },
    removeFromFavorites (id) {
      const index = this.favorites.findIndex(playerId => playerId === id);
      const favorites = this.favorites.splice(index, 1);

      this.$forceUpdate();

      localStorage.setItem('basketInfoFavoritesPlayers', JSON.stringify(favorites));
    },
    filterPlayers () {
      if (this.playerFind.length > 4) {
        this.players = this.allPlayers.filter(player => `${player.firstName.toLowerCase()} ${player.lastName.toLowerCase()}`.includes(this.playerFind.toLowerCase()));
      }

      if (this.playerFind.length === 0) {
        this.players = this.allPlayers;
      }
    }
  }
};
</script>
