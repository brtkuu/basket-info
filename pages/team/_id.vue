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
    <v-app>
      <v-tabs
          v-model="tab"
          color="#fff"
          slider-color="#fff"
          background-color="rgb(200, 16, 46)"
      >
        <v-tab>Roaster</v-tab>
        <v-tab>Last games</v-tab>
      </v-tabs>
    </v-app>
    <div v-if="tab === 0">
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
    <div
        v-if="tab === 1"
        class="matches__body"
    >
      <div
          v-for="match in lastGames"
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
          {{ match.date.split('T')[0] }}
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
import PlayerCard from '@/components/molecules/PlayerCard';
import TeamStats from '@/components/molecules/TeamStats';

class Match {
  constructor (data) {
    this.id = data?.gameId || '';
    this.hTeam = new MatchTeam(data?.hTeam);
    this.vTeam = new MatchTeam(data?.vTeam);
    this.status = data?.statusGame || '';
    this.date = data?.startTimeUTC || '';
  }
}

class MatchTeam {
  constructor (data) {
    this.id = data?.teamId || '';
    this.fullName = data?.fullName || '';
    this.logo = data?.logo || '';
    this.shortName = data?.shortName || '';
    this.points = data?.score.points || '';
  }
}

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
      stats: new Stats(),
      lastGames: [],
      tab: 0
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
    await this.getTeamGames();
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
        const res = await this.$axios.get(`/standings/standard/${2021}/teamId/${this.$route.params.id}`);
        this.stats = new Stats(res.data.api.standings[0]);
        console.log(res);
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
    },
    async getTeamGames () {
      const games = (await this.$axios.get(`/games/teamId/${this.$route.params.id}`)).data.api.games.filter(game => game.statusGame === 'Finished');
      for (let i = games.length - 1; i > games.length - 11; i--) {
        console.log(new Match(games[i]));
        this.lastGames.push(new Match(games[i]));
      }
    }
  }
};
</script>
