<template>
  <div>
    <div class="team__info">
      <div class="team__info-image">
        <img
            :src="teamInfo.logo"
        >
      </div>
      <h1 class="team__info-name">
        {{ teamInfo.name }}
      </h1>
    </div>
    <h2 class="team__info-section">
      Stats
    </h2>
    <TeamStats
        :stats="stats"
    />
    <h2 class="team__info-section">
      Roaster
    </h2>
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
import TeamStats from '@/components/molecules/TeamStats';

class Team {
  constructor (data) {
    this.id = data?.teamId || '';
    this.logo = data?.logo || '';
    this.name = data?.fullName || '';
  }
}

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

class Stats {
  constructor (data) {
    this.win = data?.win || '';
    this.loss = data?.loss || '';
    this.winStreak = data?.winStreak || '';
    this.winPer = data?.winPercentage || '';
    this.conference = new Conference(data?.conference);
    this.home = new WinLoss(data?.home);
    this.away = new WinLoss(data?.away);
    this.gamesBehind = data?.gamesBehind || '';
  }
}

class WinLoss {
  constructor (data) {
    this.win = data?.win || '';
    this.loss = data?.loss || '';
  }
}

class Conference {
  constructor (data) {
    this.name = data?.name || '';
    this.rank = data?.rank || '';
  }
}

export default {
  name: 'TeamPage',
  components: {
    PlayerCard,
    TeamStats
  },
  data () {
    return {
      teamInfo: new Team(),
      players: [],
      stats: new Stats()
    };
  },
  computed: {
    favorites () {
      return JSON.parse(localStorage.getItem('basketInfoFavorites')) || [];
    }
  },
  async mounted () {
    await this.getTeam();
    await this.getPlayers();
    await this.getStats();
  },
  methods: {
    async getTeam () {
      try {
        const res = await this.$axios.get(`/teams/teamId/${this.$route.params.id}`);
        this.teamInfo = new Team(res.data.api.teams[0]);
      } catch (e) {
        console.log(e);
      }
    },
    async getPlayers () {
      try {
        const res = await this.$axios.get(`/players/teamId/${this.$route.params.id}`);
        this.players = res.data.api.players.filter(player => player.leagues.standard && player.dateOfBirth && player.leagues.standard?.active).map(player => new Player(player));
      } catch (e) {
        console.log(e);
      }
    },
    async getStats () {
      try {
        const res = await this.$axios.get(`/standings/standard/${new Date().getFullYear()}/teamId/${this.$route.params.id}`);
        this.stats = new Stats(res.data.api.standings[0]);
      } catch (e) {
        console.log(e);
      }
    },
    addToFavorites (id) {
      const favorites = this.favorites;
      favorites.push(id);

      this.$forceUpdate();

      localStorage.setItem('basketInfoFavorites', JSON.stringify(favorites));
    },
    removeFromFavorites (id) {
      const index = this.favorites.findIndex(playerId => playerId === id);
      const favorites = this.favorites.splice(index, 1);

      this.$forceUpdate();

      localStorage.setItem('basketInfoFavorites', JSON.stringify(favorites));
    }
  }
};
</script>
